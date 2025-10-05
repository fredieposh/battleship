import {Ship, getShipSizeByType} from './ship.js';
import {GameBoard} from './game-board.js';
import {coinFlip, drawNumner} from './utils.js';
import {publish} from './pub-sub.js';
export {placeShipsOnAllPlayersBoards};

const shipBySize = getShipSizeByType();
const humanGameBoard = new GameBoard();
const computerGameBoard = new GameBoard();

function placeShipsOnAllPlayersBoards() {
    placeShipsOnBoard(humanGameBoard);
    placeShipsOnBoard(computerGameBoard);
};

function placeShipsOnBoard(board) {
    for ( const ship in shipBySize) {
        const newShip = new Ship(ship);
        let placeShipResult;
        let row;
        let col;
        let direction;
        do {
            row = drawNumner();
            col = drawNumner();
            direction =  coinFlip();
            placeShipResult = board.placeShipOnBoard(newShip, row, col, direction);
        } while (typeof placeShipResult === 'string');

        if (board === humanGameBoard) {
            publishTilesChange('human', row, col, direction, newShip.getShipSize(), 'placed-ship');
        };
    };
    console.log(board);
};

function publishTilesChange(user, row, column, direction, length, reason) {
    if (direction) {
        for(let i = column; i < column + length; i++) {
            publish('changeTile', {user, row, column: i, reason});
        };
    } else {
        for(let i = row; i < row + length; i++) {
            publish('changeTile', {user, row: i, column, reason});
        };        
    };
};