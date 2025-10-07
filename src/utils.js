import {subscribe, publish} from './pub-sub.js'
export {copyObj, coinFlip, drawNumner, subscribeFunction};


function copyObj(obj) {
    const objCopy = {};
    Object.entries(obj).forEach(([key, value]) => objCopy[key] = value);
    return objCopy;
}

function coinFlip() {
    return Math.random() > 0.5;
}

function drawNumner() {
    return Math.floor(Math.random() * 10);
}

function subscribeFunction(event ,func) {
    subscribe(event ,func);
};