class AudioManager extends Phaser.Events.EventEmitter {
	constructor(scene) {
		super();
		this.scene = scene;
		this.audioContext = null;
		this.musicGain = null;
		this.sfxGain = null;
		this.currentMusic = null;
		this.masterVolume = 0.7;
		this.sfxVolume = 0.8;
		this.musicVolume = 0.5;
		this.initialized = false;
		this.soundCache = {};
	}

	init() {
		if (this.initialized) return;
		try {
			this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			this.musicGain = this.audioContext.createGain();
			this.musicGain.gain.value = this.musicVolume * this.masterVolume;
			this.sfxGain = this.audioContext.createGain();
			this.sfxGain.gain.value = this.sfxVolume * this.masterVolume;
			this.musicGain.connect(this.audioContext.destination);
			this.sfxGain.connect(this.audioContext.destination);
			this.initialized = true;
		} catch (e) {
			console.warn('Web Audio API not supported');
		}
	}

	resumeContext() {
		if (this.audioContext && this.audioContext.state === 'suspended') {
			this.audioContext.resume();
		}
	}

	playTone(frequency, duration, type = 'sine', volume = 0.3) {
		if (!this.initialized) return;
		this.resumeContext();

		const oscillator = this.audioContext.createOscillator();
		const gainNode = this.audioContext.createGain();

		oscillator.type = type;
		oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

		gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
		gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

		oscillator.connect(gainNode);
		gainNode.connect(this.sfxGain);

		oscillator.start(this.audioContext.currentTime);
		oscillator.stop(this.audioContext.currentTime + duration);
	}

	playJump() {
		this.playTone(300, 0.1, 'triangle', 0.15);
		setTimeout(() => this.playTone(500, 0.08, 'triangle', 0.12), 50);
	}

	playBounce() {
		this.playTone(200, 0.05, 'square', 0.08);
		setTimeout(() => this.playTone(250, 0.04, 'square', 0.06), 30);
	}

	playCollect() {
		this.playTone(600, 0.05, 'sine', 0.15);
		setTimeout(() => this.playTone(800, 0.05, 'sine', 0.12), 40);
		setTimeout(() => this.playTone(1000, 0.08, 'sine', 0.1), 80);
	}

	playCheckpoint() {
		this.playTone(400, 0.1, 'triangle', 0.15);
		setTimeout(() => this.playTone(600, 0.1, 'triangle', 0.15), 100);
		setTimeout(() => this.playTone(800, 0.15, 'triangle', 0.15), 200);
	}

	playDeath() {
		this.playTone(400, 0.1, 'sawtooth', 0.2);
		setTimeout(() => this.playTone(300, 0.15, 'sawtooth', 0.15), 100);
		setTimeout(() => this.playTone(200, 0.3, 'sawtooth', 0.1), 250);
	}

	playPortal() {
		const freqs = [400, 500, 600, 800];
		freqs.forEach((f, i) => {
			setTimeout(() => this.playTone(f, 0.15, 'sine', 0.12), i * 100);
		});
	}

	playHurt() {
		this.playTone(150, 0.2, 'sawtooth', 0.2);
	}

	playClick() {
		this.playTone(800, 0.03, 'square', 0.1);
	}

	playVictory() {
		const melody = [523, 587, 659, 698, 784, 880, 988, 1047];
		melody.forEach((f, i) => {
			setTimeout(() => this.playTone(f, 0.2, 'sine', 0.15), i * 150);
		});
	}

	playMusic() {
		if (!this.initialized) return;
		this.resumeContext();
		this.stopMusic();

		const notes = [
			{ f: 262, d: 0.3 }, { f: 294, d: 0.3 }, { f: 330, d: 0.3 }, { f: 262, d: 0.3 },
			{ f: 330, d: 0.3 }, { f: 349, d: 0.3 }, { f: 392, d: 0.6 }, { f: 0, d: 0.1 },
			{ f: 392, d: 0.3 }, { f: 440, d: 0.3 }, { f: 494, d: 0.3 }, { f: 440, d: 0.3 },
			{ f: 494, d: 0.3 }, { f: 523, d: 0.3 }, { f: 587, d: 0.6 }, { f: 0, d: 0.1 }
		];

		let time = this.audioContext.currentTime;
		const loopDuration = notes.reduce((acc, n) => acc + n.d, 0);

		const playLoop = () => {
			if (!this.currentMusic) return;
			let t = this.audioContext.currentTime;
			notes.forEach(note => {
				if (note.f > 0) {
					const osc = this.audioContext.createOscillator();
					const gain = this.audioContext.createGain();
					osc.type = 'triangle';
					osc.frequency.value = note.f;
					gain.gain.setValueAtTime(0.04, t);
					gain.gain.linearRampToValueAtTime(0, t + note.d - 0.05);
					osc.connect(gain);
					gain.connect(this.musicGain);
					osc.start(t);
					osc.stop(t + note.d);
				}
				t += note.d;
			});
			this.currentMusicTimer = setTimeout(playLoop, loopDuration * 1000);
		};

		playLoop();
	}

	stopMusic() {
		if (this.currentMusicTimer) {
			clearTimeout(this.currentMusicTimer);
			this.currentMusicTimer = null;
		}
		this.currentMusic = false;
	}

	setMusicVolume(value) {
		this.musicVolume = Math.max(0, Math.min(1, value));
		if (this.musicGain) {
			this.musicGain.gain.value = this.musicVolume * this.masterVolume;
		}
	}

	setSfxVolume(value) {
		this.sfxVolume = Math.max(0, Math.min(1, value));
		if (this.sfxGain) {
			this.sfxGain.gain.value = this.sfxVolume * this.masterVolume;
		}
	}

	setMasterVolume(value) {
		this.masterVolume = Math.max(0, Math.min(1, value));
		if (this.musicGain) this.musicGain.gain.value = this.musicVolume * this.masterVolume;
		if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume * this.masterVolume;
	}

	destroy() {
		this.stopMusic();
		if (this.audioContext) {
			this.audioContext.close();
		}
	}
}