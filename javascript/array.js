var a = [1, 2, ,];
console.log(a.length, a, a[2]);

Object.defineProperty(a, "_test", {
    value: null,
    enumerable: false,
    configurable: false,
    writable: true
});

Object.defineProperty(a, "test", {
    set: function (value) {
        this._test = value;
    },
    get: function () {
        return this._test;
    },
    enumerable: true,
    configurable: true
});

a.test = "Testing!";

console.log(a.test);
console.log(a.length);

var b = new Array(1, 2, 3);
b.test = function () {
    console.log(this);
}

b.test();

console.log(b.length);

c = new Array(10);
c.unshift(5);

c.log = function () {
    console.log(this.length);
    console.log(this);
};

c.log()


var table = new Array(10);
for (var i = 0; i < table.length; i++) {
    table[i] = new Array(10);
}

for (var row = 0; row < table.length; row++) {
    for (var col = 0; col < table[row].length; col++) {
        table[row][col] = row*col;
    }
}

console.log(table[5][7])

var a = [1, 2, 3, 4, 5, 6];
console.log(a.splice(4));
console.log(a);
console.log(a.splice(1, 2));
console.log(a);
console.log(a.splice(1, 0, 'a', 'b'));
console.log(a);
console.log(a.splice(1, 1, [1, 2], 3));
console.log(a);
