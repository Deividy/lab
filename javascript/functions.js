// as statement
function square (x) {
    console.log('hey');
    return x * x;
}
console.log(square(2));

// as expression
var square = function (x) {
    console.log('ei');
    return x * x;
}
var tenSquared = (function (x) { 
    return x * x; 
}(10));

console.log(square(3));

// as expression we can name it to
var fn = function sq(x) {
    if (x <= 0) return sq(1);
    return x++;
}

console.log(fn(0));

(function () { 
    //console.log(this);
}());

function o () {
    function b() {
        function c () {
            console.log(this);      // => inside c()
        }
        console.log(this);          // => global
        c();
    }
    new b();
}
o();

var b = function () {
    return (function () {
        console.log(this);
    }())
}
//b()();
//c = new b();

var c = {
    b: function () {
        console.log(this);
    }
}
c.b();
ad = new c.b();

function factorial(n) {
    if (isFinite(n) && n > 0 && n == Math.round(n)) {
        if (!(n in factorial)) {
            factorial[n] = n * factorial(n - 1);
        }
        return factorial[n];
    } else {
        return NaN;
    }
}

factorial[1] = 1;

console.log(factorial(10));
console.log(factorial);


var extend = (function () {
    for (var p in { toString: null }) {
        return function extend(o) {
            for (var i = 1; i < arguments.length; i ++) {
                var source = arguments[i];
                for (var prop in source) {
                    o[prop] = source[prop];
                }
            }
            return o;
        };
    }

    return function patched_extend(o) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var prop in source) {
                o[prop] = source[prop];
            }

            for (var j = 0; j < protoprops.length; j++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) {
                    o[prop] = source[prop];
                }
            }
        }
        return o;
    };

    var protoprops = [ "toString", "valueOf", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString" ];
    
}());

var a = { x: 1 };
extend(a, { y: 2 }, { z: 3 });
console.log(a);

var scope = "global scope"
function checkScope() {
    var scope = "local scope";
    function f () {
        return scope;
    }
    return f;
}
console.log(checkScope()());

var test = (function () {
    var scope = "Test";
    function test() {
        return scope;
    }
    return test;
} ());

console.log(test());

function counter (n) {
    return {
        get count() { 
            return n++; 
        },
        set count(newValue) {
            if (newValue >= n) {
                n = newValue;
            } else {
                throw Error("count can only be st to a larger value");
            }
        }
    }
}

var c = counter(5);
console.log(c.count);
console.log(c.count);
c.count = 2000;
console.log(c.count);
//c.count = 2000;

function addPrivateProperty(o, name, predicate) {
    var value;

    o["get" + name] = function () { 
        return value; 
    };

    o["set" + name] = function (v) {
        if (predicate && !predicate(v)) {
            throw Error("set" + name + ": invalid value " + v);
        }
        value = v;
    };
}

var o = { };
addPrivateProperty(o, 'Name', function (v) {
    return typeof v == "string"; 
});

addPrivateProperty(o, 'LastName', function (v) {
    return typeof v == "string"; 
});


o.setName('Deividy');
o.setLastName('Metheler');
console.log(o.getName() + " " + o.getLastName());         // => Deividy Metheler
//o.setName(o);                                           // => throw error

var Test = (function () {
    function Test() {
        console.log('eei');
    }
    
    return Test;
}());

Test.prototype.tests = function () {
    console.log('hey');
};

o = new Test();
o.tests();
