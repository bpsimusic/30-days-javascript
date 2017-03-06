const video = document.querySelector('.player');  //holder for video from webcam
const canvas = document.querySelector('.photo');  //holder for snapshots
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');  //where we put all our images
const snap = document.querySelector('.snap');
function getVideo(){
  //how you get the video from a webcam

  //this line 9 returns a Promise, an object with methods 'then'.
  //the catch is for catching errors. (i.e., not being able to use a webcam)
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
  .then(localMediaStream => {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play();
  })
  .catch(err=>console.error(err))
}

function paintToCanvas(){
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  return setInterval(()=>{
    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0,0, width, height)


    pixels = redEffect(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 16)
}



function takePhoto(){
  snap.currentTime = 0;
  snap.play();

  //take the data out of the canvas. This converts the image taken into
  //base64 data.
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}">`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels){
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i+0] = pixels.data[i+0] + 200;  //RED
    pixels.data[i+1] = pixels.data[i+1] - 50;   //GREEN
    pixels.data[i+2] = pixels.data[i+2] * 0.5;   // BLUE
  }
  return pixels;
}

function rgbSplit(pixels){
  for (let i = 0; i < pixels.data.length; i++) {
    pixels.data[i-150] = pixels.data[i+0];//red
    pixels.data[i+500] = pixels.data[i+1];//green
    pixels.data[i-550] = pixels.data[i+2];//blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i = i + 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas)
