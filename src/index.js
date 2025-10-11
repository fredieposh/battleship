import './style.css';
import {loadBoards} from './board-dom.js'
import {subscribeFunction} from './utils.js'
import {loadShipsDisplay} from './ships-dom.js'
import {placeShipsOnAllPlayersBoards} from './gameplay-logic.js';
import {enableTurnsDisplay} from './turn-display.js';
import {loadEndScreen} from './end-game.js'
import {loadToContainer} from './screen-dom.js'

subscribeFunction('loadScreen', loadToContainer);
subscribeFunction('endGame', loadEndScreen);;
enableTurnsDisplay();
loadShipsDisplay();
loadBoards();
placeShipsOnAllPlayersBoards();