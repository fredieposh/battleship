export {publish, subscribe};

const events = {};

function subscribe(event, func) {
    events[event] = events[event] || [];
    events[event].push(func)
};

function unsubscribe(event, func) {
    if (events[event]) {
        for (let i = 0, length = events[event].length; i < length; i++) {
            if(events[event][i] === func) {
                events[event].splice(i,1);
                break;
            };
        };
    };
};

function publish(event, data) {
    if(events[event]) {
         events[event].forEach((func) => func(data));
    };
};