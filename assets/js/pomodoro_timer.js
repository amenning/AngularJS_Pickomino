function doFirst() {
  var startstopClock = document.getElementById("clockBox");
  BreakLengthDisplay = document.getElementById("breakLengthReadout");
  var decreaseBreakTime = document.getElementById("decreaseBreakBtn");
  var increaseBreakTime = document.getElementById("increaseBreakBtn");
  sessionLengthDisplay = document.getElementById("sessionLengthReadout");
  var decreaseSessionTime = document.getElementById("decreaseSessionBtn");
  var increaseSessionTime = document.getElementById("increaseSessionBtn");
  var reset = document.getElementById("resetBtn");

  sessionRingColor = "#0066FF";
  sessionFillColor = "#4D94FF";
  breakRingColor = "#FFB514";
  breakFillColor = "#FFDE96";

  timestep = 0;
  startClock = false;
  pause = false;
  pauseTime = new Date().getTime();
  pauseOffset = 0;
  breakLengthMin = 5;
  breakLengthSec = 0;
  sessionLengthMin = 25;
  sessionLengthSec = 0;
  timerTitle = "Session";
  timerTitleHeight = 120;
  timerTitleLeftPad = 218;
  timerLength = sessionLengthMin * 60;
  timerMin = sessionLengthMin;
  timerSec = sessionLengthSec;
  ringColor = sessionRingColor;
  fillColor = sessionFillColor;

  clockRadius = 123;

  var x = document.getElementById("clockCanvas");
  canvas = x.getContext('2d');
  canvasHeight = 300;
  canvasWidth = 300;

  refreshClock();

  startstopClock.addEventListener("click", checkClock, false);
  decreaseBreakTime.addEventListener("click", decreaseBreak, false);
  increaseBreakTime.addEventListener("click", increaseBreak, false);
  decreaseSessionTime.addEventListener("click", decreaseSession, false);
  increaseSessionTime.addEventListener("click", increaseSession, false);
  reset.addEventListener("click", resetClock, false);

}

function checkClock() {
  if (startClock === true) {
    startClock = false;
    pause = true;
    pauseTime = new Date().getTime();
  } else if (startClock === false && pause === false) {
    startClock = true;
    startTime = new Date().getTime();
    fillClock();
  } else if (startClock === false && pause === true) {
    startClock = true;
    pause = false;
    pauseOffset += new Date().getTime() - pauseTime;
    fillClock();
  }
}

function fillClock() {
  if (startClock === true && timestep < 100) {
    timerMin = (timerLength / 60) - 1 - Math.floor((new Date().getTime() - startTime - pauseOffset) / (1000 * 60));
    timerSec = 59 - Math.floor(((new Date().getTime() - startTime - pauseOffset) % (1000 * 60)) / 1000);
    timestep = 100 * (new Date().getTime() + 1000 - startTime - pauseOffset) / (timerLength * 1000);
    refreshClock();
    setTimeout(fillClock, 100);
  } else if (timestep >= 100) {
    switch (timerTitle) {
      case "Session":
        timerTitle = "Break!";
        timerTitleLeftPad = 208;
        timerLength = breakLengthMin * 60;
        timerMin = breakLengthMin;
        ringColor = breakRingColor;
        fillColor = breakFillColor;
        break;
      case "Break!":
        timerTitle = "Session";
        timerTitleLeftPad = 218;
        timerLength = sessionLengthMin * 60;
        timerMin = sessionLengthMin;
        ringColor = sessionRingColor;
        fillColor = sessionFillColor;
        break;
    }
    timestep = 0;
    timerSec = 0;
    startTime = new Date().getTime();
    refreshClock();
    setTimeout(fillClock, 1000);
  }
}

function decreaseBreak() {
  if (breakLengthMin > 1) {
    breakLengthReadout.innerHTML = --breakLengthMin + " min";
    if (timerTitle === "Break!") {
      timerLength = breakLengthMin * 60;
      timerMin = breakLengthMin;
      refreshClock();
    }
  }
}

function increaseBreak() {
  breakLengthReadout.innerHTML = ++breakLengthMin + " min";
  if (timerTitle === "Break!") {
    timerLength = breakLengthMin * 60;
    timerMin = breakLengthMin;
    refreshClock();
  }
}

function decreaseSession() {
  if (sessionLengthMin > 1) {
    sessionLengthReadout.innerHTML = --sessionLengthMin + " min";
    if (timerTitle === "Session") {
      timerLength = sessionLengthMin * 60;
      timerMin = sessionLengthMin;
      refreshClock();
    }
  }
}

function increaseSession() {
  sessionLengthReadout.innerHTML = ++sessionLengthMin + " min";
  if (timerTitle === "Session") {
    timerLength = sessionLengthMin * 60;
    timerMin = sessionLengthMin;
    refreshClock();
  }
}

function resetClock() {
  timestep = 0;
  startClock = false;
  pause = false;
  pauseTime = new Date().getTime();
  pauseOffset = 0;
  breakLengthMin = 5;
  breakLengthSec = 0;
  sessionLengthMin = 25;
  sessionLengthSec = 0;
  timerTitle = "Session";
  timerTitleHeight = 120;
  timerTitleLeftPad = 218;
  timerLength = sessionLengthMin * 60;
  timerMin = sessionLengthMin;
  timerSec = sessionLengthSec;
  ringColor = sessionRingColor;
  fillColor = sessionFillColor;
  sessionLengthReadout.innerHTML = sessionLengthMin + " min";
  breakLengthReadout.innerHTML = breakLengthMin + " min";
  refreshClock();
}

function refreshClock() {
  canvas.clearRect(0, 0, canvasWidth, canvasHeight);

  canvas.strokeStyle = ringColor;
  canvas.beginPath();
  canvas.arc(150, 150, clockRadius + 2, 0, 2 * Math.PI);
  canvas.stroke();

  canvas.fillStyle = fillColor;
  canvas.beginPath();
  canvas.arc(150, 150, clockRadius, 0.5 * Math.PI - timestep * Math.PI / 100, 0.5 * Math.PI + timestep * Math.PI / 100);
  canvas.fill();

  canvas.font = "bold 36px Tahoma";
  canvas.textAlign = "end";
  canvas.fillStyle = "#C2B8B0";
  canvas.fillText(timerTitle, timerTitleLeftPad, timerTitleHeight);
  if (timerMin < 10) {
    canvas.fillText("0" + timerMin + ":" + ("0" + timerSec).slice(-2), 203, 220);
  } else {
    canvas.fillText(timerMin + ":" + ("0" + timerSec).slice(-2), 203, 220);
  }
}

window.addEventListener('load', doFirst, false);