export {loadToContainer}
import {subscribeFunction} from './utils.js'
const gameContainer = document.querySelector('#container');

function loadToContainer(domObj) {
    gameContainer.innerHTML = '';
    gameContainer.appendChild(domObj);
};