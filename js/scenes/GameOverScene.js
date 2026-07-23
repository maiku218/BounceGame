class GameOverScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameOverScene' });
	}

	init(data) {
		this.levelId = data.levelId;
		this.user = data.user;
		this.save = data.save;
		this.audio = data.audio;
	}

	create() {
		this.cameras.main.setBackgroundColor('#f5a5a5');
		this.audio.init();

		this.add.text(CONFIG.WINDOW_WIDTH / 2, 60, 'GAME OVER', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '36px',
			fontWeight: '700',
			color: '#dc143c'
		}).setOrigin(0.5).setShadow(2, 2, '#8b0000', 2);

		const remainingLives = this.save.data.lives || 0;

		if (remainingLives > 0) {
			this.createContinueScreen();
		} else {
			this.createDeadScreen();
		}

		this.audio.playDeath();
	}

	createContinueScreen() {
		const panelY = 130;
		const panelW = CONFIG.WINDOW_WIDTH - 60;
		const panelH = 380;

		this.add.rectangle(CONFIG.WINDOW_WIDTH / 2, panelY + panelH / 2, panelW, panelH, 0xffffff, 0.9)
			.setStrokeStyle(3, 0x000000, 0.2);

		const tabs = [{ label: 'CONTINUE', active: true }, { label: 'NEW', active: false }];
		const tabY = panelY + 20;
		tabs.forEach((tab, i) => {
			const x = CONFIG.WINDOW_WIDTH / 2 - 80 + i * 160;
			this.add.rectangle(x, tabY, 140, 30, tab.active ? CONFIG.COLORS.BUTTON : 0xccbbbb, 1).setStrokeStyle(1, 0x000000, 0.2);
			this.add.text(x, tabY, tab.label, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '14px',
				fontWeight: '700',
				color: '#ffffff'
			}).setOrigin(0.5);
		});

		const itemData = [
			{ label: '1', date: '1/3', x: 80 },
			{ label: '24', date: '14/42', x: 160 },
			{ label: '25', date: '11/24', x: 240 },
			{ label: '26', date: '12/28', x: 320 },
			{ label: '27', date: '12/30', x: 400 }
		];

		const gridY = panelY + 100;
		const gridX = CONFIG.WINDOW_WIDTH / 2 - 180;
		itemData.forEach((item, i) => {
			const col = i % 3;
			const row = Math.floor(i / 3);
			const x = gridX + col * 120;
			const y = gridY + row * 100;

			const card = this.add.rectangle(x, y, 100, 80, 0xf0dcc0, 1).setStrokeStyle(2, 0x000000, 0.2).setInteractive({ useHandCursor: true });
			const ball = this.add.circle(x, y - 10, 14, 0x44ff44, 1).setStrokeStyle(2, 0x000000, 0.3);
			this.add.text(x, y + 15, item.label, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '12px',
				color: '#8b4513'
			}).setOrigin(0.5);
			this.add.text(x, y + 35, item.date, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '10px',
				color: '#666666'
			}).setOrigin(0.5);

			card.on('pointerover', () => {
				card.setScale(1.05);
			});
			card.on('pointerout', () => {
				card.setScale(1);
			});
			card.on('pointerdown', () => {
				this.audio.playClick();
				this.continueGame(this.levelId);
			});
		});

		const nextBtn = this.add.text(CONFIG.WINDOW_WIDTH / 2 - 60, panelY + panelH - 30, 'NEXT >>', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			fontWeight: '700',
			color: '#dc143c'
		}).setOrigin(0.5).setInteractive({ useHandCursor: true });

		nextBtn.on('pointerdown', () => {
			this.audio.playClick();
			this.geToMenu();
		});

		const menuBtn = this.add.text(CONFIG.WINDOW_WIDTH / 2 + 60, panelY + panelH - 30, 'MENU', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			fontWeight: '700',
			color: '#8b4513'
		}).setOrigin(0.5).setInteractive({ useHandCursor: true });

		menuBtn.on('pointerdown', () => {
			this.audio.playClick();
			this.geToMenu();
		});
	}

	createDeadScreen() {
		this.add.text(CONFIG.WINDOW_WIDTH / 2, 200, 'All lives lost!', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '20px',
			color: '#8b4513'
		}).setOrigin(0.5);

		const buttons = [
			{ label: 'RETRY', y: 300, action: () => this.retry() },
			{ label: 'MENU', y: 370, action: () => this.goToMenu() }
		];

		buttons.forEach(btn => {
			const bg = this.add.rectangle(CONFIG.WINDOW_WIDTH / 2, btn.y, 180, 44, CONFIG.COLORS.BUTTON, 1)
				.setInteractive({ useHandCursor: true });

			const text = this.add.text(CONFIG.WINDOW_WIDTH / 2, btn.y, btn.label, {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '20px',
				fontWeight: '700',
				color: '#ffffff'
			}).setOrigin(0.5);

			bg.on('pointerover', () => bg.setFillStyle(CONFIG.COLORS.BUTTON_HOVER, 1));
			bg.on('pointerout', () => bg.setFillStyle(CONFIG.COLORS.BUTTON, 1));
			bg.on('pointerdown', () => {
				this.audio.playClick();
				btn.action();
			});
		});
	}

	continueGame(levelId) {
		this.scene.start('GameScene', {
			levelId: levelId,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	retry() {
		this.scene.start('GameScene', {
			levelId: this.levelId,
			user: this.user,
			save: this.save,
			audio: this.audio
		});
	}

	goToMenu() {
		this.scene.start('MenuScene', { user: this.user, save: this.save, audio: this.audio });
	}

	geToMenu() {
		this.goToMenu();
	}
}