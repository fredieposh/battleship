import {Ship} from './ship.js'
import {GameBoard} from './game-board.js'

describe('check placeShipOnBoard function', () => {
    test('check placeShipOnBoard works for one ship horizontal placement', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        const changedGameBoared =  gameBoard.placeShipOnBoard(ship, 2, 5, true).board;
        expect(changedGameBoared[2][5]).toBe(1);
        expect(changedGameBoared[2][6]).toBe(1);

    });

    test('check placeShipOnBoard works for one ship vertical placement', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        const changedGameBoared =  gameBoard.placeShipOnBoard(ship, 2, 5, false).board;
        expect(changedGameBoared[2][5]).toBe(1);
        expect(changedGameBoared[3][5]).toBe(1);

    });

    test('check placeShipOnBoard works for one ship vertical placement', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        const changedGameBoared =  gameBoard.placeShipOnBoard(ship, 2, 5, false).board;
        expect(changedGameBoared[2][5]).toBe(1);
        expect(changedGameBoared[3][5]).toBe(1);

    });
});