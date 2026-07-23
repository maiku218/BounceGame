const LEVEL_DATA = [{
	id: 1,
	name: 'Training Grounds',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 160, h: 40, type: 'normal' },
		{ x: 200, y: 380, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 340, w: 140, h: 40, type: 'normal' },
		{ x: 60, y: 280, w: 120, h: 40, type: 'normal' },
		{ x: 220, y: 240, w: 120, h: 40, type: 'normal' },
		{ x: 360, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 180, y: 140, w: 140, h: 40, type: 'normal' },
		{ x: 340, y: 100, w: 140, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 80, y: 380, type: 'ring' }, { x: 260, y: 340, type: 'ring' },
		{ x: 410, y: 300, type: 'ring' }, { x: 120, y: 240, type: 'ring' },
		{ x: 280, y: 200, type: 'ring' }, { x: 420, y: 160, type: 'ring' },
		{ x: 250, y: 100, type: 'ring' }, { x: 410, y: 60, type: 'ring' }
	],
	obstacles: [],
	checkpoints: [{ x: 260, y: 340 }, { x: 280, y: 200 }, { x: 250, y: 100 }],
	enemies: [],
	portal: { x: 410, y: 60 }
}, {
	id: 2,
	name: 'Rolling Hills',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 60, y: 310, w: 120, h: 40, type: 'normal' },
		{ x: 210, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 360, y: 240, w: 120, h: 40, type: 'normal' },
		{ x: 120, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 280, y: 160, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 110, w: 100, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 120, y: 270, type: 'ring' },
		{ x: 270, y: 235, type: 'ring' }, { x: 420, y: 200, type: 'ring' },
		{ x: 180, y: 160, type: 'ring' }, { x: 340, y: 120, type: 'ring' },
		{ x: 430, y: 70, type: 'ring' }
	],
	obstacles: [],
	checkpoints: [{ x: 240, y: 345 }, { x: 270, y: 235 }, { x: 340, y: 120 }],
	enemies: [{ x: 240, y: 395, speedX: -45, speedY: 0 }],
	portal: { x: 430, y: 70 }
}, {
	id: 3,
	name: 'Cavern Entrance',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1250,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 80, y: 310, w: 120, h: 40, type: 'normal' },
		{ x: 230, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 370, y: 240, w: 110, h: 40, type: 'normal' },
		{ x: 40, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 190, y: 160, w: 140, h: 40, type: 'normal' },
		{ x: 360, y: 120, w: 120, h: 40, type: 'normal' },
		{ x: 200, y: 80, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 140, y: 270, type: 'ring' },
		{ x: 290, y: 235, type: 'ring' }, { x: 100, y: 160, type: 'ring' },
		{ x: 260, y: 120, type: 'ring' }, { x: 260, y: 40, type: 'ring' }
	],
	obstacles: [
		{ x: 160, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 340, y: 275, type: 'spike', count: 2, direction: 'up' },
		{ x: 120, y: 185, type: 'spike', count: 3, direction: 'up' }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 290, y: 235 }, { x: 260, y: 120 }],
	enemies: [{ x: 250, y: 395, speedX: -40, speedY: 0 }],
	portal: { x: 260, y: 40 }
}, {
	id: 4,
	name: 'Crystal Depths',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'ice' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 60, y: 310, w: 120, h: 40, type: 'ice' },
		{ x: 210, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 350, y: 240, w: 130, h: 40, type: 'ice' },
		{ x: 100, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 250, y: 160, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 110, w: 100, h: 40, type: 'normal' },
		{ x: 180, y: 70, w: 120, h: 40, type: 'ice' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 120, y: 270, type: 'ring' },
		{ x: 270, y: 235, type: 'ring' }, { x: 415, y: 200, type: 'ring' },
		{ x: 160, y: 160, type: 'ring' }, { x: 240, y: 30, type: 'ring' }
	],
	obstacles: [
		{ x: 150, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 310, y: 275, type: 'spike', count: 3, direction: 'up' },
		{ x: 180, y: 185, type: 'spike', count: 2, direction: 'up' }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 270, y: 235 }, { x: 240, y: 30 }],
	enemies: [{ x: 260, y: 395, speedX: -35, speedY: 0 }],
	portal: { x: 240, y: 30 }
}, {
	id: 5,
	name: 'Sky Platform',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1100,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 80, y: 310, w: 120, h: 40, type: 'normal' },
		{ x: 230, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 60, y: 240, w: 120, h: 40, type: 'normal' },
		{ x: 200, y: 205, w: 120, h: 40, type: 'normal' },
		{ x: 340, y: 170, w: 140, h: 40, type: 'normal' },
		{ x: 140, y: 135, w: 120, h: 40, type: 'normal' },
		{ x: 300, y: 100, w: 120, h: 40, type: 'normal' },
		{ x: 180, y: 60, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 140, y: 270, type: 'ring' },
		{ x: 290, y: 235, type: 'ring' }, { x: 120, y: 200, type: 'ring' },
		{ x: 260, y: 165, type: 'ring' }, { x: 410, y: 130, type: 'ring' },
		{ x: 200, y: 95, type: 'ring' }, { x: 240, y: 20, type: 'ring' }
	],
	obstacles: [],
	checkpoints: [{ x: 240, y: 345 }, { x: 290, y: 235 }, { x: 260, y: 165 }, { x: 240, y: 20 }],
	enemies: [],
	portal: { x: 240, y: 20 }
}, {
	id: 6,
	name: 'Gravity Well',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1300,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 380, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 340, w: 150, h: 40, type: 'normal' },
		{ x: 60, y: 300, w: 120, h: 40, type: 'moving', moveX: 50, moveY: 0, duration: 2000 },
		{ x: 210, y: 260, w: 120, h: 40, type: 'normal' },
		{ x: 350, y: 220, w: 130, h: 40, type: 'normal' },
		{ x: 100, y: 180, w: 120, h: 40, type: 'moving', moveX: 0, moveY: -50, duration: 1800 },
		{ x: 250, y: 140, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 100, w: 100, h: 40, type: 'normal' },
		{ x: 180, y: 60, w: 120, h: 40, type: 'moving', moveX: 50, moveY: 0, duration: 2000 }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 340, type: 'ring' },
		{ x: 405, y: 300, type: 'ring' }, { x: 120, y: 260, type: 'ring' },
		{ x: 270, y: 220, type: 'ring' }, { x: 160, y: 140, type: 'ring' },
		{ x: 240, y: 40, type: 'ring' }, { x: 430, y: 60, type: 'ring' }
	],
	obstacles: [
		{ x: 170, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 320, y: 265, type: 'spike', count: 2, direction: 'up' },
		{ x: 150, y: 165, type: 'spike', count: 2, direction: 'up' }
	],
	checkpoints: [{ x: 240, y: 340 }, { x: 270, y: 220 }, { x: 240, y: 140 }],
	enemies: [{ x: 250, y: 395, speedX: -40, speedY: 0 }, { x: 320, y: 200, speedX: 35, speedY: 0 }],
	portal: { x: 240, y: 20 }
}, {
	id: 7,
	name: 'Lava Bridge',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1250,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 80, y: 310, w: 120, h: 40, type: 'normal' },
		{ x: 230, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 370, y: 240, w: 110, h: 40, type: 'normal' },
		{ x: 40, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 190, y: 160, w: 140, h: 40, type: 'normal' },
		{ x: 360, y: 120, w: 120, h: 40, type: 'normal' },
		{ x: 200, y: 80, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 140, y: 270, type: 'ring' },
		{ x: 290, y: 235, type: 'ring' }, { x: 100, y: 160, type: 'ring' },
		{ x: 260, y: 120, type: 'ring' }, { x: 260, y: 40, type: 'ring' }
	],
	obstacles: [
		{ x: 150, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 310, y: 275, type: 'spike', count: 3, direction: 'up' },
		{ x: 120, y: 185, type: 'spike', count: 2, direction: 'up' },
		{ x: 320, y: 185, type: 'rock', w: 36, h: 36, fallDelay: 1800 },
		{ x: 40, y: 280, type: 'rock', w: 36, h: 36, fallDelay: 2200 }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 290, y: 235 }, { x: 260, y: 120 }],
	enemies: [{ x: 250, y: 395, speedX: -45, speedY: 0 }],
	portal: { x: 260, y: 40 }
}, {
	id: 8,
	name: 'Ice Fortress',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1200,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'ice' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 60, y: 310, w: 120, h: 40, type: 'ice' },
		{ x: 210, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 350, y: 240, w: 130, h: 40, type: 'ice' },
		{ x: 100, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 250, y: 160, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 110, w: 100, h: 40, type: 'normal' },
		{ x: 180, y: 70, w: 120, h: 40, type: 'ice' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 120, y: 270, type: 'ring' },
		{ x: 270, y: 235, type: 'ring' }, { x: 415, y: 200, type: 'ring' },
		{ x: 160, y: 160, type: 'ring' }, { x: 240, y: 30, type: 'ring' }
	],
	obstacles: [
		{ x: 150, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 310, y: 275, type: 'spike', count: 3, direction: 'up' },
		{ x: 180, y: 185, type: 'spike', count: 2, direction: 'up' },
		{ x: 100, y: 355, type: 'spike', count: 2, direction: 'up' }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 270, y: 235 }, { x: 240, y: 30 }],
	enemies: [{ x: 260, y: 395, speedX: -40, speedY: 0 }, { x: 300, y: 220, speedX: 30, speedY: 0 }],
	portal: { x: 240, y: 30 }
}, {
	id: 9,
	name: 'Mechanical Maze',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1300,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'normal' },
		{ x: 60, y: 310, w: 120, h: 40, type: 'moving', moveX: 50, moveY: 0, duration: 2000 },
		{ x: 210, y: 275, w: 120, h: 40, type: 'normal' },
		{ x: 350, y: 240, w: 130, h: 40, type: 'normal' },
		{ x: 100, y: 200, w: 120, h: 40, type: 'moving', moveX: 0, moveY: -50, duration: 1800 },
		{ x: 250, y: 160, w: 120, h: 40, type: 'normal' },
		{ x: 380, y: 110, w: 100, h: 40, type: 'normal' },
		{ x: 180, y: 70, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 120, y: 260, type: 'ring' },
		{ x: 270, y: 220, type: 'ring' }, { x: 160, y: 160, type: 'ring' },
		{ x: 310, y: 70, type: 'ring' }, { x: 430, y: 170, type: 'ring' }
	],
	obstacles: [
		{ x: 160, y: 355, type: 'spike', count: 2, direction: 'up' },
		{ x: 320, y: 265, type: 'spike', count: 2, direction: 'up' },
		{ x: 150, y: 165, type: 'spike', count: 3, direction: 'up' },
		{ x: 350, y: 355, type: 'rock', w: 36, h: 36, fallDelay: 2000 },
		{ x: 60, y: 280, type: 'rock', w: 36, h: 36, fallDelay: 2400 }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 270, y: 220 }, { x: 310, y: 110 }],
	enemies: [{ x: 250, y: 395, speedX: -50, speedY: 0 }, { x: 320, y: 210, speedX: 40, speedY: 0 }],
	portal: { x: 310, y: 30 }
}, {
	id: 10,
	name: 'Final Portal',
	width: 480,
	height: 480,
	background: 0xf5b8b8,
	gravity: 1250,
	spawn: { x: 60, y: 400 },
	platforms: [
		{ x: 0, y: 420, w: 140, h: 40, type: 'normal' },
		{ x: 180, y: 385, w: 120, h: 40, type: 'normal' },
		{ x: 330, y: 350, w: 150, h: 40, type: 'ice' },
		{ x: 60, y: 310, w: 120, h: 40, type: 'normal' },
		{ x: 210, y: 275, w: 120, h: 40, type: 'moving', moveX: 50, moveY: 0, duration: 2000 },
		{ x: 350, y: 240, w: 130, h: 40, type: 'normal' },
		{ x: 100, y: 200, w: 120, h: 40, type: 'normal' },
		{ x: 250, y: 160, w: 120, h: 40, type: 'ice' },
		{ x: 380, y: 110, w: 100, h: 40, type: 'normal' },
		{ x: 180, y: 70, w: 120, h: 40, type: 'moving', moveX: 0, moveY: -50, duration: 1800 },
		{ x: 320, y: 60, w: 120, h: 40, type: 'normal' }
	],
	collectibles: [
		{ x: 70, y: 380, type: 'ring' }, { x: 240, y: 345, type: 'ring' },
		{ x: 405, y: 310, type: 'ring' }, { x: 120, y: 270, type: 'ring' },
		{ x: 270, y: 235, type: 'ring' }, { x: 415, y: 200, type: 'ring' },
		{ x: 160, y: 160, type: 'ring' }, { x: 430, y: 110, type: 'ring' },
		{ x: 240, y: 30, type: 'ring' }, { x: 380, y: 20, type: 'ring' }
	],
	obstacles: [
		{ x: 160, y: 355, type: 'spike', count: 3, direction: 'up' },
		{ x: 320, y: 265, type: 'spike', count: 2, direction: 'up' },
		{ x: 180, y: 185, type: 'spike', count: 3, direction: 'up' },
		{ x: 320, y: 355, type: 'rock', w: 36, h: 36, fallDelay: 1800 },
		{ x: 100, y: 280, type: 'rock', w: 36, h: 36, fallDelay: 2400 },
		{ x: 300, y: 185, type: 'rock', w: 36, h: 36, fallDelay: 2000 }
	],
	checkpoints: [{ x: 240, y: 345 }, { x: 270, y: 235 }, { x: 160, y: 140 }],
	enemies: [{ x: 260, y: 395, speedX: -55, speedY: 0 }, { x: 330, y: 220, speedX: 40, speedY: 0 }],
	portal: { x: 380, y: 20 }
}];