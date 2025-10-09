import {subscribe, publish} from './pub-sub.js'
export {loadBoards};
import {subscribeFunction} from './utils.js'

let currentComputerBoard = 'real';
const humanUser = 'human';
const computerUser = 'computer';
const humanBoardContainer = document.querySelector('#human-board-container');
const computerBoardContainer = document.querySelector('#computer-board-container');
const computerContainer = document.querySelector('#computer-container');
const dummyBoard = createDummyBoardDom();

function loadBoards() {
    createBoardDom(humanUser, humanBoardContainer );
    createBoardDom(computerUser, computerBoardContainer );
    populateDummyBoardWithTiles();
};

function switchComputerBoards(currentComputerBoard) {
    if (currentComputerBoard === 'real') {
        currentComputerBoard = 'dummy';
        emptyComputerContainer();
        loadBoardToComputerContainer(dummyBoard);
        return;
    }

    if (currentComputerBoard === 'dummy') {
        currentComputerBoard = 'real';
        emptyComputerContainer();
        loadBoardToComputerContainer(computerBoardContainer);
        return;
    }
};

function emptyComputerContainer() {
    computerContainer.innerHTML = '';
}

function loadBoardToComputerContainer(board) {
    computerContainer.appendChild(board);
}

function createBoardDom(user, container) {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j ++) {
            const newTile = createBoardTileDiv(user ,i, j);
            container.appendChild(newTile);
        };
    };
};

function createDummyBoardDom() {
    const dummyBoard = document.createElement('div');
    dummyBoard.setAttribute('id','dummy-board-container');

    return dummyBoard;
};

function createDummyBoardTileDiv() {
    const newTile = document.createElement('div');
    newTile.classList.add('board-tile-dummy');
    return newTile;
};

function populateDummyBoardWithTiles() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j ++) {
            const newTile = createDummyBoardTileDiv();
            dummyBoard.appendChild(newTile);
        };
    };    
}

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
    publish('switchComputerBoard', currentComputerBoard);
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
subscribeFunction('switchComputerBoard',switchComputerBoards);