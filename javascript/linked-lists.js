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
    newCell.next = null;
};

var insert = function (afterMe, newCell) {
    newCell.next = afterMe.next;
    afterMe.next = newCell;
};

var deleteAfter = function (afterMe) {
    next = afterMe.next.next;
    delete afterMe.next.value;
    delete afterMe.next;

    afterMe.next = next;
};

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

var f = new Cell('F');
addAtEnd(sentinel, f);

assert.equal(findBefore(sentinel, 'F') === c, true);
assert.equal(f.next, null);

destroyList(sentinel);
assert.equal(sentinel.value, undefined);
assert.equal(sentinel.next, undefined);
assert.equal(a.value, undefined);
assert.equal(a.next, undefined);


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

// circular
i.next = d;

// --------------- //

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
i.next = d;
assert.equal(hasLoopUsingReverseStrategy(sentinel), true);

var hareAndTortoise = function (sentinelTop) {
    var tortoise = sentinelTop;
    var hare = sentinelTop;

    var catches = 0;

    while (catches !== 3) {
        if (!hare.next || !hare.next.next) {
            return false;
        }

        tortoise = tortoise.next;
        if (catches === 0) {
            hare = hare.next.next;
        } else if (catches === 1) {
            hare = hare.next;
        }

        if (hare === tortoise) {
            if (catches === 0) {
                hare = sentinelTop;
                catches = 1;
            } else {
                catches = 2;
            }
        }

        if (tortoise.next === hare && catches === 2) {
            catches = 3;
        }
    }

    console.log('');
    console.log('tortoise (end loop):');
    console.log(tortoise);
    console.log('hare (start loop):');
    console.log(hare);

    tortoise.next = null;
    return true;
};

assert.equal(hareAndTortoise(sentinel), true);
assert.equal(hasLoopUsingReverseStrategy(sentinel), false);


