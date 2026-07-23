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

		let topColor, bottomColor, borderColor;

		if (this.type === 'ice') {
			topColor = 0xaeeeff;
			bottomColor = 0x6ec6ff;
			borderColor = 0x3388bb;
		} else if (this.type === 'sticky') {
			topColor = 0xd2b48c;
			bottomColor = 0x8b6914;
			borderColor = 0x5c4400;
		} else if (this.type === 'breakable') {
			topColor = 0xcc7777;
			bottomColor = 0x883333;
			borderColor = 0x552222;
		} else if (this.type === 'moving') {
			topColor = 0xddaa88;
			bottomColor = 0xbb8844;
			borderColor = 0x885522;
		} else {
			topColor = CONFIG.COLORS.BLOCK_ORANGE;
			bottomColor = CONFIG.COLORS.BLOCK_BROWN;
			borderColor = 0x000000;
		}

		this.graphics.fillStyle(bottomColor, 1);
		this.graphics.fillRoundedRect(x, y + 3, w, h - 3, 4);
		this.graphics.fillStyle(topColor, 1);
		this.graphics.fillRoundedRect(x, y, w, h - 3, 4);

		this.graphics.lineStyle(1, 0xffffff, 0.3);
		this.graphics.strokeRoundedRect(x + 1, y + 1, w - 2, h - 5, 4);

		this.graphics.fillStyle(0xffffff, 0.15);
		this.graphics.fillRect(x + 4, y + 4, w - 8, 4);

		this.graphics.lineStyle(2, borderColor, 0.8);
		this.graphics.strokeRoundedRect(x, y, w, h - 3, 4);

		this.graphics.fillStyle(bottomColor, 0.8);
		this.graphics.fillRect(x, y + h - 5, w, 5);
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

		this.graphics.fillStyle(0xd2b48c, 1);
		this.graphics.fillRoundedRect(x, y + 3, w, h - 3, 4);
		this.graphics.fillStyle(0xf0dcc0, 1);
		this.graphics.fillRoundedRect(x, y, w, h - 3, 4);
		this.graphics.lineStyle(2, 0x885522, 0.8);
		this.graphics.strokeRoundedRect(x, y, w, h - 3, 4);
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