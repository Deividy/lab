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

// fun;
var sentinel = new Cell()
var a = new Cell('A');
var b = new Cell('B');
var c = new Cell('C');

sentinel.next = a;
a.next = b;
b.next = c;

iterate(sentinel, function (cell) {
    console.log(cell.value);
});

console.log(find(sentinel, 'C') === c);
console.log(findBefore(sentinel, 'A') === sentinel);

var d = new Cell('D');
addAtBeginning(sentinel, d);

console.log(findBefore(sentinel, 'D') === sentinel);
console.log(findBefore(sentinel, 'A') === d);
