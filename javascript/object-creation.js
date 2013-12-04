var a = { };
var b = new Object();
var c = Object.create(Object.prototype);

var d = Object.create(c, { 
    _y: {
        value: 0,
        enumerable: false,
        configurable: false,
        writable: true
    },
    y: { 
        set: function (value) {
            this._y = value;
        },
        get: function () {
            return this._y;    
        },
        enumerable: true,
        configurable: true
    },
    test: {
        value: function (o) {
            console.log(o);
        },
        enumerable: false,
        configurable: false
    }
});

var o = Object.create(d);

console.log(o.y);
o.y = 5;
console.log(o.y);
o.test({ ei: 'test' });
