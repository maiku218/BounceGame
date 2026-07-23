class Checkpoint extends Phaser.GameObjects.Container {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.active = false;
		this.graphics = scene.add.graphics();
		this.poleGraphics = scene.add.graphics();
		this.add(this.poleGraphics);
		this.add(this.graphics);
		scene.add.existing(this);
		this.setDepth(2);
		this.drawInactive();
	}

	drawInactive() {
		this.poleGraphics.clear();
		this.graphics.clear();

		this.poleGraphics.fillStyle(0x666666, 0.8);
		this.poleGraphics.fillRect(0, -40, 4, 40);
		this.poleGraphics.fillStyle(0x888888, 0.8);
		this.poleGraphics.fillRect(0, -40, 4, 4);
		this.poleGraphics.fillRect(0, -32, 4, 2);
		this.poleGraphics.fillRect(0, -24, 4, 2);

		this.graphics.fillStyle(CONFIG.COLORS.CHECKPOINT, 0.3);
		this.graphics.fillCircle(6, -38, 6);
		this.graphics.lineStyle(2, CONFIG.COLORS.CHECKPOINT, 0.5);
		this.graphics.strokeCircle(6, -38, 8);
	}

	activate() {
		if (this.active) return;
		this.active = true;
		this.poleGraphics.clear();
		this.graphics.clear();

		this.poleGraphics.fillStyle(0x44ff44, 1);
		this.poleGraphics.fillRect(0, -40, 4, 40);
		this.poleGraphics.fillStyle(0x88ff88, 1);
		this.poleGraphics.fillRect(0, -40, 4, 6);
		this.poleGraphics.fillRect(0, -30, 4, 3);
		this.poleGraphics.fillRect(0, -20, 4, 3);

		this.graphics.fillStyle(CONFIG.COLORS.CHECKPOINT, 1);
		this.graphics.fillCircle(8, -36, 10);
		this.graphics.lineStyle(3, 0xffffff, 0.8);
		this.graphics.strokeCircle(8, -36, 12);

		this.scene.tweens.add({
			targets: this.graphics,
			scaleX: 1.2,
			scaleY: 1.2,
			duration: 300,
			yoyo: true,
			ease: 'Back.easeOut'
		});
	}
}