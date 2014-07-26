assert = require('assert');

var Cell = (function () {
    function Cell(value) {
        this.value = value;
        this.next = null;
    }

    return Cell;
}());

var iterate = function (top, fn) {
    while (top.next) {
        fn(top.next);
        top = top.next;
    }
};

var find = function (top, target) {
    while (top) {
        if (top.value === target) {
            return top;
        }
        top = top.next;
    }

    throw new Error("Value: '" + target + "' not found");
};

var findBefore = function (top, target) {
    while (top.next) {
        if (top.next.value == target) {
            return top;
        }

        top = top.next;
    }

    throw new Error("Value: '" + target + "' not found");
};

var addAtBeginning = function (top, newCell) {
    newCell.next = top.next;
    top.next = newCell;
};

var addAtEnd = function (top, newCell) {
    while (top.next) {
        top = top.next;
    }

    top.next = newCell;
    newCell.next = top;
};

var insert = function (afterMe, newCell) {
    newCell.next = afterMe.next;
    afterMe.next = newCell;
};

var deleteAfter = function (afterMe) {
    afterMe.next = afterMe.next.next;
};

// fun;
var sentinel = new Cell()
var a = new Cell('A');
var b = new Cell('B');
var c = new Cell('C');

sentinel.next = a;
a.next = b;
b.next = c;

iterate(sentinel, function (cell) { console.log(cell.value); });

assert.equal(find(sentinel, 'C') === c, true);
assert.equal(findBefore(sentinel, 'A') === sentinel, true);

var d = new Cell('D');
addAtBeginning(sentinel, d);

assert.equal(findBefore(sentinel, 'D') === sentinel, true);
assert.equal(findBefore(sentinel, 'A') === d, true);

var e = new Cell('E');
insert(d, e);

assert.equal(findBefore(sentinel, 'E') === d, true);
assert.equal(findBefore(sentinel, 'A') === e, true);
deleteAfter(d);

assert.equal(findBefore(sentinel, 'A') === d, true);

