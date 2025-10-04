import './style.css';
import {loadBoards} from './board-dom.js'
import {loadShipsDisplay} from './ships-dom.js'
import {placeShipsOnHumanBoard} from './gameplay-logic.js';

loadShipsDisplay();
loadBoards();
placeShipsOnHumanBoard();