{ 
    var x = 10, y = 12;
    function fn (v) {
        --y;
        return ++v;
    }

    fn(x);
    console.log(x, y);
    fn(y);
    console.log(x, y);
    console.log(fn(x), fn(y));

    console.log(x, y);
}
console.log(x, y);

function Person(name) { 
    this.name = name;    
}
Person.prototype = {
    isMe: function () {
        return this.name == 'Deividy';
    }
}
Person.prototype.toString = function() {
    return "Noo!";
}

p = new Person('John');
console.log(p instanceof Person);                                // => true
console.log(p.constructor === Person);                           // => false
console.log(p.constructor.prototype === Person.prototype)        // => false
console.log(p.prototype === Person)                              // => false
console.log(p.prototype === Person.prototype)                    // => false
console.log(p.__proto__ === Person)                              // => ralse

function Store() {
    this.stores = [ ];
}

Store.prototype.test = function() {
    console.log(this.stores[0]);
};

function PizzaStore() { 
    Store.call(this);
}

PizzaStore.prototype = Object.create(Store.prototype);

a = new PizzaStore();
a.stores.push(5);
a.test();

Store.prototype.test2 = function() {
    this.stores.push("Pow");
    console.log(this.stores[1]);
}

a.test2()
