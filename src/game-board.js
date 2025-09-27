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

    placeShipOnBoard(ship, row, column, isHorizontal = true) {
        const shipSize = ship.getShipSize();
        
        if(isHorizontal) {
            this.#placeShipHorizontally(shipSize, row, column);
        } else {
            this.#placeShipVertically(shipSize, row, column);
        };

        return {board: this.#board,};
    };

    #placeShipHorizontally(shipSize, row, column) {
        for(let i = 0; i < shipSize; i++) {
            this.#board[row][i + column] = 1;
        }
    };

    #placeShipVertically(shipSize, row, column) {
        for(let i = 0; i < shipSize; i++) {
            this.#board[i + row][column] = 1;
        }
    };
};