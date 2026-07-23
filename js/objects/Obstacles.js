class Spike extends Phaser.GameObjects.Container {
	constructor(scene, x, y, count = 3, direction = 'up') {
		super(scene, x, y);
		this.graphics = scene.add.graphics();
		this.count = count;
		this.direction = direction;
		this.add(this.graphics);
		scene.add.existing(this);
		this.setDepth(2);
		this.draw();
	}

	draw() {
		this.graphics.clear();
		const spikeWidth = 12;
		const spikeHeight = 20;

		for (let i = 0; i < this.count; i++) {
			const px = -((this.count - 1) * spikeWidth / 2) + i * spikeWidth;
			const py = this.direction === 'up' ? 0 : -spikeHeight;

			this.graphics.fillStyle(CONFIG.COLORS.SPIKE, 1);
			if (this.direction === 'up') {
				this.graphics.fillTriangle(px - spikeWidth / 2, 0, px + spikeWidth / 2, 0, px, -spikeHeight);
			} else if (this.direction === 'down') {
				this.graphics.fillTriangle(px - spikeWidth / 2, 0, px + spikeWidth / 2, 0, px, spikeHeight);
			} else if (this.direction === 'left') {
				this.graphics.fillTriangle(0, py - spikeWidth / 2, 0, py + spikeWidth / 2, -spikeHeight, py);
			} else {
				this.graphics.fillTriangle(0, py - spikeWidth / 2, 0, py + spikeWidth / 2, spikeHeight, py);
			}
		}
	}
}

class FallingRock extends Phaser.GameObjects.Group {
	constructor(scene, x, y, width, height, fallDelay = 2000) {
		super(scene);
		this.rock = scene.add.rectangle(x + width / 2, y, width, height, 0x555555);
		this.rock.setStrokeStyle(2, 0x333333);
		this.add(this.rock);
		scene.add.existing(this.rock);
		scene.physics.add.existing(this.rock, true);
		this.rock.body.allowGravity = false;
		this.rock.setDepth(4);
		this.fallDelay = fallDelay;
		this.fallTriggered = false;

		this.triggerZone = scene.add.rectangle(x + width / 2, y - 50, width + 40, 100, 0xff0000, 0.1);
		this.triggerZone.setInteractive();
		this.add(this.triggerZone);
		scene.add.existing(this.triggerZone);
		this.triggerZone.setDepth(0);
		this.triggerZone.body.allowGravity = false;
		this.triggerZone.body.immovable = true;
	}

	triggerFall() {
		if (this.fallTriggered) return;
		this.fallTriggered = true;
		this.rock.body.allowGravity = true;
		this.scene.tweens.add({
			targets: this.rock,
			alpha: 0.8,
			duration: 3000,
			ease: 'Linear',
			onComplete: () => {
				this.rock.destroy();
				this.triggerZone.destroy();
			}
		});
	}
}