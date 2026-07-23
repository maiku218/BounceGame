const CACHE_NAME = 'bounce-adventure-v1';

const ASSETS_TO_CACHE = [
	'/',
	'/index.html',
	'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js',
	'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
	'https://accounts.google.com/gsi/client',
	'/style.css',
	'/js/constants.js',
	'/js/systems/SaveSystem.js',
	'/js/systems/AudioManager.js',
	'/js/objects/Player.js',
	'/js/objects/Platform.js',
	'/js/objects/Collectible.js',
	'/js/objects/Portal.js',
	'/js/objects/Checkpoint.js',
	'/js/objects/Obstacles.js',
	'/js/scenes/BootScene.js',
	'/js/scenes/MenuScene.js',
	'/js/scenes/LevelSelectScene.js',
	'/js/scenes/GameScene.js',
	'/js/scenes/VictoryScene.js',
	'/js/scenes/GameOverScene.js',
	'/js/levels.js',
	'/js/main.js',
	'/manifest.json'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(ASSETS_TO_CACHE);
		})
	);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) => {
			return Promise.all(
				keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
			);
		})
	);
	self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	if (event.request.method === 'GET') {
		event.respondWith(
			caches.match(event.request).then((cached) => {
				const fetchPromise = fetch(event.request).then((networkResponse) => {
					if (networkResponse && networkResponse.status === 200) {
						const clone = networkResponse.clone();
						caches.open(CACHE_NAME).then((cache) => {
							cache.put(event.request, clone);
						});
					}
					return networkResponse;
				}).catch(() => cached);

				return cached || fetchPromise;
			})
		);
	}
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.action === 'clearCache') {
		caches.delete(CACHE_NAME).then(() => {
			self.clients.matchAll().then((clients) => {
				clients.forEach((client) => client.postMessage({ status: 'cacheCleared' }));
			});
		});
	}
});