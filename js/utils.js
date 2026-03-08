export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadData(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

export function removeData(key) {
  localStorage.removeItem(key);
}

export function clearAllData() {
  localStorage.clear();
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function createTimer(seconds = 1800) {
  return {
    seconds: seconds,
    elapsed: 0,
    running: false,
    intervalId: null,
    onEnd: null,
  };
}

export function startTimer(timer) {
  if (timer.running) return;
  timer.running = true;

  timer.intervalId = setInterval(() => {
    timer.elapsed += 1;
    timer.seconds -= 1;
    if (timer.seconds <= 0) {
      stopTimer(timer);
      timer.seconds = 0;
      if (timer.onEnd) timer.onEnd();
    }
  }, 1000);
}

export function stopTimer(timer) {
  timer.running = false;
  if (timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
}

export function getTimeLeft(timer) {
  return timer.seconds;
}

export function getFormattedTime(timer) {
  return formatTime(timer.seconds);
}

export function isTimerDanger(timer) {
  return timer.seconds < 300;
}
