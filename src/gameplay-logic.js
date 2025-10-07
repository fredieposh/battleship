import {Ship, getShipSizeByType} from './ship.js';
import {GameBoard} from './game-board.js';
import {coinFlip, drawNumner, subscribeFunction} from './utils.js';
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
            publish('changeTile', {user, row, col: i, reason});
        };
    } else {
        for(let i = row; i < row + length; i++) {
            publish('changeTile', {user, row: i, col: column, reason});
        };        
    };
};

function hitBoard(obj) {
    const {board, row, col} = obj;
    let attackedBoard;

    if (board === 'human') {
        attackedBoard = humanGameBoard;
    }

    if (board === 'computer') {
        attackedBoard = computerGameBoard;
    }

    const hitResult = attackedBoard.receiveAttack(row, col);
    if (hitResult === 'x') {
        publish('changeTileContent', {user: board, row, col, reason: 'blank-hit',});
    } else {
        publish('changeTile', {user: board, row, col, reason: 'hit-ship',});
    };

    if(hitResults.isShipSunk === true) {
        publish('shipSunk', {user: board, shipType: hitResult.hitShipType,})
    };
};

subscribeFunction('boardHit', hitBoard);