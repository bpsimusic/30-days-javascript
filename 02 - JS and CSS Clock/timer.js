document.addEventListener("DOMContentLoaded", function(){
  let secondHand = document.querySelector(".second-hand")
  let minuteHand = document.querySelector(".min-hand")
  let hourHand = document.querySelector(".hour-hand")


  function setTimer(){
    let now = new Date();
    let seconds = now.getSeconds();
    let minutes = now.getMinutes();
    let hours = now.getHours();
    let secondsDegrees = (seconds/60) * 360 + 90;
    let minutesDegrees = (minutes/60) * 360 + 90;
    let hoursDegrees = (hours/12) * 360 + 90;

    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    console.log(seconds)
  }
  setInterval(setTimer, 1000);
})
