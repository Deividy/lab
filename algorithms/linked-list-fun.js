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

// T = number of steps that pass before the tortoise enters the loop
// H = the distance from the beginning of the loop to the hare's location after T steps
// L = the number of cells inside the loop
// 
// #1 If you move across T cells within the loop, you end up H cells away from where you started
// #2 When the hare catches the tortoise, the two animals are H cells short of the beinning of the loop
var hareAndTortoise = function (sentinelTop) {
    var tortoise = sentinelTop;
    var hare = sentinelTop;

    var hareHasCatchTortoise = false;
    var hareIsAtStart = false;

    while (hare.next) {
        if (!hare.next.next) {
            return false;
        }

        tortoise = tortoise.next;

        // if the hare is at start of the loop we dont want to walk with more
        if (!hareIsAtStart) {
            if (hareHasCatchTortoise) {
                hare = hare.next;
            } else {
                hare = hare.next.next;
            }
        }

        // hare catch tortoise
        if (hare === tortoise) {
            if (!hareHasCatchTortoise) {
                hare = sentinelTop;
                hareHasCatchTortoise = true;
                continue;
            }

            hareIsAtStart = true;
        }

        if (hareIsAtStart && tortoise.next === hare) {
            // at that point tortoise is at the end of loop and hare
            // is at start of the loop, so we can break it
            break;
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


var DoublyCell = (function () {
    function DoublyCell (value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }

    return DoublyCell;
}());

var topSentinel = new DoublyCell();
var bottomSentinel = new DoublyCell();

var insert = function (afterMe, newCell) {
    newCell.next = afterMe.next;
    afterMe.next = newCell;

    newCell.next.prev = newCell;
    newCell.prev = afterMe;
};

topSentinel.next = bottomSentinel;
bottomSentinel.prev = topSentinel;

var a = new DoublyCell('A');
var b = new DoublyCell('B');

insert(topSentinel, a);
insert(a, b);
assert.equal(topSentinel.next, a);
assert.equal(bottomSentinel.prev, b);
