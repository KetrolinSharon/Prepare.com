let videoOn = false;
let micOn = true;

const videoFeed = document.getElementById('videoFeed');
const camIcon = document.getElementById('camIcon');
const micIcon = document.getElementById('micIcon');

const videoContainer = document.querySelector('.video-container');

function toggleVideo() {
  videoOn = !videoOn;

  if (videoOn) {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: "user"
      }
    }).then(stream => {
      videoFeed.srcObject = stream;
      videoFeed.style.display = 'block';
      videoContainer.style.display = 'block'; 
      camIcon.classList.replace('fa-camera', 'fa-camera-slash');
    }).catch(err => {
      alert("Camera access denied.");
      videoOn = false;
    });
  } else {
    videoFeed.style.display = 'none';
    // Turn off the camera and hide video container
    let stream = videoFeed.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    videoFeed.srcObject = null;
    videoContainer.style.display = 'none'; 
    camIcon.classList.replace('fa-camera-slash', 'fa-camera');
  }
}


function toggleMic() {
  micOn = !micOn;
  micIcon.classList.toggle('fa-microphone');
  micIcon.classList.toggle('fa-microphone-slash');
}
