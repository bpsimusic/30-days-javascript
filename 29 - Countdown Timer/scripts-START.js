let countDown;

let clock = document.querySelector(".display__time-left")
let endTime = document.querySelector(".display__end-time")

let buttons = document.querySelectorAll("[data-time]")

function timer(seconds){
  clearInterval(countDown);
  let now = Date.now()
  let then = now + seconds * 1000;
  displayTimeLeft(seconds)
  displayEndTime(then)
  countDown = setInterval(function(){
    let timeLeft = Math.round((then - Date.now()) / 1000)
    if (timeLeft < 0){
      clearInterval(countDown)
      return;
    }
    displayTimeLeft(timeLeft)
  }, 1000)
}

function displayTimeLeft(seconds){
  let minutes = Math.floor(seconds / 60)
  let secondsRemaining = (seconds % 60)
  secondsRemaining = secondsRemaining < 10 ? '0' + secondsRemaining: secondsRemaining;
  let display = `${minutes}: ${secondsRemaining}`
  document.title = display
  clock.innerText = display

}

function displayEndTime(timestamp){
  const end = new Date(timestamp)
  const hours = end.getHours()
  const minutes = end.getMinutes()
  endTime.innerText = `Be back at: ${hours > 12 ? hours - 12 : hours}: ${minutes < 10 ? '0' + minutes : minutes}`
}

function startTimer(){
  let seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach(button => button.addEventListener("click", startTimer))
document.customForm.addEventListener("submit", function(e){
  e.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60)
  this.reset();
})
