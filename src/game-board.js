export {GameBoard};

class GameBoard {
    #board;
    #ships;
    #shipsCounter;

    constructor(){
        this.#board = new Array(10).fill().map(() => Array(10).fill(null));
        this.#ships = {};
        this.#shipsCounter = 0;
    }

    getBoard() {
        return this.#board;
    };

    placeShipOnBoard(ship, row, column, isHorizontal = true) {
        try{
            this.#checkHorizontalBoundries(column);
            this.#checkVerticallBoundries(row);
        } catch(error) {
            return 'Placing coordinates have to be within the board boundries.';
        };

        const shipSize = ship.getShipSize();
        const shipType = ship.getShipType()
        let cloneBoard;

        try {
            if(isHorizontal) {
                cloneBoard = this.#placeShipHorizontally(shipSize, shipType, row, column);
            } else {
                cloneBoard = this.#placeShipVertically(shipSize, shipType, row, column);
            };
        } catch(error) {
            if (error.message === 'Can\'t place ship on another ship.') {
                return error.message;
            }
            return "The ship is out of board bounds. Please place it again.";
        };

        this.#copyShipFromCloneboardToBoard(cloneBoard, shipSize, row, column, isHorizontal);
        this.#addToShipsCounter();
        this.#addShipToShips(ship);

        return {board: this.#board, shipsCounter: this.#shipsCounter};
    };

    getShip(shipType) {
        return this.#ships[shipType];
    };

    getShipCounter() {
        return this.#shipsCounter();
    }

    receiveAttack(row, column) {
        try{
            this.#checkHorizontalBoundries(column);
            this.#checkVerticallBoundries(row);
        } catch(error) {
            return 'A hit coordinates have to be within the board boundries.';
        };
        
        if(this.#board[row][column] === null) {
            this.#board[row][column] = 'x';
            return this.#board[row][column];
        };
        
        if(this.#board[row][column] !== null && this.#board[row][column] !== 'x') {
            const shipType = this.#board[row][column];
            const ship = this.#ships[shipType];
            const hitShipType = this.#hitShip(ship);
            const isShipSunk = ship.isSunk();
            this.#board[row][column] = 'x';
            return {hitShipType, shipsCounter: this.#shipsCounter, isShipSunk,};
        };
        
    };

    #placeShipHorizontally(shipSize, shipType, row, column) {
        const cloneBoard = this.#cloneBoard();
        for(let i = 0; i < shipSize; i++) {
            this.#checkHorizontalBoundries(i + column);
            this.#checkIfCoordinateHasShip(row ,i + column);
            cloneBoard[row][i + column] = shipType;
        };

        return cloneBoard;
    };

    #placeShipVertically(shipSize, shipType, row, column) {
        const cloneBoard = this.#cloneBoard();
        for(let i = 0; i < shipSize; i++) {
            this.#checkVerticallBoundries(i + row);
            this.#checkIfCoordinateHasShip(i + row, column);
            cloneBoard[i + row][column] = shipType;
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
        if (column > 9 || column < 0) {
            throw new Error("Ship is out of columns bounds");
        }
    };

    #checkVerticallBoundries(row) {
        if (row > 9 || row < 0) {
            throw new Error("Ship is out of rows bounds");
        }
    };

    #checkIfCoordinateHasShip(row, column) {
        if (this.#board[row][column] !== null) {
            throw new Error('Can\'t place ship on another ship.');
        }
    };

    #addToShipsCounter() {
        this.#shipsCounter ++;
        return this.#shipsCounter;
    };

    #subFromShipsCounter() {
        this.#shipsCounter --;
        return this.#shipsCounter;
    };

    #addShipToShips(ship) {
        this.#ships[ship.getShipType()] = ship;
    }

    #hitShip(ship) {
        ship.hit();

        if(ship.isSunk()) {
            this.#subFromShipsCounter();
        }

        return ship.getShipType();
    }

};