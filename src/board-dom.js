export {createBoardDom};

const boardDom = document.querySelector('#board-container');

function createBoardDom() {
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j ++) {
            const newTile = createBoardTileDiv(i, j);
            boardDom.appendChild(newTile);
        };
    };
    console.log(boardDom);
}

function createBoardTileDiv(row, column) {
    const newTile = document.createElement('div');
    newTile.classList.add('board-tile');
    newTile.setAttribute('id',`${row}-${column}`);

    return newTile;
}