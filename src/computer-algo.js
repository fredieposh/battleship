import {publish} from './pub-sub';
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
    nextCoord;
    lastTrackResult;

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
        this.nextCoord = null;
        this.lastTrackResult = null;
    }

    probeForHit(board) {
        
        const {index, direction} = this.#directionDraw(this.probeDirections);
        const hitCoord = [this.firstHit.hitLocation[0] + direction[0], this.firstHit.hitLocation[1] + direction[1]];
        const hitResult = board.receiveAttack(hitCoord[0], hitCoord[1]);

        if (hitResult === 'A hit coordinates have to be within the board boundries.') {
            this.probeDirections.splice(index, 1);
            return hitResult;
        };

        if (hitResult === 'x') {
            publish('changeTileContent', {user: 'human', row: hitCoord[0], col: hitCoord[1], reason: 'blank-hit',});
            this.probeDirections.splice(index, 1);
            return hitResult;
        };

        if (hitResult.hitShipType !== this.shipType) {
            publish('changeTile', {user: 'human', row: hitCoord[0], col: hitCoord[1], reason: 'hit-ship',});
            this.probeDirections.splice(index, 1);
            return hitResult.hitShipType;
        };

        if (hitResult.hitShipType === this.shipType) {
            this.#loadDirections(this.#returnDirections(direction));
            publish('changeTile', {user: 'human', row: hitCoord[0], col: hitCoord[1], reason: 'hit-ship',});
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
    };

    hitInDirection(hit, board) {
        const direction = this.direction[0];
        
        if(hit === null) {
            if(this.nextCoord === null) {
                this.nextCoord = this.#assembleCoord(this.firstHit.hitLocation, direction);
            } else {
                this.nextCoord = this.#assembleCoord(this.nextCoord, direction);
            };

            if (board.getBoard()[this.nextCoord[0]][this.nextCoord[1]] === 'x') {
                const newHit = new Hit(this.nextCoord, this.shipType);
                this.lastTrackResult = 'tile already explored';
                return newHit;
            };

            const hitResults = board.receiveAttack(this.nextCoord[0], this.nextCoord[1]);
            
            if (hitResults === 'A hit coordinates have to be within the board boundries.') {
                this.direction.splice(0, 1);
                this.nextCoord = null;
                const newHit = new Hit(this.nextCoord, hitResults);
                this.lastTrackResult = hitResults;
                return newHit;
            };

            if (hitResults === 'x') {
                this.direction.splice(0, 1);
                this.nextCoord = null;
                const newHit = new Hit(this.nextCoord, hitResults);
                this.lastTrackResult = hitResults;
                return newHit;
            };

            if (hitResults.hitShipType !== this.shipType) {
                this.direction.splice(0, 1);
                this.nextCoord = null;
                const newHit = new Hit(this.nextCoord, hitResults.hitShipType);
                this.lastTrackResult = hitResults.hitShipType;
                return newHit;
            };

            if (hitResults.hitShipType === this.shipType) {
                const newHit = new Hit(this.nextCoord, hitResults.hitShipType);
                this.lastTrackResult = hitResults.hitShipType;
                return newHit;
            };

        };

        if(this.direction.length === 1) {
            hit.prevHit = this.hitInDirection(hit.prevHit, board);
        };

        if(this.direction.length > 1) {
            hit.nextHit = this.hitInDirection(hit.nextHit, board);
        };
    };

    #assembleCoord(arr1, arr2) {
        const firstCoord = arr1[0] + arr2[0];
        const secondCoord = arr1[1] + arr2[1];

        return [firstCoord, secondCoord];
    }
};
