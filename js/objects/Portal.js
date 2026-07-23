class Portal extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.graphics = scene.add.graphics();
		this.add(this.graphics);
		scene.add.existing(this);
		this.setDepth(3);
		this.particles = [];
		this.activate();
	}

	activate() {
		this.scene.tweens.add({
			targets: this,
			angle: 360,
			duration: 10000,
			repeat: -1,
			ease: 'Linear'
		});

		this.scene.tweens.add({
			targets: this,
			scaleX: 1.1,
			scaleY: 1.1,
			duration: 1000,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});

		this.draw();
	}

	draw() {
		this.graphics.clear();
		const x = 0;
		const y = 0;
		const r = 30 + Math.sin(Date.now() * 0.003) * 3;

		this.graphics.lineStyle(4, CONFIG.COLORS.PORTAL, 0.8);
		this.graphics.strokeCircle(x, y, r);

		this.graphics.lineStyle(2, 0x00ffff, 0.4);
		this.graphics.strokeCircle(x, y, r * 0.7);

		this.graphics.lineStyle(1, 0xffffff, 0.6);
		this.graphics.strokeCircle(x, y, r * 0.3);

		for (let i = 0; i < 4; i++) {
			const angle = (Date.now() * 0.002) + (i * Math.PI / 2);
			const px = x + Math.cos(angle) * r * 0.5;
			const py = y + Math.sin(angle) * r * 0.5;
			this.graphics.fillStyle(0xffffff, 0.8);
			this.graphics.fillCircle(px, py, 2);
		}
	}

	preUpdate(time) {
		this.draw();
	}
}