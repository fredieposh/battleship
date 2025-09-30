import {Ship} from './ship.js'
import {GameBoard} from './game-board.js'

describe('test placeShipOnBoard function', () => {
    test('test placeShipOnBoard works for one ship horizontal placement', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        const changedGameBoared =  gameBoard.placeShipOnBoard(ship, 2, 5, true).board;
        expect(changedGameBoared[2][5]).toBe(ship.getShipType());
        expect(changedGameBoared[2][6]).toBe(ship.getShipType());

    });

    test('test placeShipOnBoard works for one ship vertical placement', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        const changedGameBoared =  gameBoard.placeShipOnBoard(ship, 2, 5, false).board;
        expect(changedGameBoared[2][5]).toBe(ship.getShipType());
        expect(changedGameBoared[3][5]).toBe(ship.getShipType());

    });

    test('test if placing the first coordinate out of bounds returns warning 1', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        expect(gameBoard.placeShipOnBoard(ship, 0, 10, false)).toBe("Placing coordinates have to be within the board boundries.");
    });

    test('test if placing the first coordinate out of bounds returns warning 2', () => {
        const gameBoard = new GameBoard();
        const ship = new Ship('Destroyer');

        expect(gameBoard.placeShipOnBoard(ship, 10, 0, false)).toBe("Placing coordinates have to be within the board boundries.");
    });

    test('test that placing a ship on another ship returns error', () => {
        const gameBoard = new GameBoard();
        const ship1 = new Ship('Destroyer');
        const ship2 = new Ship('Destroyer');
        gameBoard.placeShipOnBoard(ship1, 1, 1, false);
        expect(gameBoard.placeShipOnBoard(ship2, 1, 0, true)).toBe("Can\'t place ship on another ship.");
    });
});