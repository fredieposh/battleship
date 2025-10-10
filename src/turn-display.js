import {subscribeFunction} from './utils.js';
export {enableTurnsDisplay};
const turnsDisplayContainer = document.querySelector('#turns-message');

function setTurnsContainerDisplayValue(value) {
    turnsDisplayContainer.innerHTML = '';
    turnsDisplayContainer.innerHTML = value;
};

function enableTurnsDisplay() {
    setTurnsContainerDisplayValue('Your Turn')
    subscribeFunction('changeTurnDisplay', setTurnsContainerDisplayValue);
};