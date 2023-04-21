import Player from '@vimeo/player';
import _trottle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function (currentTime) {
  try {
    localStorage.setItem(
      'videoplayer-current-time',
      JSON.stringify(currentTime)
    );
  } catch (err) {
    console.error(err.message);
  }
};
player.on('timeupdate', _trottle(onPlay, 1000));
function setCurrentTime() {
  const data = localStorage.getItem('videoplayer-current-time');
  if (!data) {
    return;
  }
  const parseData = JSON.parse(data);
  player.setCurrentTime(parseData.seconds);
}
setCurrentTime();
