class Player extends Phaser.GameObjects.Container {
	constructor(scene, x, y, saveSystem, audioManager) {
		super(scene, x, y);
		this.scene = scene;
		this.saveSystem = saveSystem;
		this.audioManager = audioManager;
		this.bodyRadius = CONFIG.PLAYER.RADIUS;
		this.lives = saveSystem.data.lives;
		this.invincible = false;
		this.onGround = false;
		this.jumpHeld = false;
		this.jumpPressed = false;
		this.facingRight = true;
		this.portalCooldown = 0;
		this.isDead = false;
		this.hasDoubleJump = saveSystem.hasUpgrade('double_jump');
		this.doubleJumpUsed = false;
		this.speedBoost = saveSystem.hasUpgrade('speed_boost') ? 1.3 : 1;
		this.higherJump = saveSystem.hasUpgrade('higher_jump') ? 1.25 : 1;
		this.isShielded = saveSystem.hasUpgrade('shield');
		this.shieldDuration = 0;
		this.currentCheckpoint = { x, y };
		this.graphics = scene.add.graphics();
		this.add(this.graphics);
		scene.add.existing(this);
		scene.physics.add.existing(this);
		this.body = this.body;
		this.body.setCircle(this.bodyRadius);
		this.body.setOffset(0, 0);
		this.body.setBounce(0.05);
		this.body.setDrag(100, 0);
		this.body.setMaxSpeed(CONFIG.PHYSICS.PLAYER_SPEED * this.speedBoost, CONFIG.PHYSICS.MAX_FALL_SPEED);
		this.body.setCollideWorldBounds(true);
		this.setDepth(10);
		this.draw();
	}

	draw() {
		this.graphics.clear();
		const r = this.bodyRadius;

		if (this.invincible && Date.now() % 200 < 100) {
			this.graphics.lineStyle(2, CONFIG.PLAYER.COLORS.BODY, 0.5);
			this.graphics.strokeCircle(0, 0, r);
			return;
		}

		this.graphics.fillStyle(CONFIG.PLAYER.COLORS.BODY, 1);
		this.graphics.fillCircle(0, 0, r);
		this.graphics.lineStyle(2, 0x000000, 0.2);
		this.graphics.strokeCircle(0, 0, r);
		this.graphics.fillStyle(0xffffff, 0.5);
		this.graphics.fillCircle(-r * 0.3, -r * 0.3, r * 0.25);

		if (this.isShielded && this.shieldDuration > 0) {
			this.graphics.lineStyle(2, 0x00ffff, 0.6);
			this.graphics.strokeCircle(0, 0, r + 4);
			this.graphics.lineStyle(1, 0x00ffff, 0.3);
			this.graphics.strokeCircle(0, -3, r + 7);
		}
	}

	setPosition(x, y) {
		super.setPosition(x, y);
		this.body.reset(x, y);
		this.currentCheckpoint = { x, y };
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);
		if (this.isDead) return;

		if (this.portalCooldown > 0) {
			this.portalCooldown -= delta;
		}

		this.graphics.alpha = this.invincible ? 0.5 : 1;

		if (this.shieldDuration > 0) {
			this.shieldDuration -= delta;
			if (this.shieldDuration <= 0) {
				this.isShielded = false;
			}
		}

		this.draw();
	}

	jump(velocity = CONFIG.PHYSICS.BOUNCE_VELOCITY * this.higherJump) {
		if (this.isDead) return;

		if (this.onGround) {
			this.body.setVelocityY(velocity);
			this.onGround = false;
			this.doubleJumpUsed = false;
			this.audioManager.playJump();
		} else if (this.hasDoubleJump && !this.doubleJumpUsed) {
			this.body.setVelocityY(velocity * 0.85);
			this.doubleJumpUsed = true;
			this.audioManager.playJump();
		}
	}

	takeDamage() {
		if (this.invincible || this.isDead) return false;

		if (this.isShielded) {
			this.shieldDuration = 0;
			this.isShielded = false;
			this.invincible = true;
			this.scene.time.delayedCall(1000, () => { this.invincible = false; });
			this.audioManager.playHurt();
			return false;
		}

		return true;
	}

	die() {
		this.isDead = true;
		this.body.setVelocity(0, 0);
		this.body.enable = false;
		this.audioManager.playDeath();
		this.scene.time.delayedCall(1000, () => { this.scene.gameOver(); });
	}

	respawn(x, y) {
		this.isDead = false;
		this.body.enable = true;
		this.invincible = true;
		this.setPosition(x, y);
		this.body.setVelocity(0, 0);
		this.scene.time.delayedCall(1500, () => { this.invincible = false; });
	}

	activateShield(duration = 10000) {
		this.isShielded = true;
		this.shieldDuration = duration;
		this.draw();
	}

	activateSpeedBoost(duration = 10000) {
		this.speedBoost = 1.3;
		this.body.setMaxSpeed(CONFIG.PHYSICS.PLAYER_SPEED * this.speedBoost, CONFIG.PHYSICS.MAX_FALL_SPEED);
		this.scene.time.delayedCall(duration, () => {
			this.speedBoost = 1;
			this.body.setMaxSpeed(CONFIG.PHYSICS.PLAYER_SPEED * this.speedBoost, CONFIG.PHYSICS.MAX_FALL_SPEED);
		});
	}
}