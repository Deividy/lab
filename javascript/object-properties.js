var o = {
    x: 1.0,
    y: 1.0,

    get r() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    set r(newValue) {
        var oldValue = this.r;
        var ratio = newValue/oldValue;
        this.x *= ratio;
        this.y *= ratio;
    },
    get theta() {
        return Math.atan2(this.y, this.x);
    }
}

console.log(o.x, o.y, o.r, o.theta);
o.r = 6;
console.log(o.x, o.y, o.r, o.theta);
o.x = 2.0, o.y = 2.5;
console.log(o.x, o.y, o.r, o.theta);

var person = {
    _name: null,
    _age: null,

    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    },
    get type() {
        return 'Person';
    },
    set age(value) {
        this._age = value;
    }
}

console.log(person);

Object.defineProperties(person, {
    _name: {
        configurable: false,
        enumerable: false
     },
    _age: {
        configurable: false,
        enumerable: false
    }
});

console.log(person);
console.log(person.name);
person.name = 'Old ladie';
console.log(person.name);
console.log(person.type);
person.type = 'Other';
console.log(person.type);       // => 'Person': read-only
person.age = 59;
console.log(person.age);        // => undefined: set-only, never ask a woman her age
console.log(person._age);       // => 59: sorry!

var o = Object.defineProperties({ }, {
    x: { 
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true
    },
    y: {
        value: 2,
        writable: false,
        enumerable: false,
        configurable: false
    },
    r: {
        get: function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        enumerable: false,
        configurable: true
    }
});

o.x = 10, o.y = 5;
console.log(o.x, o.y);
console.log(o.r);
