class VictoryScene extends Phaser.Scene {
	constructor() {
		super({ key: 'VictoryScene' });
	}

	init(data) {
		this.levelId = data.levelId;
		this.rings = data.rings || 0;
		this.time = data.time || 0;
		this.isNewRecord = data.isNewRecord || false;
		this.user = data.user;
		this.save = data.save;
		this.audio = data.audio;
	}

	create() {
		this.cameras.main.setBackgroundColor('#f5a5a5');
		this.audio.init();

		this.add.text(CONFIG.WINDOW_WIDTH / 2, 100, 'LEVEL', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '48px',
			fontWeight: '700',
			color: '#ffffff'
		}).setOrigin(0.5);

		if (this.isNewRecord) {
			this.add.text(CONFIG.WINDOW_WIDTH / 2, 150, 'NEW RECORD!', {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '24px',
				fontWeight: '700',
				color: '#ffd700'
			}).setOrigin(0.5);
		}

		const levelData = LEVEL_DATA[this.levelId - 1];
		const totalRings = levelData ? levelData.collectibles.length : 0;

		this.add.text(CONFIG.WINDOW_WIDTH / 2, 220, `Level ${this.levelId}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '22px',
			color: '#8b4513'
		}).setOrigin(0.5);

		this.add.text(CONFIG.WINDOW_WIDTH / 2, 260, `Rings: ${this.rings} / ${totalRings}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			color: '#dc143c'
		}).setOrigin(0.5);

		const mins = Math.floor(this.time / 60);
		const secs = this.time % 60;
		this.add.text(CONFIG.WINDOW_WIDTH / 2, 300, `Time: ${mins}:${secs.toString().padStart(2, '0')}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			color: '#8b4513'
		}).setOrigin(0.5);

		const buttons = [
			{ label: 'NEXT', y: 400, action: () => this.nextLevel() },
			{ label: 'MENU', y: 470, action: () => this.goToMenu() }
		];

		if (this.levelId >= CONFIG.LEVELS.TOTAL) {
			buttons[0].label = 'PLAY AGAIN';
		}

		buttons.forEach(btn => {
			const bg = this.add.rectangle(CONFIG.WINDOW_WIDTH / 2, btn.y, 180, 44, CONFIG.COLORS.BUTTON, 1)
				.setStrokeStyle(2, 0x000000, 0.2)
				.setInteractive({ useHandCursor: true });

			const text = this.add.text(CONFIG.WINDOW_WIDTH / 2, btn.y, btn.label, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '20px',
				fontWeight: '700',
				color: '#ffffff'
			}).setOrigin(0.5);

			bg.on('pointerover', () => {
				bg.setFillStyle(CONFIG.COLORS.BUTTON_HOVER, 1);
			});
			bg.on('pointerout', () => {
				bg.setFillStyle(CONFIG.COLORS.BUTTON, 1);
			});
			bg.on('pointerdown', () => {
				this.audio.playClick();
				btn.action();
			});
		});

		this.audio.playVictory();
		this.createParticles();
	}

	createParticles() {
		for (let i = 0; i < 30; i++) {
			const x = Phaser.Math.Between(50, CONFIG.WINDOW_WIDTH - 50);
			const particle = this.add.circle(x, CONFIG.WINDOW_HEIGHT + 20, Phaser.Math.Between(3, 6),
				[0xffd700, 0xff6b8a, 0x44ff44, 0xffd93d][Phaser.Math.Between(0, 3)],
				0.8
			);
			this.tweens.add({
				targets: particle,
				y: Phaser.Math.Between(100, 380),
				alpha: 0,
				scaleX: 0,
				scaleY: 0,
				duration: Phaser.Math.Between(1500, 3000),
				delay: Phaser.Math.Between(0, 500)
			});
		}
	}

	nextLevel() {
		if (this.levelId < CONFIG.LEVELS.TOTAL) {
			this.scene.start('GameScene', {
				levelId: this.levelId + 1,
				user: this.user,
				save: this.save,
				audio: this.audio
			});
		} else {
			this.scene.start('MenuScene', { user: this.user, save: this.save, audio: this.audio });
		}
	}

	goToMenu() {
		this.scene.start('MenuScene', { user: this.user, save: this.save, audio: this.audio });
	}
}