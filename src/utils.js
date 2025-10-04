export {copyObj};


function copyObj(obj) {
    const objCopy = {};
    Object.entries(obj).forEach(([key, value]) => objCopy[key] = value);
    return objCopy;
}