import {GameBoard} from './game-board.js'
export {Hit, HitTracker};

class Hit {
    hitLocation;
    hitType;
    nextHit;
    prevHit;

    constructor(hitLocation ,hitType ,nextHit = null ,prevHit = null) {
        this.hitLocation = hitLocation;
        this.hitType     = hitType;
        this.nextHit     = nextHit;
        this.prevHit     = prevHit;
    }
};

class HitTracker {
    firstHit;
    direction;
    shipType;
    probeDirections;

    constructor(firstHit, shipType, direction = null) {
        this.firstHit = firstHit;
        this.direction = direction;
        this.shipType = shipType;
        this.probeDirections = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0]
        ]; 
    }

    probeForHit(board) {
        
        const {index, direction} = this.#directionDraw(this.probeDirections);
        const hitCoord = [this.firstHit.hitLocation[0] + direction[0], this.firstHit.hitLocation[0] + direction[1]];
        const hitResult = board.receiveAttack(hitCoord[0], hitCoord[1]);

        if (hitResult === 'A hit coordinates have to be within the board boundries.') {
            this.probeDirections.splice(index, 1);
            return hitResult;
        };

        if (hitResult === 'x') {
            this.probeDirections.splice(index, 1);
            return hitResult;
        };

        if (hitResult.hitShipType !== this.shipType) {
            this.probeDirections.splice(index, 1);
            return hitResult.hitShipType;
        };

        if (hitResult.hitShipType === this.shipType) {
            this.#loadDirections(this.#returnDirections(direction));
            this.firstHit.nextHit = new Hit(hitCoord, hitResult.hitShipType, null, this.firstHit); 
            return hitResult.hitShipType;
        };


    };

    #directionDraw(array) {
        const index = Math.floor(Math.random() * array.length);
        const direction = array[index];

        return {index, direction};
    };

    #returnDirections(direction) {
        if (direction[0] === 0) {
            return [[0, 1], [0, -1]];
        };
        
        return [[1, 0], [-1, 0]];
    };

    #loadDirections(directionsArray) {
        this.direction = [];
        directionsArray.forEach(direction => this.direction.push(direction));
    }
};
 
