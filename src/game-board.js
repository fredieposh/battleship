// import {Ship} from './ship.js';

export {GameBoard};

class GameBoard {
    #board;

    constructor(){
        this.#board = new Array(10).fill().map(() => Array(10).fill(-1));
    }

    getBoard() {
        return this.#board;
    };

    placeShipOnBoard(ship) {
        const shipSize = ship.getShipSize();
        for(let i = 0; i < shipSize; i++) {
            this.#board[1][i] = 1;
        }

        return this.#board;
    };
};