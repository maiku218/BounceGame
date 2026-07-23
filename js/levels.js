const LEVEL_DATA = [{
	id: 1,
	name: 'Training Grounds',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 420 },
	platforms: [
		{ x: 0, y: 440, w: 160, h: 40, type: 'normal' },
		{ x: 200, y: 400, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 360, w: 140, h: 40, type: 'normal' },
		{ x: 0, y: 300, w: 120, h: 40, type: 'normal' },
		{ x: 160, y: 260, w: 120, h: 40, type: 'normal' },
		{ x: 320, y: 220, w: 160, h: 40, type: 'normal' },
		{ x: 180, y: 160, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 120, w: 140, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 400, type: 'ring' },
		{ x: 260, y: 360, type: 'ring' },
		{ x: 410, y: 320, type: 'ring' },
		{ x: 80, y: 260, type: 'ring' },
		{ x: 240, y: 220, type: 'ring' },
		{ x: 400, y: 180, type: 'ring' },
		{ x: 240, y: 120, type: 'ring' },
		{ x: 410, y: 80, type: 'ring' }
	],
	obstacles: [],
	checkpoints: [
		{ x: 260, y: 360 },
		{ x: 240, y: 220 }
	],
	enemies: [],
	portal: { x: 410, y: 80 }
}, {
	id: 2,
	name: 'Rolling Hills',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 420 },
	platforms: [
		{ x: 0, y: 440, w: 160, h: 40, type: 'normal' },
		{ x: 200, y: 400, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 360, w: 140, h: 40, type: 'normal' },
		{ x: 100, y: 320, w: 120, h: 40, type: 'normal' },
		{ x: 260, y: 280, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 240, w: 140, h: 40, type: 'normal' },
		{ x: 240, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 160, w: 100, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 400, type: 'ring' },
		{ x: 260, y: 360, type: 'ring' },
		{ x: 410, y: 320, type: 'ring' },
		{ x: 160, y: 280, type: 'ring' },
		{ x: 320, y: 240, type: 'ring' },
		{ x: 130, y: 200, type: 'ring' },
		{ x: 300, y: 160, type: 'ring' },
		{ x: 430, y: 120, type: 'ring' }
	],
	obstacles: [],
	checkpoints: [
		{ x: 260, y: 360 },
		{ x: 160, y: 280 },
		{ x: 300, y: 160 }
	],
	enemies: [
		{ x: 260, y: 420, speedX: -50, speedY: 0 }
	],
	portal: { x: 430, y: 120 }
}, {
	id: 3,
	name: 'Cavern Entrance',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1250,
	spawn: { x: 60, y: 420 },
	platforms: [
		{ x: 0, y: 440, w: 160, h: 40, type: 'normal' },
		{ x: 200, y: 400, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 360, w: 140, h: 40, type: 'normal' },
		{ x: 100, y: 320, w: 120, h: 40, type: 'normal' },
		{ x: 260, y: 280, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 240, w: 140, h: 40, type: 'normal' },
		{ x: 300, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 160, w: 160, h: 40, type: 'normal' },
		{ x: 250, y: 120, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 80, w: 100, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 400, type: 'ring' },
		{ x: 260, y: 360, type: 'ring' },
		{ x: 410, y: 320, type: 'ring' },
		{ x: 160, y: 280, type: 'ring' },
		{ x: 320, y: 240, type: 'ring' },
		{ x: 130, y: 200, type: 'ring' },
		{ x: 140, y: 120, type: 'ring' },
		{ x: 310, y: 80, type: 'ring' }
	],
	obstacles: [
		{ x: 60, y: 360, type: 'spike', count: 3, direction: 'up' },
		{ x: 300, y: 280, type: 'spike', count: 2, direction: 'up' },
		{ x: 140, y: 180, type: 'spike', count: 2, direction: 'up' }
	],
	checkpoints: [
		{ x: 260, y: 360 },
		{ x: 160, y: 280 },
		{ x: 140, y: 120 }
	],
	enemies: [
		{ x: 260, y: 420, speedX: -40, speedY: 0 }
	],
	portal: { x: 430, y: 80 }
}, {
	id: 4,
	name: 'Crystal Depths',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 420 },
	platforms: [
		{ x: 0, y: 440, w: 160, h: 40, type: 'ice' },
		{ x: 200, y: 400, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 360, w: 140, h: 40, type: 'normal' },
		{ x: 100, y: 320, w: 120, h: 40, type: 'ice' },
		{ x: 260, y: 280, w: 120, h: 40, type: 'normal' },
		{ x: 400, y: 240, w: 80, h: 40, type: 'normal' },
		{ x: 80, y: 200, w: 140, h: 40, type: 'normal' },
		{ x: 260, y: 160, w: 120, h: 40, type: 'ice' },
		{ x: 100, y: 120, w: 160, h: 40, type: 'normal' },
		{ x: 300, y: 80, w: 140, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 400, type: 'ring' },
		{ x: 260, y: 360, type: 'ring' },
		{ x: 410, y: 320, type: 'ring' },
		{ x: 160, y: 280, type: 'ring' },
		{ x: 320, y: 240, type: 'ring' },
		{ x: 150, y: 160, type: 'ring' },
		{ x: 320, y: 120, type: 'ring' },
		{ x: 370, y: 40, type: 'ring' }
	],
	obstacles: [
		{ x: 60, y: 280, type: 'spike', count: 3, direction: 'up' },
		{ x: 350, y: 160, type: 'spike', count: 2, direction: 'up' },
		{ x: 300, y: 280, type: 'spike', count: 2, direction: 'up' }
	],
	checkpoints: [
		{ x: 260, y: 360 },
		{ x: 320, y: 240 },
		{ x: 180, y: 120 }
	],
	enemies: [
		{ x: 200, y: 420, speedX: -35, speedY: 0 }
	],
	portal: { x: 370, y: 40 }
}, {
	id: 5,
	name: 'Final Challenge',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1250,
	spawn: { x: 60, y: 420 },
	platforms: [
		{ x: 0, y: 440, w: 160, h: 40, type: 'normal' },
		{ x: 200, y: 400, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 360, w: 140, h: 40, type: 'ice' },
		{ x: 100, y: 320, w: 120, h: 40, type: 'normal' },
		{ x: 260, y: 280, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 240, w: 140, h: 40, type: 'ice' },
		{ x: 300, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 100, y: 160, w: 160, h: 40, type: 'normal' },
		{ x: 280, y: 120, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 80, w: 160, h: 40, type: 'moving', moveX: 60, moveY: 0, duration: 2000 },
		{ x: 360, y: 80, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 400, type: 'ring' },
		{ x: 260, y: 360, type: 'ring' },
		{ x: 410, y: 320, type: 'ring' },
		{ x: 160, y: 280, type: 'ring' },
		{ x: 320, y: 240, type: 'ring' },
		{ x: 130, y: 200, type: 'ring' },
		{ x: 180, y: 120, type: 'ring' },
		{ x: 340, y: 40, type: 'ring' },
		{ x: 140, y: 40, type: 'ring' }
	],
	obstacles: [
		{ x: 180, y: 280, type: 'spike', count: 3, direction: 'up' },
		{ x: 40, y: 180, type: 'spike', count: 2, direction: 'up' },
		{ x: 360, y: 280, type: 'rock', w: 40, h: 40, fallDelay: 2000 },
		{ x: 360, y: 480, type: 'rock', w: 40, h: 40, fallDelay: 2500 }
	],
	checkpoints: [
		{ x: 260, y: 360 },
		{ x: 260, y: 240 },
		{ x: 180, y: 120 },
		{ x: 140, y: 40 }
	],
	enemies: [
		{ x: 200, y: 420, speedX: -50, speedY: 0 },
		{ x: 300, y: 280, speedX: 40, speedY: 0 },
		{ x: 100, y: 120, speedX: -35, speedY: 0 }
	],
	portal: { x: 420, y: 40 }
}];