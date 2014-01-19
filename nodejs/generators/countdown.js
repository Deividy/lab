'use strict';

const countdown = function* (count) {
    while (count > 0) {
        yield count--;
    }
};

const random = Math.ceil(Math.random() * 50);

const counter = countdown(random);

console.log("Radom; " + random);

(function() {
    let item = counter.next();
    while (!item.done) {
        console.log("Count; " + item.value)
        item = counter.next();
    }
}());
