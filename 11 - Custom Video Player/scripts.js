const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
  video.paused ? video.play() : video.pause();
}

function updateToggle(){
  toggle.textContent = video.paused ? '►' : '❚ ❚';
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateSlider(){
  video[this.name] = this.value;
}

function updateProgress(){
  let percent = (this.currentTime / this.duration) * 100
  progressBar.style.flexBasis =  `${percent}%`

}

function scrub(event){
  let seconds = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = seconds;
}
video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);
video.addEventListener("play", updateToggle);
video.addEventListener("pause", updateToggle);
video.addEventListener("timeupdate", updateProgress);

let mousedown = false;
progress.addEventListener("click", scrub)
progress.addEventListener("mousemove", (e)=> mousedown && scrub(e))
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);
skipButtons.forEach(element =>
  element.addEventListener("click", skip));
ranges.forEach(range =>
  range.addEventListener("change", updateSlider));
