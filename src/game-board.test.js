import {Ship} from './ship.js'
import {GameBoard} from './game-board.js'

describe('check placeShipOnBoard function', () => {
    test('check placeShipOnBoard works', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');
        const shipSize = ship.getShipSize();

        gameBoard.placeShipOnBoard(ship);
        for(let i = 0; i < shipSize; i++) {
            expect(gameBoard.getBoard()[1][i]).toBe(1);
        }
    });
});