var assert = require('assert');

Object.defineProperty(Array.prototype, 'minimum', {
    get: function () {
        var minimum = null;

        this.forEach(function (item) {
            if (minimum === null || item < minimum) {
                minimum = item;
            }
        });

        return minimum;
    }
});


Object.defineProperty(Array.prototype, 'maximum', {
    get: function () {
        var maximum = null;

        this.forEach(function (item) {
            if (maximum === null || item > maximum) {
                maximum = item;
            }
        });

        return maximum;
    }
});

assert.equal([ 5, 10, 200, 1, 3, 0 ].minimum, 0);
assert.equal([ 5, 10, 200, 1, 3, 0 ].maximum, 200);
