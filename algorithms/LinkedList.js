assert = require('assert');

function Cell(value) {
    this.value = value;
    this.next = null;
}

function DoublyCell(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}
     
var SingleLinkedList = SL = {
    iterate: function (topCell, iterate) {
        while (topCell.next) {
            fn(topCell.next);
            topCell = topCell.next;
        }
    },

    find: function (topCell, target) {
        while (topCell) {
            if (topCell.value === target) {
                return topCell;
            }
            topCell = topCell.next;
        }

        throw new Error("Value: '" + target + "' not found"); 
    },

    findBefore: function (topCell, target) {
        while (topCell.next) {
            if (topCell.next.value == target) {
                return topCell;
            }

            topCell = topCell.next;
        }

        throw new Error("Value: '" + target + "' not found");     

    },

    addAtBeginning: function (topCell, newCell) {
        newCell.next = topCell.next;
        topCell.next = newCell;
    },

    addAtEnd: function (topCell, newCell) {
        while (topCell.next) {
            topCell = topCell.next;
        }

        topCell.next = newCell;
        newCell.next = null;
    },

    insert: function (afterMe, newCell) {
        newCell.next = afterMe.next;
        afterMe.next = newCell;
    },

    deleteAfter: function (afterMe) {
        next = afterMe.next.next;
        delete afterMe.next.value;
        delete afterMe.next;

        afterMe.next = next; 
    },
    
    destroyList: function (topCell) {
        cells = [ ];

        while (topCell) {
            cells.push(topCell);
            topCell = topCell.next;
        }

        for (var i = 0; i < cells.length; i++) {
            delete cells[i].value;
            delete cells[i].next;
        }        

    },

    reverseList: function (sentinelTop) {
        var previousCell = null;
        var currentCell = sentinelTop;

        while (currentCell) {
            var nextCell = currentCell.next;
            currentCell.next = previousCell;

            previousCell = currentCell;
            currentCell = nextCell;
        }

        return previousCell;
    },

    newCell: function (value) {
        return new Cell(value);
    }
};

SL.fixLoop = {
    markingCells: function (sentinelTop) {
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
    },

    retracing: function (sentinelTop) {
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
    },

    reverse: function (sentinelTop) {
        if (!sentinelTop.next) {
            return false;
        }

        var newSentinel = SL.reverseList(sentinelTop);
        reverseList(newSentinel);

        if (newSentinel === sentinelTop) {
            return true;
        }

        return false; 
    },

    // T = number of steps that pass before the tortoise enters the loop
    // H = the distance from the beginning of the loop to the hare's location 
    //     after T steps
    // L = the number of cells inside the loop
    // 
    // #1 If you move across T cells within the loop, you end up H cells away
    //    from where you started
    //
    // #2 When the hare catches the tortoise, the two animals are H cells 
    //    short of the beinning of the loop
    //
    hareAndTortoise: function (sentinelTop) {
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
    }   
};

var DoublyLinkedList = DL = {
    newCell: function (value) {
        return new DoublyCell(value);
    }
};

module.exports = { Single: SL, Doubly: DL };
