var util = require('util');

function MonsterArray () {
    Array.call(this);
}

util.inherits(MonsterArray, Array);

MonsterArray.prototype.randomArray = function (maxValues) {
    for (var i = 0; i < maxValues; i++) {
        this.push({ id: Math.floor(Math.random() * maxValues) });
    }

    this.sort(function (a, b) { return a.id - b.id; });
};

// bitwise left/right shift means move the bits (0/1) to the left/right
// bitwise left shift << 2^N   * and drop the remain
// bitwise right shift >> 2^N  / and drop the remain
// bitwise logical right shift >>> 2^N  / and drop the remain (the difference is with negative numbers)

MonsterArray.prototype.binarySearch = function (searchValue) {
    var lowIndex = 0;
    var highIndex = this.length - 1;

    while (lowIndex <= highIndex) {
        var middleIndex = (lowIndex + highIndex) >> 1;

        if (this[middleIndex].id < searchValue) {
            lowIndex  = middleIndex + 1;
            continue;
        }

        if (this[middleIndex].id > searchValue) {
            highIndex = middleIndex - 1;
            continue;
        }

        return middleIndex;
    }


    return false;
};

MonsterArray.prototype.linearSearch = function (searchValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i].id === searchValue) {
            return i;
        }
    }
    return false;
};


var a = new MonsterArray();
a.randomArray(2000000);

console.log('array done');

var search = function (method, value) {
    console.log('');
    var startTime = new Date().getTime();
    var idx = a[method](value);

    console.log("search for " + value + " time: " + (new Date(startTime - new Date().getTime()).getMilliseconds()) + "ms");

    if (idx === false) {
        console.log("Not found for " + value);
        return;
    }

    console.log("Found at position " + idx);
    console.log(a[idx]);

    return idx;
};
var bs = function(value) { return search('binarySearch', value); };
var ls = function(value) { return search('linearSearch', value); };

var b = function() {
    bs(1);
    bs(1000);
    bs(500);
    bs(350);
    ls(1350);
    ls(6350);
    ls(9350);
    ls(19350);
    ls(119350);
    ls(1119350);
    ls(1919350);
}

var l = function() {
    ls(1);
    ls(1000);
    ls(500);
    ls(350);
    ls(1350);
    ls(6350);
    ls(9350);
    ls(19350);
    ls(119350);
    ls(1119350);
    ls(1919350);
}


console.log("\n --- \n");

console.log("binary search");
b();

console.log("\n --- \n");

console.log("linear search");
l();
