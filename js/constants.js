window.BounceGame = window.BounceGame || {};

const CONFIG = {
	GAME_TITLE: 'Bounce Classic',
	VERSION: '1.0.0',
	WEB_URL: 'https://bounce-adventure.game',

	WINDOW_WIDTH: 480,
	WINDOW_HEIGHT: 800,
	SCALE_MODE: Phaser.Scale.FIT,
	AUTO_CENTER: Phaser.Scale.CENTER_BOTH,

	BOARD_X: 0,
	BOARD_Y: 0,
	BOARD_WIDTH: 480,
	BOARD_HEIGHT: 480,
	BOARD_BORDER: 4,

	PHYSICS: {
		GRAVITY: 1200,
		PLAYER_SPEED: 250,
		JUMP_VELOCITY: -480,
		BOUNCE_VELOCITY: -440,
		MAX_FALL_SPEED: 550,
		FRICTION: 0.88,
		BOUNCE_DAMPING: 0.6
	},

	PLAYER: {
		RADIUS: 14,
		MAX_LIVES: 5,
		INVINCIBILITY_TIME: 2000,
		COLORS: {
			BODY: 0xff6b8a,
			HIGHLIGHT: 0xffb8c8,
			SHADOW: 0xcc4566
		}
	},

	LEVELS: {
		TOTAL: 10,
		TILE_SIZE: 40
	},

	COLORS: {
		BACKGROUND: 0xf5b8b8,
		MENU_BG: 0xf5a5a5,
		BUTTON: 0xdc143c,
		BUTTON_HOVER: 0xff6b8a,
		PORTAL: 0x00d4ff,
		CHECKPOINT: 0x44ff44,
		RING: 0xffd700,
		SPIKE: 0xff3333,
		BLOCK_BROWN: 0xa0522d,
		BLOCK_ORANGE: 0xd2691e,
		BLOCK_RED: 0xdc143c,
		BLOCK_DARK: 0x8b4513
	},

	AUDIO: {
		MASTER_VOLUME: 0.7,
		SFX_VOLUME: 0.8,
		MUSIC_VOLUME: 0.5
	},

	UPGRADES: {
		EXTRA_LIFE: { id: 'extra_life', name: 'Extra Life', cost: 500, icon: '❤' },
		HIGHER_JUMP: { id: 'higher_jump', name: 'Bouncy Boost', cost: 300, icon: '⬆' },
		SHIELD: { id: 'shield', name: 'Shield', cost: 400, icon: '🛡' },
		SPEED_BOOST: { id: 'speed_boost', name: 'Speed Boost', cost: 350, icon: '⚡' },
		DOUBLE_JUMP: { id: 'double_jump', name: 'Double Jump', cost: 400, icon: '🦘' }
	},

	TOUCH: {
		BUTTON_SIZE: 56,
		BUTTON_ALPHA: 0.5,
		BUTTON_SPACING: 16
	}
};