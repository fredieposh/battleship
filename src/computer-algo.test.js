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

        expect(tracker.direction).toStrictEqual( [[1, 0], [-1, 0]] );
    });    
});


describe('Test hitInDirection function', () => {
    test('Test hitInDirection with one single horizontal ship - Hit is at one of the ship edges', () => {
        const ship = new Ship('Cruiser');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 1, true);
        board.receiveAttack(1, 1);

        const firstHit = new Hit([1,1], 'Cruiser');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Cruiser');

        const direction = tracker.direction;
        while(
            board.getBoard()[1][1] != 'x' ||
            board.getBoard()[1][2] != 'x' ||
            board.getBoard()[1][3] != 'x'
        ) {
            tracker.hitInDirection(tracker.firstHit, board);
        };

    });

    test('Test hitInDirection with one single horizontal ship - Hit is on the other edge', () => {
        const ship = new Ship('Cruiser');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 1, true);
        board.receiveAttack(1, 2);

        const firstHit = new Hit([1,2], 'Cruiser');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Cruiser');

        while(
            board.getBoard()[1][1] != 'x' ||
            board.getBoard()[1][2] != 'x' ||
            board.getBoard()[1][3] != 'x'
        ) {
            tracker.hitInDirection(tracker.firstHit, board);
        };

    });

    test('Test hitInDirection with one single horizontal ship - Hit is at the center of the ship', () => {
        const ship = new Ship('Cruiser');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 1, true);
        board.receiveAttack(1, 2);

        const firstHit = new Hit([1,2], 'Cruiser');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Cruiser');

        let counter = 0;
        while(
            (board.getBoard()[1][1] != 'x' ||
            board.getBoard()[1][2] != 'x' ||
            board.getBoard()[1][3] != 'x' ) &&
            counter < 3000
        ) {
            tracker.hitInDirection(tracker.firstHit, board);
            counter ++;
        };

    });

    test('Test hitInDirection with one single horizontal ship - Ship is at the edge of the board', () => {
        const ship = new Ship('Cruiser');
        const board = new GameBoard();
        let probeHit;

        board.placeShipOnBoard(ship, 1, 0, true);
        board.receiveAttack(1, 0);

        const firstHit = new Hit([1,0], 'Cruiser');
        const tracker = new HitTracker(firstHit, firstHit.hitType);

        do {
            probeHit = tracker.probeForHit(board);
        } while (probeHit !== 'Cruiser');

        while(
            board.getBoard()[1][0] != 'x' ||
            board.getBoard()[1][1] != 'x' ||
            board.getBoard()[1][2] != 'x'
        ) {
            tracker.hitInDirection(tracker.firstHit, board);
        };
        console.log(board.getBoard())
    });

});

