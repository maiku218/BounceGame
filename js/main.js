let game = null;

window.addEventListener('load', () => {
	const config = {
		type: Phaser.AUTO,
		width: CONFIG.WINDOW_WIDTH,
		height: CONFIG.WINDOW_HEIGHT,
		parent: 'game-container',
		backgroundColor: '#f5b8b8',
		scale: {
			mode: CONFIG.SCALE_MODE,
			autoCenter: CONFIG.AUTO_CENTER,
			min: {
				width: CONFIG.WINDOW_WIDTH,
				height: CONFIG.WINDOW_HEIGHT
			},
			max: {
				width: CONFIG.WINDOW_WIDTH * 2,
				height: CONFIG.WINDOW_HEIGHT * 2
			}
		},
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y: CONFIG.PHYSICS.GRAVITY },
				debug: false,
				timeScale: 1
			}
		},
		render: {
			pixelArt: false,
			antialias: true,
			roundPixels: false
		},
		input: {
			activePointers: 3,
			touch: {
				capture: true
			}
		},
		scene: [BootScene, MenuScene, LevelSelectScene, GameScene, VictoryScene, GameOverScene, ShopScene],
		callbacks: {
			postBoot: (game) => {
				const container = document.getElementById('game-container');
				if (container) {
					container.appendChild(game.canvas);
				}
			}
		}
	};

	game = new Phaser.Game(config);
});

window.addEventListener('resize', () => {
	if (game) {
		game.scale.refresh();
	}
});

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('sw.js').catch(() => {});
	});
}