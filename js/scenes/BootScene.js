class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene' });
	}

	create() {
		this.audio = new AudioManager(this);
		this.save = new SaveSystem();

		this.physics.world.setBounds(0, 0, CONFIG.WINDOW_WIDTH, CONFIG.WINDOW_HEIGHT);

		this.setupFirebaseAuth();
	}

	setupFirebaseAuth() {
		const storedUser = this.save.getUser();
		if (storedUser && storedUser.id !== 'guest') {
			this.user = storedUser;
			this.save.setUser(storedUser);
			this.onAuthSuccess(storedUser);
			return;
		}

		this.showLoginScreen();
	}

	showLoginScreen() {
		const overlay = document.getElementById('login-overlay');
		overlay.classList.remove('hidden');

		document.getElementById('firebase-login').addEventListener('click', () => {
			const email = document.getElementById('firebase-email').value.trim();
			const password = document.getElementById('firebase-password').value.trim();
			const errorEl = document.getElementById('firebase-error');

			if (!email || !password) {
				errorEl.textContent = 'Please enter both email and password.';
				errorEl.style.display = 'block';
				return;
			}

			errorEl.style.display = 'none';
			firebaseAuth.signInWithEmailAndPassword(email, password)
				.then((cred) => {
					const user = {
						id: cred.user.uid,
						name: cred.user.displayName || email,
						email: email,
						picture: '',
						givenName: '',
						familyName: ''
					};
					window.currentUser = user;
					this.onAuthSuccess(user);
				})
				.catch((err) => {
					errorEl.textContent = err.message || 'Login failed.';
					errorEl.style.display = 'block';
				});
		});

		document.getElementById('firebase-register').addEventListener('click', () => {
			const email = document.getElementById('firebase-email').value.trim();
			const password = document.getElementById('firebase-password').value.trim();
			const errorEl = document.getElementById('firebase-error');

			if (!email || !password) {
				errorEl.textContent = 'Please enter both email and password.';
				errorEl.style.display = 'block';
				return;
			}

			if (password.length < 6) {
				errorEl.textContent = 'Password must be at least 6 characters.';
				errorEl.style.display = 'block';
				return;
			}

			errorEl.style.display = 'none';
			firebaseAuth.createUserWithEmailAndPassword(email, password)
				.then((cred) => {
					const user = {
						id: cred.user.uid,
						name: email,
						email: email,
						picture: '',
						givenName: '',
						familyName: ''
					};
					window.currentUser = user;
					this.onAuthSuccess(user);
				})
				.catch((err) => {
					errorEl.textContent = err.message || 'Registration failed.';
					errorEl.style.display = 'block';
				});
		});

		document.getElementById('firebase-guest').addEventListener('click', () => {
			const guestUser = { id: 'guest', name: 'Guest', email: 'guest' };
			this.onAuthSuccess(guestUser);
		});
	}

	onAuthSuccess(user) {
		this.user = user;
		this.save.setUser(user);

		const overlay = document.getElementById('login-overlay');
		overlay.classList.add('hidden');

		this.scene.start('MenuScene', {
			user: user,
			save: this.save,
			audio: this.audio
		});
	}

	logout() {
		firebaseAuth.signOut().catch(() => {});
		this.user = null;
		const overlay = document.getElementById('login-overlay');
		overlay.classList.remove('hidden');
		document.getElementById('firebase-email').value = '';
		document.getElementById('firebase-password').value = '';
		document.getElementById('firebase-error').style.display = 'none';
	}
}