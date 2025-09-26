import {Ship} from './ship.js';

describe('hit function tests', () => {
    test('check if new ship has 0 hits', () => {
        const ship = new Ship('Destroyer');
        expect(ship.getShipSize()).toBe(2);
    });

    test('check that 1 hit returns 1', () => {
        const ship = new Ship('Destroyer');
        expect(ship.hit()).toBe(1);
    });

    test('check that 2 hits returns 2', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        expect(ship.hit()).toBe(2);
    });

    test('check that sunken ship doesn\'t get hit', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        expect(ship.hit()).toBe(-1);
    });

    test('check that sunken ship doesn\'t get hit', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        expect(ship.hit()).toBe(-1);
    });
});

describe('isSunk function tests', () => {

    test('isSunk returns false when the ship is not sunk', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test('isSunk returns true when the ship is sunk', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
});

describe('getShipHitsNumber function tests', () => {

    test('getShipHitsNumber returns 0 where there are no hits', () => {
        const ship = new Ship('Destroyer');
        expect(ship.getShipHitsNumber()).toBe(0);
    });

    test('getShipHitsNumber returns 1 when there is 1 hit', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        expect(ship.getShipHitsNumber()).toBe(1);
    });

    test('getShipHitsNumber returns the ship size when the ship is sunken', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        expect(ship.getShipHitsNumber()).toBe(2);
    });

    test('getShipHitsNumber returns the ship size when the ship is sunken and getting more hits', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.getShipHitsNumber()).toBe(2);
    });
});


describe('getShipSize function tests', () => {

    test('getShipSize return ship size where there are no hits', () => {
        const ship = new Ship('Destroyer');
        expect(ship.getShipSize()).toBe(2);
    });

    test('getShipSize return ship size where there is 1 hit', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        expect(ship.getShipSize()).toBe(2);
    });

    test('getShipHitsNumber returns the ship size when the ship is sunken', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        expect(ship.getShipSize()).toBe(2);
    });

    test('getShipSize returns the ship size when the ship is sunken and getting more hits', () => {
        const ship = new Ship('Destroyer');
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.getShipSize()).toBe(2);
    });
});

