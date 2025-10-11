import {publish} from './pub-sub.js';
export {loadEndScreen};

const endMessageDiv = document.createElement('div');
endMessageDiv.setAttribute('id', 'end-message-container');

function loadEndScreen(losingUser) {
    createEndMessageDiv(losingUser);
    publish('loadScreen', endMessageDiv);
};

function createEndMessageDiv(losingUser) {
    const endMessageTextDiv = createEndMessageTextDiv(losingUser);
    const endMessageButtonDiv = createEndMessageButtonDiv();
    const endMessageButton = createEndMessageButton();

    endMessageButton.addEventListener('click', restartGame);
    endMessageButtonDiv.appendChild(endMessageButton);

    endMessageDiv.appendChild(endMessageTextDiv);
    endMessageDiv.appendChild(endMessageButtonDiv);

    return endMessageDiv;
};

function createEndMessageTextDiv(losingUser) {
    const endMessageTextDiv = document.createElement('div');
    endMessageTextDiv.setAttribute('id', 'end-message-text');
    endMessageTextDiv.innerHTML = losingUser === 'human' ? 'The computer won!' : 'You won!';
    return endMessageTextDiv;
};

function createEndMessageButtonDiv() {
    const endMessageButtonDiv = document.createElement('div');
    endMessageButtonDiv.setAttribute('id', 'end-message-button-container');
    return endMessageButtonDiv;
};

function createEndMessageButton() {
    const endMessageButton = document.createElement('button');
    endMessageButton.setAttribute('id', 'end-message-button');
    endMessageButton.innerHTML = 'Play Again';
    return endMessageButton;
};

function restartGame() {
    location.reload();
};