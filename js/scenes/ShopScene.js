class ShopScene extends Phaser.Scene {
	constructor() {
		super({ key: 'ShopScene' });
	}

	init(data) {
		this.user = data.user;
		this.save = data.save;
		this.audio = data.audio;
	}

	create() {
		this.cameras.main.setBackgroundColor('#f5a5a5');
		this.audio.init();

		this.add.text(CONFIG.WINDOW_WIDTH / 2, 40, 'SHOP', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '36px',
			fontWeight: '700',
			color: '#ffffff'
		}).setOrigin(0.5).setShadow(2, 2, '#8b0000', 2);

		const rings = this.save.data.totalRings || 0;
		this.add.text(CONFIG.WINDOW_WIDTH / 2, 85, `Rings: ${rings}`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			fontWeight: '700',
			color: '#ffd700'
		}).setOrigin(0.5);

		const upgrades = [
			CONFIG.UPGRADES.EXTRA_LIFE,
			CONFIG.UPGRADES.HIGHER_JUMP,
			CONFIG.UPGRADES.SHIELD,
			CONFIG.UPGRADES.SPEED_BOOST,
			{ id: 'double_jump', name: 'Double Jump', cost: 400, icon: '🦘' }
		];

		upgrades.forEach((upgrade, index) => {
			const y = 150 + index * 90;
			const owned = this.save.hasUpgrade(upgrade.id);
			this.createUpgradeCard(upgrade, y, owned);
		});

		this.createBackButton();
	}

	createUpgradeCard(upgrade, y, owned) {
		const bg = this.add.rectangle(CONFIG.WINDOW_WIDTH / 2, y, CONFIG.WINDOW_WIDTH - 60, 70, 0xffffff, 0.95)
			.setStrokeStyle(2, 0x000000, 0.1);

		this.add.text(50, y - 15, upgrade.icon, {
			fontSize: '24px'
		}).setOrigin(0, 0.5);

		this.add.text(100, y - 15, upgrade.name, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '16px',
			fontWeight: '700',
			color: '#8b4513'
		}).setOrigin(0, 0.5);

		const costText = this.add.text(100, y + 10, `${upgrade.cost} rings`, {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '12px',
			color: '#666666'
		}).setOrigin(0, 0.5);

		if (owned) {
			const ownedText = this.add.text(CONFIG.WINDOW_WIDTH / 2 + 60, y, 'OWNED', {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '14px',
				fontWeight: '700',
				color: '#44ff44'
			}).setOrigin(0.5);
		} else {
			const buyBtn = this.add.text(CONFIG.WINDOW_WIDTH / 2 + 60, y, 'BUY', {
				fontFamily: 'Comic Sans MS, sans-serif',
				fontSize: '16px',
				fontWeight: '700',
				color: '#ffffff'
			}).setOrigin(0.5).setInteractive({ useHandCursor: true });

			const btnBg = this.add.rectangle(CONFIG.WINDOW_WIDTH / 2 + 60, y, 70, 32, CONFIG.COLORS.BUTTON, 1)
				.setInteractive({ useHandCursor: true }).setStrokeStyle(1, 0x000000, 0.2);

			buyBtn.on('pointerover', () => {
				bg.setFillStyle(0xffffff, 0.98);
				btnBg.setFillStyle(CONFIG.COLORS.BUTTON_HOVER, 1);
			});

			buyBtn.on('pointerout', () => {
				bg.setFillStyle(0xffffff, 0.95);
				btnBg.setFillStyle(CONFIG.COLORS.BUTTON, 1);
			});

			buyBtn.on('pointerdown', () => {
				this.purchaseUpgrade(upgrade, costText, btnBg, buyBtn);
			});
		}
	}

	purchaseUpgrade(upgrade, costText, btnBg, buyBtn) {
		if (this.save.hasUpgrade(upgrade.id)) {
			buyBtn.setText('OWNED');
			buyBtn.setColor('#44ff44');
			this.audio.playClick();
			return;
		}

		if (this.save.data.totalRings < upgrade.cost) {
			buyBtn.setText('NO RINGS');
			buyBtn.setColor('#ff3333');
			this.scene.time.delayedCall(800, () => {
				costText.setColor('#666666');
				buyBtn.setText('BUY');
				buyBtn.setColor('#ffffff');
				btnBg.setFillStyle(CONFIG.COLORS.BUTTON, 1);
			});
			return;
		}

		this.save.data.totalRings -= upgrade.cost;
		this.save.addUpgrade(upgrade.id);
		this.save.save();

		if (upgrade.id === 'extra_life') {
			this.save.data.lives += 1;
			this.save.save();
		}

		costText.setColor('#44ff44');
		costText.setText('OWNED');
		buyBtn.setText('OWNED');
		buyBtn.setColor('#44ff44');
		btnBg.setFillStyle(0x44ff44, 1);
		this.audio.playCollect();
	}

	createBackButton() {
		const back = this.add.text(30, CONFIG.WINDOW_HEIGHT - 40, '< BACK', {
			fontFamily: 'Comic Sans MS, sans-serif',
			fontSize: '18px',
			fontWeight: '700',
			color: '#dc143c'
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
}