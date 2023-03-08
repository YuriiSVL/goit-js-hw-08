import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let playerCurrentTime = localStorage.getItem('videoplayer-current-time');

player.on('timeupdate', throttle(currentTimeToLocalStorage, 1000));

player
  .setCurrentTime(playerCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

function currentTimeToLocalStorage({ seconds }) {
  localStorage.setItem('videoplayer-current-time', seconds);
  console.log(localStorage);
}
