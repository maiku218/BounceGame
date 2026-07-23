class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	init(data) {
		this.levelId = data.levelId || 1;
		this.user = data.user;
		this.save = data.save;
		this.audio = data.audio;
		this.levelData = null;
		this.player = null;
		this.platforms = null;
		this.collectibles = null;
		this.obstacles = null;
		this.checkpoints = null;
		this.portals = null;
		this.enemies = [];
		this.cursor = { left: false, right: false, up: false };
		this.touchControls = null;
		this.startTime = 0;
		this.isPaused = false;
		this.collectedRings = 0;
		this.lives = this.save.data.lives || CONFIG.PLAYER.MAX_LIVES;
		this.score = 0;
		this.boardGraphics = null;
		this.waveGraphics = null;
	}

	create() {
		this.startTime = Date.now();
		this.levelData = LEVEL_DATA[this.levelId - 1];

		const cfg = this.levelData;

		this.cameras.main.setBackgroundColor('#f5b8b8');
		this.physics.world.setBounds(0, 0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
		this.cameras.main.setBounds(0, 0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);

		this.createBoardBorder();
		this.createWaves();
		this.createLevel();
		this.setupInput();
		this.setupCollisions();
		this.createUI();

		this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
		this.physics.world.gravity.y = cfg.gravity || CONFIG.PHYSICS.GRAVITY;

		this.audio.init();
		this.audio.playMusic();
	}

	createBoardBorder() {
		this.boardGraphics = this.add.graphics();
		this.boardGraphics.lineStyle(CONFIG.BOARD_BORDER, 0x000000, 1);
		this.boardGraphics.fillStyle(0xf5b8b8, 1);
		this.boardGraphics.fillRect(0, 0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
		this.boardGraphics.strokeRect(0, 0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
		this.boardGraphics.setDepth(-1);
	}

	createWaves() {
		this.waveGraphics = this.add.graphics();
		this.waveGraphics.setDepth(50);

		const drawWaves = () => {
			this.waveGraphics.clear();
			const baseY = CONFIG.BOARD_HEIGHT - 20;
			const color = 0xf5a5a5;
			this.waveGraphics.fillStyle(color, 1);
			this.waveGraphics.beginPath();
			this.waveGraphics.moveTo(0, CONFIG.BOARD_HEIGHT);
			for (let x = 0; x <= CONFIG.BOARD_WIDTH; x += 5) {
				const y = baseY + Math.sin(x * 0.03 + Date.now() * 0.002) * 8;
				this.waveGraphics.lineTo(x, y);
			}
			this.waveGraphics.lineTo(CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
			this.waveGraphics.closePath();
			this.waveGraphics.fillPath();

			this.waveGraphics.fillStyle(0x6b8e23, 0.9);
			this.waveGraphics.beginPath();
			for (let x = 0; x <= CONFIG.BOARD_WIDTH; x += 3) {
				const baseY2 = baseY + 5;
				const y = baseY2 + Math.cos(x * 0.04) * 6;
				if (x === 0) this.waveGraphics.moveTo(x, y);
				else this.waveGraphics.lineTo(x, y);
			}
			this.waveGraphics.lineTo(CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
			this.waveGraphics.lineTo(0, CONFIG.BOARD_HEIGHT);
			this.waveGraphics.closePath();
			this.waveGraphics.fillPath();
		};

		this.timeEvent = this.time.addEvent({
			delay: 16,
			callback: drawWaves,
			callbackScope: this,
			loop: true
		});
	}

	createLevel() {
		const cfg = this.levelData;

		this.platforms = this.add.group();
		cfg.platforms.forEach(p => {
			let platform;
			if (p.type === 'moving') {
				platform = new MovingPlatform(this, p.x, p.y, p.w, p.h, p.moveX, p.moveY, p.duration);
			} else {
				platform = new Platform(this, p.x, p.y, p.w, p.h, p.type || 'normal');
			}
			this.add.existing(platform);
			this.platforms.add(platform);
		});

		this.collectibles = this.add.group();
		cfg.collectibles.forEach(c => {
			const col = new Collectible(this, c.x, c.y, c.type || 'ring');
			this.collectibles.add(col);
		});

		this.checkpoints = this.add.group();
		cfg.checkpoints.forEach(cp => {
			const checkpoint = new Checkpoint(this, cp.x, cp.y);
			this.checkpoints.add(checkpoint);
		});

		this.portals = this.add.group();
		if (cfg.portal) {
			const portal = new Portal(this, cfg.portal.x, cfg.portal.y);
			this.portals.add(portal);
		}

		this.obstacles = this.add.group();
		cfg.obstacles.forEach(obs => {
			if (obs.type === 'spike') {
				const spike = new Spike(this, obs.x, obs.y, obs.count || 1, obs.direction || 'up');
				this.obstacles.add(spike);
			} else if (obs.type === 'rock') {
				const rock = new FallingRock(this, obs.x, obs.y, obs.w, obs.h, obs.fallDelay);
				this.obstacles.add(rock);
			}
		});

		this.enemies = [];
		cfg.enemies.forEach(e => {
			const enemy = this.add.rectangle(e.x, e.y, 26, 26, 0xff6b8a);
			this.physics.add.existing(enemy, true);
			enemy.body.setVelocity(e.speedX || -40, e.speedY || 0);
			enemy.body.setBounce(1, 0);
			enemy.body.setCollideWorldBounds(true);
			enemy.setDepth(4);
			this.enemies.push(enemy);
		});

		this.player = new Player(this, cfg.spawn.x, cfg.spawn.y, this.save, this.audio);
		this.add.existing(this.player);
	}

	createUI() {
		const uiDepth = 100;

		this.add.text(20, 10, 'Score:', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			fontWeight: 'bold',
			color: '#8b4513'
		}).setDepth(uiDepth).setScrollFactor(0);

		this.scoreText = this.add.text(80, 10, '0', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			fontWeight: 'bold',
			color: '#dc143c'
		}).setDepth(uiDepth).setScrollFactor(0);

		this.livesText = this.add.text(CONFIG.BOARD_WIDTH - 80, 10, `❤x${this.lives}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			fontWeight: 'bold',
			color: '#dc143c'
		}).setDepth(uiDepth).setScrollFactor(0);

		this.add.text(CONFIG.BOARD_WIDTH / 2, 10, `Level ${this.levelId}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '14px',
			fontWeight: 'bold',
			color: '#a0522d'
		}).setDepth(uiDepth).setOrigin(0.5).setScrollFactor(0);

		const pauseBtn = this.add.text(CONFIG.BOARD_WIDTH - 20, CONFIG.BOARD_HEIGHT - 20, '⏸', {
			fontSize: '20px',
			color: '#8b4513'
		}).setDepth(uiDepth).setOrigin(1, 1).setInteractive({ useHandCursor: true }).setScrollFactor(0);

		pauseBtn.on('pointerdown', () => {
			this.pauseGame();
		});

		this.touchControls = null;
		this.createTouchControls();
	}

	createTouchControls() {
		if (!this.sys.game.device.os.android && !this.sys.game.device.os.iOS) return;

		const size = CONFIG.TOUCH.BUTTON_SIZE;
		const spacing = CONFIG.TOUCH.BUTTON_SPACING;
		const bottom = 20;

		this.touchControls = {};

		const createBtn = (x, y, label, color) => {
			const bg = this.add.circle(x, y, size / 2, color, 0.6)
				.setDepth(100)
				.setScrollFactor(0);

			const text = this.add.text(x, y, label, {
				fontSize: '18px',
				color: '#fff',
				fontWeight: 'bold'
			}).setOrigin(0.5).setDepth(101).setScrollFactor(0);

			bg.on('pointerdown', () => {});
			return { bg, text };
		};

		const leftGroup = createBtn(spacing + size / 2, CONFIG.BOARD_HEIGHT + bottom + size / 2, '◀', 0xffffff);
		const rightGroup = createBtn(spacing * 2 + size, CONFIG.BOARD_HEIGHT + bottom + size / 2, '▶', 0xffffff);
		const jumpGroup = createBtn(CONFIG.BOARD_WIDTH - spacing - size / 2, CONFIG.BOARD_HEIGHT + bottom + size / 2, '▲', CONFIG.COLORS.BUTTON);

		this.touchControls.left = leftGroup.bg;
		this.touchControls.right = rightGroup.bg;
		this.touchControls.jump = jumpGroup.bg;

		leftGroup.bg.on('pointerdown', () => { this.cursor.left = true; });
		leftGroup.bg.on('pointerup', () => { this.cursor.left = false; });
		leftGroup.bg.on('pointerout', () => { this.cursor.left = false; });

		rightGroup.bg.on('pointerdown', () => { this.cursor.right = true; });
		rightGroup.bg.on('pointerup', () => { this.cursor.right = false; });
		rightGroup.bg.on('pointerout', () => { this.cursor.right = false; });

		jumpGroup.bg.on('pointerdown', () => {
			if (!this.cursor.up) {
				this.cursor.up = true;
				this.player.jump();
			}
		});
		jumpGroup.bg.on('pointerup', () => {
			this.cursor.up = false;
		});
		jumpGroup.bg.on('pointerout', () => {
			this.cursor.up = false;
		});
	}

	setupInput() {
		this.input.on('pointerdown', (pointer) => {
			if (pointer.y < CONFIG.BOARD_HEIGHT - 40) {
				this.cursor.up = true;
			}
		});
		this.input.on('pointerup', () => {
			this.cursor.up = false;
		});
	}

	setupCollisions() {
		this.physics.add.overlap(this.player, this.collectibles, (player, collectible) => {
			if (collectible.collect(player)) {
				this.collectedRings++;
				this.score += collectible.value;
				this.scoreText.setText(this.score.toString());
				this.audio.playCollect();
			}
		});

		this.physics.add.overlap(this.player, this.checkpoints, (player, checkpoint) => {
			if (!checkpoint.active) {
				checkpoint.activate();
				player.currentCheckpoint = { x: checkpoint.x, y: checkpoint.y };
				this.audio.playCheckpoint();
			}
		});

		this.physics.add.overlap(this.player, this.portals, (player, portal) => {
			if (player.portalCooldown <= 0) {
				player.portalCooldown = 1000;
				this.audio.playPortal();
				this.levelComplete();
			}
		});

		this.physics.add.overlap(this.player, this.obstacles, (player, obstacle) => {
			if (obstacle instanceof Spike || (obstacle.body && obstacle.body.enable)) {
				if (player.takeDamage()) {
					this.lives--;
					this.livesText.setText(`❤x${this.lives}`);
					this.save.data.lives = this.lives;
					this.save.save();
					this.scene.start('GameOverScene', {
						levelId: this.levelId,
						user: this.user,
						save: this.save,
						audio: this.audio
					});
				}
			}
		});

		this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
			const diffY = player.y - enemy.y;
			if (diffY < -10 && player.body.velocity.y > 0) {
				enemy.destroy();
				player.body.setVelocityY(-300);
				this.score += 5;
				this.scoreText.setText(this.score.toString());
			} else {
				if (player.takeDamage()) {
					this.lives--;
					this.livesText.setText(`❤x${this.lives}`);
					this.save.data.lives = this.lives;
					this.save.save();
					this.scene.start('GameOverScene', {
						levelId: this.levelId,
						user: this.user,
						save: this.save,
						audio: this.audio
					});
				}
			}
		});

		this.physics.add.collider(this.player, this.platforms, (player) => {
			if (player.body.touching.down) {
				player.onGround = true;
				player.doubleJumpUsed = false;
			}
		});

		this.physics.add.collider(this.player, this.enemies);
		this.physics.add.collider(this.enemies, this.platforms);

		this.obstacles.getChildren().forEach(obs => {
			if (obs.triggerZone) {
				this.physics.add.overlap(this.player, obs.triggerZone, () => {
					obs.triggerFall();
				});
			}
		});
	}

	update() {
		if (this.isPaused || !this.player || this.player.isDead) return;

		const { left, right, up } = this.cursor;
		const speed = CONFIG.PHYSICS.PLAYER_SPEED * this.player.speedBoost;

		this.player.body.setVelocityX(Phaser.Math.Clamp(this.player.body.velocity.x, -speed, speed));

		if (left) {
			this.player.body.setVelocityX(-speed);
			this.player.facingRight = false;
		}
		if (right) {
			this.player.body.setVelocityX(speed);
			this.player.facingRight = true;
		}
		if (!left && !right) {
			this.player.body.setVelocityX(this.player.body.velocity.x * CONFIG.PHYSICS.FRICTION);
		}

		if (up && !this.player.jumpPressed) {
			this.player.jump();
			this.player.jumpPressed = true;
		}
		if (!up) {
			this.player.jumpPressed = false;
		}

		const onGroundNow = this.player.body.blocked.down || this.player.body.touching.down;
		if (onGroundNow && !this.player.onGround) {
			this.player.onGround = true;
			this.player.doubleJumpUsed = false;
		}
		if (!onGroundNow) {
			this.player.onGround = false;
		}

		if (this.input.keyboard.checkDown(this.inputKey.space, 50) || this.input.keyboard.checkDown(this.inputKey.up, 50)) {
			if (!this.player.jumpPressed) {
				this.player.jump();
				this.player.jumpPressed = true;
			}
		}
		if (!this.input.keyboard.checkDown(this.inputKey.space, 50) && !this.input.keyboard.checkDown(this.inputKey.up, 50)) {
			this.player.jumpPressed = false;
		}
	}

	pauseGame() {
		if (this.isPaused) return;
		this.isPaused = true;
		this.physics.pause();

		const overlay = this.add.rectangle(CONFIG.BOARD_WIDTH / 2, CONFIG.BOARD_HEIGHT / 2, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT, 0x000000, 0.7).setDepth(50);

		this.add.text(CONFIG.BOARD_WIDTH / 2, CONFIG.BOARD_HEIGHT / 2 - 50, 'PAUSED', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '48px',
			fontWeight: '700',
			color: '#ffffff'
		}).setOrigin(0.5).setDepth(51);

		const resumeBtn = this.add.text(CONFIG.BOARD_WIDTH / 2, CONFIG.BOARD_HEIGHT / 2 + 20, 'RESUME', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '22px',
			color: '#44ff44'
		}).setOrigin(0.5).setDepth(51).setInteractive({ useHandCursor: true });

		const quitBtn = this.add.text(CONFIG.BOARD_WIDTH / 2, CONFIG.BOARD_HEIGHT / 2 + 70, 'QUIT', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '22px',
			color: '#ff6b8a'
		}).setOrigin(0.5).setDepth(51).setInteractive({ useHandCursor: true });

		resumeBtn.on('pointerdown', () => {
			this.resumeGame();
		});

		quitBtn.on('pointerdown', () => {
			this.audio.stopMusic();
			this.scene.start('MenuScene', {
				user: this.user,
				save: this.save,
				audio: this.audio
			});
		});
	}

	resumeGame() {
		this.isPaused = false;
		this.physics.resume();
		this.scene.restart({
			levelId: this.levelId,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	levelComplete() {
		this.isPaused = true;
		this.physics.pause();
		this.audio.stopMusic();

		const time = Math.floor((Date.now() - this.startTime) / 1000);
		const result = this.save.completeLevel(this.levelId, this.collectedRings, time);

		this.scene.start('VictoryScene', {
			levelId: this.levelId,
			rings: this.collectedRings,
			time: time,
			isNewRecord: result.isNewRecord,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	gameOver() {
		this.isPaused = true;
		this.audio.stopMusic();

		this.scene.start('GameOverScene', {
			levelId: this.levelId,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}
}