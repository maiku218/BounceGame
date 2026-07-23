class SaveSystem extends Phaser.Events.EventEmitter {
	constructor() {
		super();
		this.user = null;
		this.saveKey = 'bounce_adventure_save';
		this.userKey = 'bounce_adventure_user';
		this.settingsKey = 'bounce_adventure_settings';
		this.data = this.getDefaultData();
		this.settings = this.getDefaultSettings();
		this.load();
	}

	getDefaultData() {
		return {
			unlockedLevels: 1,
			completedLevels: {},
			totalRings: 0,
			totalStars: 0,
			upgrades: [],
			lives: CONFIG.PLAYER.MAX_LIVES,
			highScores: {},
			playTime: 0
		};
	}

	getDefaultSettings() {
		return {
			musicVolume: 0.5,
			sfxVolume: 0.8,
			graphicsQuality: 'high',
			showTutorials: true,
			touchLayout: 'default'
		};
	}

	setUser(user) {
		this.user = user;
		this.saveKey = `bounce_adventure_save_${user.email}`;
		this.userKey = `bounce_adventure_user_${user.email}`;
		this.load();
	}

	load() {
		try {
			const saved = localStorage.getItem(this.saveKey);
			if (saved) {
				this.data = { ...this.getDefaultData(), ...JSON.parse(saved) };
			}
			const settings = localStorage.getItem(this.settingsKey);
			if (settings) {
				this.settings = { ...this.getDefaultSettings(), ...JSON.parse(settings) };
			}
		} catch (e) {
			console.warn('SaveSystem: Could not load save data', e);
		}
	}

	save() {
		try {
			localStorage.setItem(this.saveKey, JSON.stringify(this.data));
			localStorage.setItem(this.settingsKey, JSON.stringify(this.settings));
			if (this.user) {
				localStorage.setItem(this.userKey, JSON.stringify(this.user));
			}
			this.emit('saved');
		} catch (e) {
			console.warn('SaveSystem: Could not save data', e);
		}
	}

	getUser() {
		const user = sessionStorage.getItem(this.userKey);
		return user ? JSON.parse(user) : null;
	}

	completeLevel(levelId, rings, time) {
		const prevScore = this.data.highScores[levelId] || { rings: 0, time: Infinity };
		const isNewRecord = rings > prevScore.rings ||
			(rings === prevScore.rings && time < prevScore.time);

		this.data.completedLevels[levelId] = true;
		this.data.highScores[levelId] = { rings, time, isNewRecord };

		if (rings > prevScore.rings) {
			this.data.totalRings += (rings - prevScore.rings);
		}

		if (levelId >= this.data.unlockedLevels && levelId < CONFIG.LEVELS.TOTAL) {
			this.data.unlockedLevels = levelId + 1;
		}

		this.data.totalStars = Object.keys(this.data.completedLevels).length;
		this.save();
		this.emit('levelCompleted', { levelId, rings, time, isNewRecord });
		return { isNewRecord, rings: this.data.totalRings };
	}

	unlockNextLevel(currentLevel) {
		if (currentLevel >= this.data.unlockedLevels && currentLevel < CONFIG.LEVELS.TOTAL) {
			this.data.unlockedLevels = currentLevel + 1;
			this.save();
		}
	}

	resetProgress() {
		this.data = this.getDefaultData();
		this.save();
		this.emit('progressReset');
	}

	setSetting(key, value) {
		this.settings[key] = value;
		this.save();
	}

	getSetting(key) {
		return this.settings[key];
	}

	addUpgrade(upgradeId) {
		if (!this.data.upgrades.includes(upgradeId)) {
			this.data.upgrades.push(upgradeId);
			this.save();
			this.emit('upgradePurchased', upgradeId);
		}
	}

	hasUpgrade(upgradeId) {
		return this.data.upgrades.includes(upgradeId);
	}

	resetLives() {
		this.data.lives = CONFIG.PLAYER.MAX_LIVES;
		this.save();
	}

	loseLife() {
		this.data.lives--;
		this.save();
		return this.data.lives > 0;
	}

	exportData() {
		return JSON.stringify({
			data: this.data,
			settings: this.settings,
			user: this.user
		});
	}

	importData(jsonString) {
		try {
			const imported = JSON.parse(jsonString);
			if (imported.data) this.data = { ...this.getDefaultData(), ...imported.data };
			if (imported.settings) this.settings = { ...this.getDefaultSettings(), ...imported.settings };
			this.save();
			this.emit('dataImported');
			return true;
		} catch (e) {
			return false;
		}
	}
}