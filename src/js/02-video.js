import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

const onPlay = function (currentTime) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(currentTime));
};

function setCurrentTime() {
  if (!'videoplayer-current-time') {
    return;
  }
}
setCurrentTime();
player.on('play', onPlay);
