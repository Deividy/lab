assert = require('assert');

var Cell = (function () {
    function Cell(value) {
        this.value = value;
        this.next = null;
    }

    return Cell;
}());

var sentinel = new Cell()
var a = new Cell('A');
var b = new Cell('B');
var c = new Cell('C');

sentinel.next = a;
a.next = b;
b.next = c;

var iterate = function (top, fn) {
    while (top.next) {
        fn(top.next);
        top = top.next;
    }
};

iterate(sentinel, function (cell) { console.log(cell.value); });

var find = function (top, target) {
    while (top) {
        if (top.value === target) {
            return top;
        }
        top = top.next;
    }

    throw new Error("Value: '" + target + "' not found");
};

assert.equal(find(sentinel, 'C') === c, true);

var findBefore = function (top, target) {
    while (top.next) {
        if (top.next.value == target) {
            return top;
        }

        top = top.next;
    }

    throw new Error("Value: '" + target + "' not found");
};

assert.equal(findBefore(sentinel, 'A') === sentinel, true);

var addAtBeginning = function (top, newCell) {
    newCell.next = top.next;
    top.next = newCell;
};

var d = new Cell('D');
addAtBeginning(sentinel, d);

assert.equal(findBefore(sentinel, 'D') === sentinel, true);
assert.equal(findBefore(sentinel, 'A') === d, true);

var insert = function (afterMe, newCell) {
    newCell.next = afterMe.next;
    afterMe.next = newCell;
};

var e = new Cell('E');
insert(d, e);

assert.equal(findBefore(sentinel, 'E') === d, true);
assert.equal(findBefore(sentinel, 'A') === e, true);

var deleteAfter = function (afterMe) {
    next = afterMe.next.next;
    delete afterMe.next.value;
    delete afterMe.next;

    afterMe.next = next;
};

deleteAfter(d);
assert.equal(findBefore(sentinel, 'A') === d, true);

var addAtEnd = function (top, newCell) {
    while (top.next) {
        top = top.next;
    }

    top.next = newCell;
    newCell.next = null;
};

var f = new Cell('F');
addAtEnd(sentinel, f);

assert.equal(findBefore(sentinel, 'F') === c, true);
assert.equal(f.next, null);

var destroyList = function (top) {
    cells = [ ];

    while (top) {
        cells.push(top);
        top = top.next;
    }

    for (var i = 0; i < cells.length; i++) {
        delete cells[i].value;
        delete cells[i].next;
    }
};

destroyList(sentinel);
assert.equal(sentinel.value, undefined);
assert.equal(sentinel.next, undefined);
assert.equal(a.value, undefined);
assert.equal(a.next, undefined);


// --- circular tests --- /

var sentinel = new Cell()
var a = new Cell('A');
var b = new Cell('B');
var c = new Cell('C');
var d = new Cell('D');
var e = new Cell('E');
var f = new Cell('F');
var g = new Cell('G');
var h = new Cell('H');
var i = new Cell('I');


addAtEnd(sentinel, a);
addAtEnd(sentinel, b);
addAtEnd(sentinel, c);
addAtEnd(sentinel, d);
addAtEnd(sentinel, e);
addAtEnd(sentinel, f);
addAtEnd(sentinel, g);
addAtEnd(sentinel, h);
addAtEnd(sentinel, i);

i.next = d;

var fixLoopMarkingCells = function (sentinelTop) {
    var hasLoop = false;

    var cell = sentinelTop;
    while (cell.next) {
        if (cell.next.visited) {
            cell.next = null;
            hasLoop = true;
            break;
        };

        cell = cell.next;
        cell.visited = true;
    }

    cell = sentinelTop;
    while (cell.next) {
        delete cell.visited;
        cell = cell.next;
    }

    return hasLoop;
};


assert.equal(fixLoopMarkingCells(sentinel), true);
iterate(sentinel, function (cell) {
    console.log(cell.value);
});

i.next = d;

var fixLoopRetracing = function (sentinelTop) {
    var cell = sentinelTop;
    while (cell.next) {
        var tracer = sentinelTop;
        
        while (tracer !== cell) {
            // this is the start of the loop
            if (tracer.next == cell.next) {
                cell.next = null;
                return true;
            }

            tracer = tracer.next;
        }

        cell = cell.next;
    }

    return false;
};

assert.equal(fixLoopRetracing(sentinel), true);
iterate(sentinel, function (cell) {
    console.log(cell.value);
});


var reverseList = function (sentinelTop) {
    var previousCell = null;
    var currentCell = sentinelTop;

    while (currentCell) {
        var nextCell = currentCell.next;
        currentCell.next = previousCell;

        previousCell = currentCell;
        currentCell = nextCell;
    }

    return previousCell;
};
var hasLoopUsingReverseStrategy = function (sentinelTop) {
    if (!sentinelTop.next) {
        return false;
    }

    var newSentinel = reverseList(sentinelTop);
    reverseList(newSentinel);

    if (newSentinel === sentinelTop) {
        return true;
    }

    return false;
};


assert.equal(hasLoopUsingReverseStrategy(sentinel), false);

iterate(sentinel, function (cell) {
    console.log(cell.value);
});

i.next = d;
assert.equal(hasLoopUsingReverseStrategy(sentinel), true);

var hareAndTortoise = function (sentinelTop) {
    var tortoise = sentinelTop;
    var hare = sentinelTop;

    var hareHasCatchTortoise = false;
    var foundStart = false;
    var foundEnd = false;

    while (!foundEnd) {
        if (!hare.next || !hare.next.next) {
            return false;
        }

        tortoise = tortoise.next;

        if (!hareHasCatchTortoise) {
            hare = hare.next.next;
        } else if (!foundStart) {
            hare = hare.next;
        }

        if (hare === tortoise) {
            if (!hareHasCatchTortoise) {
                hare = sentinelTop;
                hareHasCatchTortoise = true;
            } else {
                foundStart = true;
            }
        }

        if (foundStart && tortoise.next === hare) {
            foundEnd = true;
        }
    }

    tortoise.next = null;
    return true;
};

assert.equal(i.next, d);
assert.equal(hareAndTortoise(sentinel), true);
assert.equal(hasLoopUsingReverseStrategy(sentinel), false);
assert.equal(hareAndTortoise(sentinel), false);
assert.equal(i.next, null);

iterate(sentinel, function (cell) {
    console.log(cell.value);
});
