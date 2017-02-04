document.addEventListener("DOMContentLoaded", function(){
  window.addEventListener("keydown", function(e){
    let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  });

  let keys = document.querySelectorAll(".key");
  keys.forEach(function(key) {
    key.addEventListener("transitionend", removeTransition);
  });
  
  function removeTransition(event){
    if(event.propertyName === "transform"){
      console.log(this);
      this.classList.remove("playing");
    }
    //event is the transition event, which has details on the transition.
  }
});
