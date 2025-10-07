import {subscribe, publish} from './pub-sub.js'
export {loadBoards};
import {subscribeFunction} from './utils.js'

const humanUser = 'human';
const computerUser = 'computer';
const humanBoardContainer = document.querySelector('#human-board-container');
const computerBoardContainer = document.querySelector('#computer-board-container');

function loadBoards() {
    createBoardDom(humanUser, humanBoardContainer );
    createBoardDom(computerUser, computerBoardContainer );
};

function createBoardDom(user, container) {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j ++) {
            const newTile = createBoardTileDiv(user ,i, j);
            container.appendChild(newTile);
        };
    };
};

function createBoardTileDiv(user, row, column) {
    const newTile = document.createElement('div');
    if (user === 'human') {
        newTile.classList.add('board-tile-human');
    } else {
        newTile.classList.add('board-tile');
        newTile.addEventListener('click', boardDomHit);
    };
    newTile.setAttribute('id',`${user}-${row}-${column}`);

    return newTile;
};

function changeTileColor(obj) {
    const {user, row, col, reason} = obj;
    const selectedTile = getTileById(user, row, col);

    if(user === 'computer') {
        clearTileClasslist(selectedTile);
    };

    if (user === 'human' && selectedTile.classList.contains('placed-ship')) {
        selectedTile.classList.remove('placed-ship');
    }

    selectedTile.classList.add(reason);
}

function boardDomHit(e) {
    const user = getTileUser(e)[0];
    const coordinates = getTileCoordinatess(e);
    const row = +coordinates[0]
    const col = +coordinates[1]

    publish('boardHit', {board: user, row, col});
}

function getTileUser(e) {
    e.stopPropagation();
    const reg = /[a-zA-z]+/g;
    const tileId = e.target.id;
    return tileId.match(reg);
}

function getTileCoordinatess(e) {
    e.stopPropagation();
    const reg = /\d+/g;
    const tileId = e.target.id;
    return tileId.match(reg);
};

function changeTileContent(obj) {
    const {user, row, col, reason} = obj;
    if (user === 'human') {
        const selectedTile = getTileById(user, row, col);
        reason === 'blank-hit' ? selectedTile.innerHTML = 'x': selectedTile.innerHTML = '';
    };

    if (user === 'computer') {
        const selectedTile = getTileById(user, row, col);
        if (reason === 'blank-hit') {
            selectedTile.innerHTML = 'x';
            selectedTile.removeEventListener('click', boardDomHit);
            disableTile(selectedTile);
        };
    }
};

function getTileById(user, row, column) {
    return document.querySelector(`#${user}-${row}-${column}`);
}

function disableTile(tile) {
    tile.classList.remove('board-tile');
    tile.classList.add('board-tile-disabled');
}

function clearTileClasslist(tile) {
    console.log(tile);
    tile.classList = [];
}

subscribeFunction('changeTile',changeTileColor);
subscribeFunction('changeTileContent',changeTileContent);