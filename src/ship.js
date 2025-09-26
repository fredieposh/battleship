export {Ship};

const shipSizeByType = {
    Carrier:	5,
	Battleship:	4,
	Cruiser:	3,
	Submarine:	3,
	Destroyer:	2,
};

class Ship {
    #shipType;
    #shipSize;
    #shipHitsNumber;
    #isShipSunk;

    constructor(shipType) {
        this.#shipType = shipType;
        this.#shipHitsNumber = 0;
        this.#shipSize = shipSizeByType[shipType];
        this.#isShipSunk = false;
    };

    isSunk() {
        return this.#isShipSunk;
    };

    #sinkShip() {
        this.#isShipSunk = true;
    };

    getShipSize() {
        return this.#shipSize;
    }

    getShipHitsNumber() {
        return this.#shipHitsNumber;
    }

    #checkShipState() {
        if(this.getShipHitsNumber() === this.getShipSize()) {
            this.#sinkShip();
            return true;
        };
        return false;
    }

    hit() {
        if (this.isSunk()) {
            return -1;
        };

        this.#shipHitsNumber++;
        this.#checkShipState();
        return this.#shipHitsNumber;
    };
}