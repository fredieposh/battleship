import './style.css';
import {loadBoards} from './board-dom.js'
import {loadShipsDisplay} from './ships-dom.js'
import {placeShipsOnAllPlayersBoards} from './gameplay-logic.js';

loadShipsDisplay();
loadBoards();
placeShipsOnAllPlayersBoards();