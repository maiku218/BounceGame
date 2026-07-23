class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene' });
	}

	create() {
		this.audio = new AudioManager(this);
		this.save = new SaveSystem();
		this.inputKey = this.input.keyboard.addKeys({
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
			up: Phaser.Input.Keyboard.KeyCodes.UP,
			space: Phaser.Input.Keyboard.KeyCodes.SPACE,
			w: Phaser.Input.Keyboard.KeyCodes.W,
			a: Phaser.Input.Keyboard.KeyCodes.A,
			s: Phaser.Input.Keyboard.KeyCodes.S,
			d: Phaser.Input.Keyboard.KeyCodes.D
		});

		this.physics.world.setBounds(0, 0, CONFIG.WINDOW_WIDTH, CONFIG.WINDOW_HEIGHT);

		this.checkGoogleAuth();
	}

	checkGoogleAuth() {
		const user = this.save.getUser();
		if (user) {
			this.user = user;
			this.onAuthSuccess(user);
		} else {
			this.showLoginScreen();
		}
	}

	showLoginScreen() {
		const overlay = document.getElementById('login-overlay');
		overlay.classList.remove('hidden');

		window.handleGoogleSignIn = (response) => {
			const credential = response.credential;
			const payload = JSON.parse(atob(credential.split('.')[1]));
			const user = {
				id: payload.sub,
				name: payload.name,
				email: payload.email,
				picture: payload.picture,
				givenName: payload.given_name,
				familyName: payload.family_name
			};
			window.currentUser = user;
			sessionStorage.setItem('bounce_adventure_user', JSON.stringify(user));
			this.onAuthSuccess(user);
		};

		document.getElementById('logout-btn').addEventListener('click', () => {
			this.logout();
		});

		document.getElementById('guest-btn').addEventListener('click', () => {
			const guestUser = { id: 'guest', name: 'Guest', email: 'guest' };
			this.onAuthSuccess(guestUser);
		});

		document.getElementById('enter-btn').addEventListener('click', () => {
			const overlay = document.getElementById('login-overlay');
			overlay.classList.add('hidden');
			this.scene.start('MenuScene', { user: this.user, save: this.save, audio: this.audio });
		});
	}

	onAuthSuccess(user) {
		this.user = user;
		this.save.setUser(user);

		const overlay = document.getElementById('login-overlay');
		const userInfo = document.getElementById('user-info');
		const signinDiv = document.querySelector('.g_id_signin');

		if (signinDiv) signinDiv.style.display = 'none';
		userInfo.style.display = 'block';

		document.getElementById('user-pic').src = user.picture;
		document.getElementById('user-display-name').textContent = user.name;
		document.getElementById('user-email').textContent = user.email;

		const enterBtn = document.getElementById('enter-btn');
		if (enterBtn) {
			enterBtn.addEventListener('click', () => {
				overlay.classList.add('hidden');
				this.scene.start('MenuScene', {
					user: user,
					save: this.save,
					audio: this.audio
				});
			});
		}
	}

	logout() {
		this.user = null;
		this.save.setUser({ email: 'guest', name: 'Guest' });
		sessionStorage.removeItem('bounce_adventure_user');

		const overlay = document.getElementById('login-overlay');
		const userInfo = document.getElementById('user-info');
		const signinDiv = document.querySelector('.g_id_signin');

		if (signinDiv) signinDiv.style.display = 'block';
		userInfo.style.display = 'none';
		overlay.classList.remove('hidden');
	}
}