function Timer(type, time, container, onComplete) {

	// inner timer (interval action clock)
	var timer;
	var startTime;
	var seconds = time;
	var milliSeconds = seconds * 1000;
	var display = null;
	var now = -1;

	if (container != undefined) {
		display = $(container);
	}

	this.resume = function() {
		startTime = new Date().getTime();
		if (now != 0) {
			timer = setInterval(this.step, 250); // adjust this number to
			// affect granularity
			// lower numbers are more accurate, but more CPU-expensive
		}
	}

	this.pause = function() {
		milliSeconds = this.step();
		clearInterval(timer);
	}

	this.reset = function() {
		milliSeconds = seconds * 1000;
	}

	this.hasEnded = function() {
		return (now == 0);
	}

	this.step = function() {
		var s, m;
		if (type === "increment") {
			now = Math
					.max(0, milliSeconds + (new Date().getTime() - startTime));
			m = Math.floor(now / 60000);
			s = Math.floor(now / 1000) % 60;
		} else if (type === "decrement") {
			now = Math
					.max(0, milliSeconds - (new Date().getTime() - startTime));
			m = Math.floor(now / 60000);
			s = (Math.floor(now / 1000) % 60);
			// rounding at superior second if needed
			if ((now > 1000 && parseInt(now.toString().substr(
					now.toString().length - 3)) != 0)
					|| now != 0) {
				s++;
			}
		}
		if(s >= 60) {
			m++;
			s = s-60;
		}
		s = (s < 10 ? "0" : "") + s;
		if (display != null) {
			display.text(m + ":" + s);
		}
		if (now == 0) {
			clearInterval(timer);
			if (onComplete !== undefined) {
				onComplete();
			}
		}
		return now;
	}

	this.getCurrentTime = function() {
		if (type === "decrement") {
			if (now === 0) {
				return initTime;
			} else {
				return ((initTime - now) / 1000);
			}
		} else if (type === "increment") {
			return (now / 1000);
		}
	}
}