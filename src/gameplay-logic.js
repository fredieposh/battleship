import {Hit, HitTracker} from './computer-algo.js';
import {Ship, getShipSizeByType} from './ship.js';
import {GameBoard} from './game-board.js';
import {coinFlip, drawNumner, subscribeFunction} from './utils.js';
import {publish} from './pub-sub.js';
import {getCurrentComputerBoard} from './board-dom.js';
export {placeShipsOnAllPlayersBoards};

let currentTurn = 'human';
const shipBySize = getShipSizeByType();
const humanGameBoard = new GameBoard();
const computerGameBoard = new GameBoard();
const hitsTrack = {};
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
        changeTurn();
    } else {
        publish('changeTile', {user: board, row, col, reason: 'hit-ship',});
    };

    if(hitResult.isShipSunk === true) {
        publish('shipSunk', {user: board, shipType: hitResult.hitShipType,})
        if (attackedBoard.getShipCounter() === 0) {
            publish('endGame', board);
        };
    };

    return hitResult;
};

function changeTurn() {
    if(currentTurn === 'human') {
        publish('switchComputerBoard', getCurrentComputerBoard());
        currentTurn = 'computer';
        publish('changeTurnDisplay', 'Computer\'s Turn');
        manageComputerTurn();
        return;
    };

    if(currentTurn === 'computer') {
        publish('switchComputerBoard', getCurrentComputerBoard());
        currentTurn = 'human';
        publish('changeTurnDisplay', 'Your Turn');
        return;
    };    
};

function getCurrentTurn() {
    return currentTurn;
};

async function manageComputerTurn() {
    let tracker;
    const hitsTrackFirstKey = Object.keys(hitsTrack)[0];
    if (hitsTrack[hitsTrackFirstKey]) {
        const tracker = hitsTrack[Object.keys(hitsTrack)[0]];
        let trackerResult;
        
        do {
            trackerResult = handleTracker(tracker)
        } while(trackerResult === tracker.shipType);
        
        if(trackerResult === 'x') {
            changeTurn();
            return;
        };

        if (trackerResult !== 'A hit coordinates have to be within the board boundries.') {
            
        }
        
        return;
    };
    
    let computerHitResult = await computerAttack();
    console.log(hitsTrack[computerHitResult]);

    if(computerHitResult === 'x') {
        return;
    };

    if(hitsTrack[computerHitResult]) {
        tracker = hitsTrack[computerHitResult];
        let trackerResult;

        do {
            trackerResult = handleTracker(tracker)
        } while(trackerResult === tracker.shipType);

        if(trackerResult === 'x') {
            changeTurn();
        }

        return;
    };

};

function setDelay() {
return new Promise(resolve => setTimeout(resolve, 2000));
};

async function computerAttack() {
    await setDelay();
    const humanBoard = humanGameBoard.getBoard();
    let row = drawNumner();
    let col = drawNumner();
    let humanBoardCoordinateContent = humanBoard[row][col];

    while(humanBoardCoordinateContent === 'x') {
        row = drawNumner();
        col = drawNumner();
        humanBoardCoordinateContent = humanBoard[row][col];
    };

    const hitResult = hitBoard({board: 'human', row, col});

    if(hitResult === 'x') {
        return hitResult;
    };

    const newHit = new Hit([row, col], hitResult.hitShipType);
    const newTracker = new HitTracker(newHit, hitResult.hitShipType);

    hitsTrack[hitResult.hitShipType] = newTracker;
    return hitResult.hitShipType;
};

function handleTracker(tracker) {

        if(!tracker.direction) {
            const probeResults = tracker.probeForHit(humanGameBoard);
            return probeResults;
        };

        tracker.hitInDirection(tracker.firstHit, humanGameBoard);
        return tracker.lastTrackResult;
}

subscribeFunction('boardHit', hitBoard);