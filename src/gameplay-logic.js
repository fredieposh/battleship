import {Ship, getShipSizeByType} from './ship.js'
import {GameBoard} from './game-board.js'
import { coinFlip, drawNumner} from './utils.js'
export {placeShipsOnHumanBoard};

const shipBySize = getShipSizeByType();
const humanGameBoard = new GameBoard();
const computerGameBoard = new GameBoard();

function placeShipsOnHumanBoard() {
    for ( const ship in shipBySize) {
        let placeShipResult;
        do {
            const newShip = new Ship(ship);
            const row = drawNumner();
            const col = drawNumner();
            const direction =  coinFlip();
            placeShipResult = humanGameBoard.placeShipOnBoard(newShip, row, col, direction);
        } while (typeof placeShipResult === 'string');
    };

    console.log(humanGameBoard);
}