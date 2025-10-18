// ---------------- Digital Clock ---------------- //
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;

  document.getElementById("clock").textContent = `${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`;
  document.getElementById("date").textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

setInterval(updateClock, 1000);
updateClock();

// ---------------- Countdown Timer ---------------- //
let countdownInterval = null;
let targetTime = null;
let paused = false;
let remainingTime = 0;

const countdownDisplay = document.getElementById("countdown");
const statusText = document.getElementById("status");

document.getElementById("startBtn").addEventListener("click", () => {
  const input = document.getElementById("targetTime").value;
  if (!input) {
    alert("Please select a target time!");
    return;
  }

  targetTime = new Date(input).getTime();
  if (targetTime <= Date.now()) {
    alert("Please select a future time!");
    return;
  }

  paused = false;
  startCountdown();
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  if (!countdownInterval) return;
  if (!paused) {
    paused = true;
    clearInterval(countdownInterval);
    remainingTime = targetTime - Date.now();
    statusText.textContent = "Paused";
    document.getElementById("pauseBtn").textContent = "Resume";
  } else {
    paused = false;
    targetTime = Date.now() + remainingTime;
    startCountdown();
    document.getElementById("pauseBtn").textContent = "Pause";
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  countdownDisplay.textContent = "00 : 00 : 00 : 00";
  statusText.textContent = "Not Running";
  document.getElementById("pauseBtn").textContent = "Pause";
});

function startCountdown() {
  clearInterval(countdownInterval);
  statusText.textContent = "Running";

  countdownInterval = setInterval(() => {
    const now = Date.now();
    const distance = targetTime - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent = "00 : 00 : 00 : 00";
      statusText.textContent = "🎉 Time's Up!";
      alert("Countdown Finished!");
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `${pad(d)} : ${pad(h)} : ${pad(m)} : ${pad(s)}`;
  }, 1000);
}
