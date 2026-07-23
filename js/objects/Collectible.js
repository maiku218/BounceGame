class Collectible extends Phaser.GameObjects.Container {
	constructor(scene, x, y, type = 'ring') {
		super(scene, x, y);
		this.type = type;
		this.value = type === 'ring' ? 10 : 50;
		this.collected = false;
		this.graphics = scene.add.graphics();
		this.add(this.graphics);
		scene.add.existing(this);
		this.setDepth(5);
		this.draw();
		this.animate();
	}

	draw() {
		this.graphics.clear();
		const x = 0;
		const y = 0;
		const radius = 12;
		const innerRadius = 6;

		if (this.type === 'ring') {
			this.graphics.lineStyle(3, CONFIG.COLORS.RING, 1);
			this.graphics.strokeCircle(x, y, radius);
			this.graphics.lineStyle(2, CONFIG.COLORS.BUTTON_HOVER, 1);
			this.graphics.fillStyle(CONFIG.COLORS.RING, 0.3);
			this.graphics.fillCircle(x, y, radius * 0.3);
		} else if (this.type === 'coin') {
			this.graphics.fillStyle(CONFIG.COLORS.RING, 1);
			this.graphics.fillCircle(x, y, radius);
			this.graphics.fillStyle(CONFIG.COLORS.BUTTON_HOVER, 0.6);
			this.graphics.fillCircle(x, y, radius * 0.5);
		} else if (this.type === 'gem') {
			this.graphics.fillStyle(0x9932cc, 1);
			this.graphics.fillTriangle(x, y - radius, x - radius, y + radius, x + radius, y + radius);
			this.graphics.fillStyle(0xda70d6, 0.5);
			this.graphics.fillTriangle(x, y - radius * 0.5, x - radius * 0.5, y + radius * 0.5, x + radius * 0.5, y + radius * 0.5);
		}
	}

	animate() {
		this.scene.tweens.add({
			targets: this,
			y: this.y - 8,
			alpha: 0.7,
			duration: 1500,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1
		});
	}

	collect(player) {
		if (this.collected) return false;
		this.collected = true;

		this.scene.tweens.add({
			targets: this,
			y: this.y - 50,
			alpha: 0,
			duration: 300,
			ease: 'Power2',
			onComplete: () => {
				this.destroy();
			}
		});

		player.scene.emit('collectItem', this);
		return true;
	}
}