const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const vinyl = document.getElementById('vinyl');
const volumeBar = document.getElementById('volume-bar');
const volumeFill = document.getElementById('volume-fill');
const volumeThumb = document.getElementById('volume-thumb');

let volume = 0.5;
audio.volume = volume;
volumeFill.style.width = `${volume * 100}%`;
volumeThumb.style.left = `${volume * 100}%`;

const updateVolume = (e) => {
  const rect = volumeBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  volume = Math.min(Math.max(offsetX / rect.width, 0), 1);
  audio.volume = volume;
  volumeFill.style.width = `${volume * 100}%`;
  volumeThumb.style.left = `${volume * 100}%`;
};

volumeThumb.addEventListener('mousedown', (e) => {
  e.preventDefault();
  const mouseMoveHandler = (e) => updateVolume(e);
  const mouseUpHandler = () => {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };
  document.addEventListener('mousemove', mouseMoveHandler);
  document.addEventListener('mouseup', mouseUpHandler);
});

volumeBar.addEventListener('click', updateVolume);

playPauseButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseButton.textContent = 'Pause';
    vinyl.style.animationPlayState = 'running';
  } else {
    audio.pause();
    playPauseButton.textContent = 'Play';
    vinyl.style.animationPlayState = 'paused';
  }
});
