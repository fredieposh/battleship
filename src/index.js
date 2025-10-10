import './style.css';
import {loadBoards} from './board-dom.js'
import {loadShipsDisplay} from './ships-dom.js'
import {placeShipsOnAllPlayersBoards} from './gameplay-logic.js';
import {enableTurnsDisplay} from './turn-display.js';

enableTurnsDisplay();
loadShipsDisplay();
loadBoards();
placeShipsOnAllPlayersBoards();