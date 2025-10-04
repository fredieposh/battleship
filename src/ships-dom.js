import {getShipSizeByType} from './ship.js'
export {loadShipsDisplay};

const shipsBySize = getShipSizeByType();
const humanShipsDisplay = document.querySelector('#player-1-ships-container');
const computerShipsDisplay = document.querySelector('#player-2-ships-container');

function loadShipsDisplay() {
    createPlayerShipsDisplay(humanShipsDisplay);
    createPlayerShipsDisplay(computerShipsDisplay);
}

function createPlayerShipsDisplay(container) {
    Object.entries(shipsBySize).forEach(([ship, shipSize], index) => {
        const newShipDiv = createShipDiv(ship, shipSize, index);
        container.appendChild(newShipDiv);
    })
}

function createShipDiv(ship, shipSize, shipIndex) {
    const shipDiv = document.createElement("div");
    shipDiv.classList.add('ship-div');

    const shipNameDiv = createShipNameDiv(ship)
    const domShip = createDomShip(shipSize, shipIndex);

    shipDiv.appendChild(shipNameDiv);
    shipDiv.appendChild(domShip);

    return shipDiv;
}

function createShipNameDiv(ship) {
    const shipNameDiv = document.createElement("div");
    shipNameDiv.classList.add('ship-name-div');
    shipNameDiv.innerHTML = ship;

    return shipNameDiv;
}

function createDomShip(shipSize, shipIndex) {
    const domShip = document.createElement("div");
    domShip.classList.add('dom-ship');

    for (let i = 0; i < shipSize; i++) {
        const newShipPart = createDomShipPart(shipIndex);
        domShip.appendChild(newShipPart);
    };

    return domShip;
}

function createDomShipPart(shipIndex) {
    const part = document.createElement("div");
    part.classList.add(`part-${shipIndex}`);

    return part;
}