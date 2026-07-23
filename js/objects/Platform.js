class Platform extends Phaser.GameObjects.Container {
	constructor(scene, x, y, width, height, type = 'normal') {
		super(scene, x + width / 2, y + height / 2);
		this.type = type;
		this.width = width;
		this.height = height;
		this.graphics = scene.add.graphics();
		this.add(this.graphics);
		scene.add.existing(this);
		scene.physics.add.existing(this, true);
		this.body.setSize(width, height);
		this.body.immovable = true;
		this.setDepth(1);
		this.draw();
	}

	draw() {
		this.graphics.clear();
		const w = this.width;
		const h = this.height;
		const x = this.x - w / 2;
		const y = this.y - h / 2;

		const colors = {
			normal: 0xd2691e,
			ice: 0x6ec6ff,
			sticky: 0x8b6914,
			breakable: 0x883333,
			moving: 0xbb8844
		};

		const color = colors[this.type] || colors.normal;

		this.graphics.fillStyle(color, 1);
		this.graphics.fillRect(x, y, w, h);
		this.graphics.lineStyle(2, 0x000000, 1);
		this.graphics.strokeRect(x, y, w, h);
	}
}

class MovingPlatform extends Phaser.GameObjects.Container {
	constructor(scene, x, y, width, height, moveX = 0, moveY = 0, duration = 2000) {
		super(scene, x + width / 2, y + height / 2);
		this.width = width;
		this.height = height;
		this.startX = x + width / 2;
		this.startY = y + height / 2;
		this.graphics = scene.add.graphics();
		this.add(this.graphics);
		scene.add.existing(this);
		scene.physics.add.existing(this, true);
		this.body.setSize(width, height);
		this.body.immovable = true;
		this.body.allowGravity = false;
		this.body.moves = false;
		this.setDepth(1);
		this.draw();
		this.startMovement(moveX, moveY, duration);
	}

	draw() {
		this.graphics.clear();
		const w = this.width;
		const h = this.height;
		const x = this.x - w / 2;
		const y = this.y - h / 2;

		this.graphics.fillStyle(0xbb8844, 1);
		this.graphics.fillRect(x, y, w, h);
		this.graphics.lineStyle(2, 0x000000, 1);
		this.graphics.strokeRect(x, y, w, h);
	}

	startMovement(moveX, moveY, duration) {
		this.scene.tweens.add({
			targets: this,
			x: this.startX + moveX,
			y: this.startY + moveY,
			duration: duration,
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: -1
		});
	}
}