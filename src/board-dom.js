export {loadBoards};

const humanUser = 'human';
const computerUser = 'computer';
const humanBoardDom = document.querySelector('#human-board-container');
const computerBoardDom = document.querySelector('#computer-board-container');

function loadBoards() {
    createBoardDom(humanUser, humanBoardDom );
    createBoardDom(computerUser, computerBoardDom );
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
    newTile.classList.add('board-tile');
    newTile.setAttribute('id',`${user}-${row}-${column}`);

    return newTile;
};