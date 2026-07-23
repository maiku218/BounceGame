class LevelSelectScene extends Phaser.Scene {
	constructor() {
		super({ key: 'LevelSelectScene' });
	}

	init(data) {
		this.user = data.user;
		this.save = data.save;
		this.audio = data.audio;
	}

	create() {
		this.cameras.main.setBackgroundColor(CONFIG.COLORS.BACKGROUND);
		const unlockedLevels = this.save.data.unlockedLevels || 1;
		const completedLevels = this.save.data.completedLevels || {};
		const rings = this.save.data.totalRings || 0;

		this.createTitle();
		this.createLevelGrid(unlockedLevels, completedLevels, rings);
		this.createBackButton();
	}

	createTitle() {
		this.add.text(CONFIG.WINDOW_WIDTH / 2, 50, 'SELECT LEVEL', {
			fontFamily: 'Poppins, sans-serif',
			fontSize: '36px',
			fontWeight: '700',
			color: '#ffd93d'
		}).setOrigin(0.5);
	}

	createLevelGrid(unlockedLevels, completedLevels, rings) {
		const cols = 5;
		const rows = 2;
		const cellWidth = 120;
		const cellHeight = 100;
		const startX = (CONFIG.WINDOW_WIDTH - cols * cellWidth) / 2 + cellWidth / 2;
		const startY = 130;

		for (let i = 1; i <= CONFIG.LEVELS.TOTAL; i++) {
			const col = (i - 1) % cols;
			const row = Math.floor((i - 1) / cols);
			const x = startX + col * cellWidth;
			const y = startY + row * cellHeight;

			const isUnlocked = i <= unlockedLevels;
			const isCompleted = completedLevels[i];
			const levelData = LEVEL_DATA[i - 1];
			const levelRings = levelData ? levelData.collectibles.length : 0;

			const bg = this.add.rectangle(x, y, 100, 80,
				isUnlocked ? (isCompleted ? 0x2ecc71 : CONFIG.COLORS.MENU_BG) : 0x333333,
				0.9
			).setStrokeStyle(2, isCompleted ? 0xffd93d : (isUnlocked ? 0xffffff : 0x666666), 0.5);

			const label = this.add.text(x, y - 20, `${i}`, {
				fontFamily: 'Poppins, sans-serif',
				fontSize: '28px',
				fontWeight: '700',
				color: isUnlocked ? '#ffffff' : '#666666'
			}).setOrigin(0.5);

			if (isCompleted) {
				const ringsText = this.add.text(x, y + 5, `★ ${levelRings}`, {
					fontFamily: 'Poppins, sans-serif',
					fontSize: '12px',
					color: '#ffd700'
				}).setOrigin(0.5);

				this.add.text(x, y + 24, 'DONE', {
					fontFamily: 'Poppins, sans-serif',
					fontSize: '10px',
					color: '#44ff44'
				}).setOrigin(0.5);
			} else if (isUnlocked) {
				this.add.text(x, y + 5, 'READY', {
					fontFamily: 'Poppins, sans-serif',
					fontSize: '12px',
					color: '#88ccff'
				}).setOrigin(0.5);
			} else {
				this.add.text(x, y + 5, '🔒', {
					fontFamily: 'Poppins, sans-serif',
					fontSize: '20px'
				}).setOrigin(0.5);
			}

			if (isUnlocked) {
				bg.setInteractive({ useHandCursor: true });
				bg.on('pointerover', () => {
					this.tweens.add({ targets: bg, scaleX: 1.1, scaleY: 1.1, duration: 100 });
					this.tweens.add({ targets: label, scaleX: 1.1, scaleY: 1.1, duration: 100 });
				});
				bg.on('pointerout', () => {
					this.tweens.add({ targets: bg, scaleX: 1, scaleY: 1, duration: 100 });
					this.tweens.add({ targets: label, scaleX: 1, scaleY: 1, duration: 100 });
				});
				bg.on('pointerdown', () => {
					this.audio.playClick();
					this.startLevel(i);
				});
			}
		}

		this.add.text(CONFIG.WINDOW_WIDTH / 2, CONFIG.WINDOW_HEIGHT - 30, `Total Rings: ${rings}`, {
			fontFamily: 'Poppins, sans-serif',
			fontSize: '16px',
			color: '#888'
		}).setOrigin(0.5);
	}

	createBackButton() {
		const back = this.add.text(30, 30, '< BACK', {
			fontFamily: 'Poppins, sans-serif',
			fontSize: '18px',
			color: '#ff6b6b'
		}).setInteractive({ useHandCursor: true });

		back.on('pointerover', () => {
			this.tweens.add({ targets: back, scaleX: 1.1, scaleY: 1.1, duration: 100 });
		});
		back.on('pointerout', () => {
			this.tweens.add({ targets: back, scaleX: 1, scaleY: 1, duration: 100 });
		});
		back.on('pointerdown', () => {
			this.audio.playClick();
			this.scene.start('MenuScene', {
				user: this.user,
				save: this.save,
				audio: this.audio
			});
		});
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