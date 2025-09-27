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
        if(row < 0 || row > 9 || column < 0 || column > 9) {
            return "Placing coordinates have to be within the board boundries.";
        };

        const shipSize = ship.getShipSize();
        let cloneBoard;

        try {
            if(isHorizontal) {
                cloneBoard = this.#placeShipHorizontally(shipSize, row, column);
            } else {
                cloneBoard = this.#placeShipVertically(shipSize, row, column);
            };
        } catch(error) {
            return "The ship is out of board bounds. Please place it again.";
        }

        this.#copyShipFromCloneboardToBoard(cloneBoard, shipSize, row, column, isHorizontal);

        return {board: this.#board};
    };

    #placeShipHorizontally(shipSize, row, column) {
        const cloneBoard = this.#cloneBoard();
        for(let i = 0; i < shipSize; i++) {
            this.#checkHorizontalBoundries(i + column);
            cloneBoard[row][i + column] = 1;
        };

        return cloneBoard;
    };

    #placeShipVertically(shipSize, row, column) {
        const cloneBoard = this.#cloneBoard();
        for(let i = 0; i < shipSize; i++) {
            this.#checkVerticallBoundries(i + row);
            cloneBoard[i + row][column] = 1;
        };

        return cloneBoard;
    };

    #copyShipFromCloneboardToBoard(cloneBoard, shipSize, row, column, direction=true) {
        if (direction) {
            for(let i = 0; i < shipSize; i++) {
                this.#board[row][i + column] = cloneBoard[row][i + column];
            };
        } else {
            for(let i = 0; i < shipSize; i++) {
                this.#board[i + row][column] = cloneBoard[i + row][column];
            };
        };
    };

    #cloneBoard() {
        const clonedBoard = this.#board.map(r => [...r]);
        return clonedBoard;
    }

    #checkHorizontalBoundries(column) {
        if (column > 9) {
            throw new Error("Ship is out of columns bounds");
        }
    };

    #checkVerticallBoundries(row) {
        if (row > 9) {
            throw new Error("Ship is out of rows bounds");
        }
    };
};