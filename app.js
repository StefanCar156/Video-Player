const video = document.querySelector("#video");
const range = document.querySelector("#range");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const stopBtn = document.querySelector("#stop");
const videoContainer = document.querySelector(".video-container");
const duration = document.querySelector("#duration");
const volumeBtn = document.querySelector("#volume-btn");
const volumeRange = document.querySelector(".volume-range");
const arrows = document.querySelectorAll(".arrows");
const arrowRight = document.querySelector("#arrow-right");
const arrowLeft = document.querySelector("#arrow-left");
const fillProgress = document.querySelector("#fill-progress");

video.onloadedmetadata = function () {
  const videoDuration = Math.round(video.duration);
  return videoDuration;
};

// Controlling Play, Pause and Stop changes

play.addEventListener("click", () => {
  video.play();
  pause.style.display = "inline";
  play.style.display = "none";
});

pause.addEventListener("click", () => {
  video.pause();
  play.style.display = "inline";
  pause.style.display = "none";
});

stopBtn.addEventListener("click", () => {
  video.currentTime = 0;
  video.pause();
  play.style.display = "inline";
  pause.style.display = "none";
});

// Showing Current Time and Video Duration

video.onloadedmetadata = function () {
  let durationValue = Math.round(video.duration);
};

window.setInterval(showCurrentTime, 1000);

function showCurrentTime() {
  let timeCurrent = Math.round(video.currentTime);
  let finalCurrent = "";
  let durationValue = Math.round(video.duration);
  const durationMin = Math.floor(durationValue / 60);
  const durationSec = durationValue % 60;
  const currentMin = Math.floor(timeCurrent / 60);
  const currentSec = timeCurrent % 60;
  let finalDuration = "";

  if (timeCurrent >= 60 && currentSec < 10) {
    finalCurrent = currentMin + ":0" + currentSec;
  } else if (timeCurrent >= 60 && currentSec >= 10) {
    finalCurrent = currentMin + ":" + currentSec;
  } else if (timeCurrent < 60 && currentSec < 10) {
    finalCurrent = "0:" + "0" + currentSec;
  } else {
    finalCurrent = "0:" + currentSec;
  }

  durationValue >= 60
    ? (finalDuration = durationMin + ":" + durationSec)
    : (finalDuration = "0:" + durationSec);

  if (Math.round(timeCurrent) < 10) {
    duration.innerText = finalCurrent + " " + "/ " + finalDuration;
  } else {
    duration.innerText = finalCurrent + " " + " / " + finalDuration;
  }
}

//

function changeValue() {
  const videoDuration = Math.round(video.duration);
  const currentTime = Math.round(video.currentTime);
  range.max = videoDuration;
  range.value = currentTime;
  fillProgress.style.width = (range.value * 100) / range.max + "%";
}

setInterval(changeValue, 1000);

// When video ends, go back to 0 seconds

video.addEventListener(
  "ended",
  () => {
    play.style.display = "inline";
    pause.style.display = "none";
    video.currentTime = 0;
    range.style.animation = "none";
  },
  500
);

// Setting Volume

volumeBtn.addEventListener("click", () => {
  volumeRange.classList.toggle("volume-range-active");
});

video.volume = volumeRange.value / 100;

document.addEventListener("load", volumeSlider(50));

function volumeSlider(value) {
  video.volume = value / 100;
  muted();
}

volumeSlider();

// Change volume icon when muted

function muted() {
  if (video.volume == 0) {
    volumeBtn.src = "./img/mute.png";
  } else {
    volumeBtn.src = "./img/sound.png";
  }
}

// Arrow Events
function arrowLeftFun() {
  video.currentTime = Math.floor(video.currentTime) - 5;
}

function arrowRightFun() {
  video.currentTime = Math.floor(video.currentTime) + 5;
}

// Show Arrows on Video

function showArrows() {
  arrowRight.style.opacity = "0.7";
  arrowLeft.style.opacity = "0.7";
  arrowRight.style.transition = "opacity 0.3s ease-in";
  arrowLeft.style.transition = "opacity 0.3s ease-in";
}

function hideArrows() {
  arrowRight.style.opacity = "0";
  arrowLeft.style.opacity = "0";
  arrowRight.style.transition = "opacity 0.3s ease-in";
  arrowLeft.style.transition = "opacity 0.3s ease-in";
}

// Change current time on seeking

function rangeSlider(value) {
  video.currentTime = range.value;
  fillProgress.style.width = (value * 100) / range.max + "%";
}
