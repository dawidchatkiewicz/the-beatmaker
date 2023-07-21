class DrumKit {
	constructor() {
		this.pads = document.querySelectorAll('.pad');
		this.playBtn = document.querySelector('.play');
		this.currentKick = 'sounds/kick-classic.wav';
		this.currentSnare = 'sounds/snare-808.wav';
		this.currentHihat = 'sounds/hihat-808.wav';
		this.currentOpenHihat = 'sounds/openhat-808.wav';
		this.kickAudio = document.querySelector('.kick-sound');
		this.snareAudio = document.querySelector('.snare-sound');
		this.hihatAudio = document.querySelector('.hihat-sound');
		this.openHihatAudio = document.querySelector('.openhh-sound');
		this.index = 0;
		this.bpm = 100;
		this.isPlaying = null;
		this.selects = document.querySelectorAll('select');
		this.muteBtns = document.querySelectorAll('.mute');
		this.tempoSlider = document.querySelector('.tempo-slider');
	}
	activePad() {
		this.classList.toggle('active');
	}
	repeat() {
		let step = this.index % 16;
		const activeBars = document.querySelectorAll(`.b${step}`);
		// Loop over the pads and add animation
		activeBars.forEach(bar => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
			//Check if pads are active
			if (bar.classList.contains('active')) {
				// Check each sound
				if (bar.classList.contains('kick-pad')) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				}
				if (bar.classList.contains('snare-pad')) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				}
				if (bar.classList.contains('hihat-pad')) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				}
				if (bar.classList.contains('openhh-pad')) {
					this.openHihatAudio.currentTime = 0;
					this.openHihatAudio.play();
				}
			}
		});
		this.index++;
	}
	start() {
		const interval = (30 / this.bpm) * 1000;
		//Check if playing
		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			//Clear interval
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
	}
	updateBtn() {
		if (!this.isPlaying) {
			this.playBtn.innerText = 'STOP';
			this.playBtn.classList.add('active');
		} else {
			this.playBtn.innerText = 'PLAY';
			this.playBtn.classList.remove('active');
		}
	}
	changeSound(e) {
		const selectionName = e.target.name;
		const selectionValue = e.target.value;
		switch (selectionName) {
			case 'kick-select':
				this.kickAudio.src = selectionValue;
				break;
			case 'snare-select':
				this.snareAudio.src = selectionValue;
				break;
			case 'hihat-select':
				this.hihatAudio.src = selectionValue;
				break;
			case 'openhh-select':
				this.openHihatAudio.src = selectionValue;
				break;
		}
	}
	mute(e) {
		const muteIndex = e.target.getAttribute('data-track');
		e.target.classList.toggle('active');
		if (e.target.classList.contains('active')) {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 0;
					break;
				case '1':
					this.snareAudio.volume = 0;
					break;
				case '2':
					this.hihatAudio.volume = 0;
					break;
				case '3':
					this.openHihatAudio.volume = 0;
					break;
			}
		} else {
			switch (muteIndex) {
				case '0':
					this.kickAudio.volume = 1;
					break;
				case '1':
					this.snareAudio.volume = 1;
					break;
				case '2':
					this.hihatAudio.volume = 1;
					break;
				case '3':
					this.openHihatAudio.volume = 1;
					break;
			}
		}
	}
	changeTempo(e) {
		const tempoText = document.querySelector('.tempo-nr');
		this.bpm = e.target.value;
		tempoText.innerText = this.bpm;
	}
	updateTempo(e) {
		this.bpm = e.target.value;
		clearInterval(this.isPlaying);
		this.isPlaying = null;
		const playBtn = document.querySelector('.play');
		if (playBtn.classList.contains('active')) {
			this.start();
		}
	}
}

const drumKit = new DrumKit();

//Event listeners

drumKit.pads.forEach(pad => {
	pad.addEventListener('click', drumKit.activePad);
	pad.addEventListener('animationend', function () {
		this.style.animation = '';
	});
});

drumKit.playBtn.addEventListener('click', () => {
	drumKit.updateBtn();
	drumKit.start();
});

drumKit.selects.forEach(select => {
	select.addEventListener('change', function (e) {
		drumKit.changeSound(e);
	});
});
drumKit.muteBtns.forEach(btn => {
	btn.addEventListener('click', function (e) {
		drumKit.mute(e);
	});
});
drumKit.tempoSlider.addEventListener('input', function (e) {
	drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function (e) {
	drumKit.updateTempo(e);
});
