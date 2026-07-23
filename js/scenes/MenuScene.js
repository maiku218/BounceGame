class MenuScene extends Phaser.Scene {
	constructor() {
		super({ key: 'MenuScene' });
	}

	init(data) {
		this.user = data.user || { name: 'Guest', email: 'guest' };
		this.save = data.save;
		this.audio = data.audio;
	}

	create() {
		this.audio.init();
		this.cameras.main.setBackgroundColor('#f5a5a5');

		this.createTitle();
		this.createButtons();
		this.createStats();
		this.createParticles();
		this.audio.playClick();
	}

	createTitle() {
		const title = this.add.text(CONFIG.WINDOW_WIDTH / 2, 100, 'BOUNCE', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '60px',
			fontWeight: '700',
			color: '#ffffff'
		}).setOrigin(0.5).setShadow(3, 3, '#8b0000', 3);

		const subtitle = this.add.text(CONFIG.WINDOW_WIDTH / 2, 165, 'CLASSIC', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '32px',
			fontWeight: '800',
			color: '#dc143c'
		}).setOrigin(0.5).setShadow(2, 2, '#8b0000', 2);

		this.tweens.add({
			targets: [title, subtitle],
			y: '+=8',
			duration: 2000,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});
	}

	createButtons() {
		const buttons = [
			{ label: 'PLAY', y: 260, action: () => this.startGame() },
			{ label: 'CONTINUE', y: 320, action: () => this.openContinue() },
			{ label: 'SHOP', y: 380, action: () => this.openShop() },
			{ label: 'LEVELS', y: 440, action: () => this.openLevelSelect() },
			{ label: 'EXIT', y: 500, action: () => this.exitGame() }
		];

		buttons.forEach(btn => {
			const bg = this.add.rectangle(CONFIG.WINDOW_WIDTH / 2, btn.y, 220, 50, CONFIG.COLORS.BUTTON, 1)
				.setStrokeStyle(3, 0x000000, 0.3)
				.setInteractive({ useHandCursor: true });

			const text = this.add.text(CONFIG.WINDOW_WIDTH / 2, btn.y, btn.label, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '24px',
				fontWeight: '700',
				color: '#ffffff'
			}).setOrigin(0.5);

			bg.on('pointerover', () => {
				bg.setFillStyle(CONFIG.COLORS.BUTTON_HOVER, 1);
				text.setColor('#ffffff');
				this.tweens.add({ targets: bg, scaleX: 1.05, scaleY: 1.05, duration: 100 });
			});
			bg.on('pointerout', () => {
				bg.setFillStyle(CONFIG.COLORS.BUTTON, 1);
				text.setColor('#ffffff');
				this.tweens.add({ targets: bg, scaleX: 1, scaleY: 1, duration: 100 });
			});
			bg.on('pointerdown', () => {
				this.audio.playClick();
				bg.setScale(0.95);
				btn.action();
			});
		});
	}

	createStats() {
		const ringTotal = this.save.data.totalRings || 0;
		const stars = this.save.data.totalStars || 0;

		this.add.text(20, CONFIG.WINDOW_HEIGHT - 60, `Rings: ${ringTotal}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			color: '#dc143c'
		});

		this.add.text(20, CONFIG.WINDOW_HEIGHT - 30, `Levels: ${stars}/${CONFIG.LEVELS.TOTAL}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			color: '#8b4513'
		});

		this.add.text(CONFIG.WINDOW_WIDTH - 20, CONFIG.WINDOW_HEIGHT - 30, this.user.name, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			color: '#8b4513'
		}).setOrigin(1, 0.5);
	}

	createParticles() {
		for (let i = 0; i < 20; i++) {
			const x = Phaser.Math.Between(0, CONFIG.WINDOW_WIDTH);
			const size = Phaser.Math.Between(2, 5);
			const particle = this.add.circle(x, CONFIG.WINDOW_HEIGHT + 20, size, 0xffffff, 0.4);
			this.tweens.add({
				targets: particle,
				y: -20,
				alpha: 0,
				duration: Phaser.Math.Between(4000, 7000),
				repeat: -1,
				delay: Phaser.Math.Between(0, 5000)
			});
		}
	}

	startGame() {
		const nextLevel = this.save.data.unlockedLevels || 1;
		this.startLevel(nextLevel);
	}

	openContinue() {
		const unlockedLevels = this.save.data.unlockedLevels || 1;
		const lastCompleted = CONFIG.LEVELS.TOTAL;
		this.startLevel(Math.min(unlockedLevels, lastCompleted));
	}

	openShop() {
		this.scene.start('ShopScene', {
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	openLevelSelect() {
		this.scene.start('LevelSelectScene', {
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	exitGame() {
		if (confirm('Are you sure you want to exit?')) {
			this.save.save();
			this.game.destroy(true);
		}
	}

	startLevel(levelId) {
		this.scene.start('GameScene', {
			levelId: levelId,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}
}