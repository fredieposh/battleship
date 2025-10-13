import {Ship} from './ship.js'
import {GameBoard} from './game-board.js'
import {Hit, HitTracker} from './computer-algo.js'

describe('Test probeForHit function', () => {
    test('Test probeForHit with one single horizontal ship', () => {
        const ship = new Ship('Destroyer');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 1, true);
        board.receiveAttack(1, 1);

        const firstHit = new Hit([1,1], 'Destroyer');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Destroyer');

        expect(tracker.firstHit.nextHit.hitLocation).toStrictEqual([1,2]);
        expect(tracker.direction).toStrictEqual( [[0, 1], [0, -1]] );
    });

    test('Test probeForHit with one single vertical ship', () => {
        const ship = new Ship('Destroyer');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 1, false);
        board.receiveAttack(1, 1);

        const firstHit = new Hit([1,1], 'Destroyer');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Destroyer');

        expect(tracker.firstHit.nextHit.hitLocation).toStrictEqual([2,1]);
        expect(tracker.direction).toStrictEqual( [[1, 0], [-1, 0]] );
    });    
});