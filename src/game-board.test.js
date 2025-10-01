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

    test('test that placing a ship horizontally adds 1 to shipsCounter', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');

        expect(board.placeShipOnBoard(ship, 0, 0, true).shipsCounter).toBe(1);
    });

    test('test that placing 2 ships adds 2 to shipsCounter', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');
        
        board.placeShipOnBoard(ship, 0, 2, false)
        expect(board.placeShipOnBoard(ship, 0, 0, true).shipsCounter).toBe(2);
    });

    test('test that the ship is added to GameBoard.ships object', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');
        const shipType = ship.getShipType();
        
        board.placeShipOnBoard(ship, 0, 2, false)
        expect(board.getShip(shipType).getShipType()).toBe(shipType);
    });
});

describe('test receiveAttack function', () => {
    test('test that a hit on an empty coordinate', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');

        board.placeShipOnBoard(ship, 1, 1, true);
        expect((board.receiveAttack(0, 0))).toBe('x');
    });

    test('test that a ship hit returns the ship type', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');

        board.placeShipOnBoard(ship, 1, 1, true);
        expect(board.receiveAttack(1, 2).hitShipType).toBe(ship.getShipType());
    });

    test('test that a ships counter is sub by 1 if a ship is sunk', () => {
        const board = new GameBoard();
        const ship = new Ship('Destroyer');

        board.placeShipOnBoard(ship, 1, 1, true);
        
        let {hitShipType , shipsCounter} = board.receiveAttack(1, 2);
        expect(hitShipType).toBe(ship.getShipType());
        expect(shipsCounter).toBe(1);
        
        ({hitShipType , shipsCounter} = board.receiveAttack(1, 2));
        expect(hitShipType).toBe(ship.getShipType());
        expect(shipsCounter).toBe(0);
    });
});
