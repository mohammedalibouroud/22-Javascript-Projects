const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const durationTime = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Pause');
}
function tagglePlay(){
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Play');
    } else {
        video.pause();
        showPlayIcon();
    }
}

function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
}

function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    durationTime.textContent = `${displayTime(video.duration)}`;
}

function changeSpeed(){
    console.log(speed.value);
    video.playbackRate = speed.value;
 }
 
 function setProgress(e){
    const newTime = e.offsetX / e.srcElement.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
    console.log(newTime);
    console.log(video.duration);
 }

 let lastVolume = 1; 
 function changeVolume(e){
    let volume = e.offsetX / e.srcElement.offsetWidth; 
    if(volume < 0.1){
        volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;

    volumeIcon.className = '';

    if(volume > 0.7){
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if(volume < 0.7 && volume > 0){
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if(volume === 0){
        volumeIcon.classList.add('fas', 'fa-volume-off');
    }
    lastVolume = volume;
 }

 function toggleMute(){
     volumeIcon.className = '';
     if(video.volume){
         lastVolume = video.volume;
         video.volume = 0;
         volumeBar.style.width = 0;
         volumeIcon.classList.add('fas', 'fa-volume-mute');
         volumeIcon.setAttribute('title', 'Unmute');
     } else {
         video.volume = lastVolume;
         volumeBar.style.width = `${lastVolume * 100}%`;
         volumeIcon.classList.add('fas', 'fa-volume-up');
         volumeIcon.setAttribute('title', 'Mute');
     }
 }

 /* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }

let fullscreen = false;

function toggleFullscreen(){
    if(!fullscreen){
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
 }

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
video.addEventListener('ended', showPlayIcon);
playBtn.addEventListener('click', tagglePlay);
video.addEventListener('click', tagglePlay);

speed.addEventListener('change', changeSpeed);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
fullscreenBtn.addEventListener('click', toggleFullscreen);
