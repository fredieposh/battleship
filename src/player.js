import {GameBoard} from './game-board.js'

export{Player};

class Player {
    #playerBoard;
    constructor() {
        this.#playerBoard = new GameBoard();
    }

    getPlayerBoard() {
        return this.#playerBoard;
    }
}