var inherit = Object.create || function(p) {
    if (p == null) throw TypeError();
    
    var t = typeof p;
    if (t !== 'object' && t !== 'function') throw TypeError();
    
    function f() {};
    f.prototype = p;
    return new f();

};

var abstractMethod = function() { throw new Error("Abstract method"); };

function Product(name, value) { 
    this.name = name;
    this.value = value || 0;
}
Product.prototype.prepare = abstractMethod;
Product.prototype.dispatch = function() {
    console.log("Dispatching " + this.name + ", for " + this.value);
};

function Tv() {
    Product.apply(this, arguments);
}
Tv.prototype = inherit(Product.prototype);
Tv.prototype.constructor = Tv;

Tv.prototype.prepare = function() {
    console.log('Send order to tv store');
    console.log('Put TV in a box');
};

function VideoGame() {
    Product.apply(this, arguments);
}
VideoGame.prototype = inherit(Product.prototype);
VideoGame.prototype.constructor = VideoGame;

VideoGame.prototype.prepare = function() {
    console.log('Send order to game store');
    console.log('Ask for new version and games');
    console.log('Send to hack game and buy some pirate');
    console.log('Put all in a box');
};

function Store() {

}
Store.prototype.sell = function(product) {
    if (!product || !product.prepare) throw TypeError();

    product.prepare();
    product.dispatch();
};

// Simple factory
var simpleProduct = function (type, name, value) {
    if (type === 'game') {
        return new VideoGame(name, value);
    }
    if (type === 'tv') {
        return new Tv(name, value);
    }
    throw TypeError();
}

var myStore = new Store();
myStore.sell(simpleProduct('game', 'Doido', 1.5));

console.log(' --- ');

// Factory Method

Store.prototype.productFactory = function (type, name, value) {
     if (type === 'game') {
        return new VideoGame(name, value);
    }
    if (type === 'tv') {
        return new Tv(name, value);
    }
    throw TypeError();   
};

Store.prototype.sellUsingFactory = function(/* type, name value */) {
    var p = this.productFactory.apply(this, arguments);
    p.prepare();
    p.dispatch();
}

myStore.sellUsingFactory('tv', 'Plasma', 250);

console.log(' --- ');

// Abstract Factory

var AbstractFactory = function() {

};

AbstractFactory.prototype.transport = abstractMethod;
AbstractFactory.prototype.box = abstractMethod;
AbstractFactory.prototype.dispatch = function() {
    this.transport();
    this.box();
};

var Dispatch1 = function() { };
Dispatch1.prototype = inherit(AbstractFactory.prototype);
Dispatch1.prototype.transport = function() {
    console.log("Dispatch1 transporting");
};
Dispatch1.prototype.box = function() {
    console.log("Dispatch1 boxing");
};

var Dispatch2 = function() { };
Dispatch2.prototype = inherit(AbstractFactory.prototype);
Dispatch2.prototype.transport = function() {
    console.log("2 transporting");
};
Dispatch2.prototype.box = function() {
    console.log("2 boxing");
};

Product.prototype.dispatcher = abstractMethod;
Product.prototype.dispatch2 = function() {
    this.dispatcher().dispatch();
};

VideoGame.prototype.dispatcher = function() {
    return new Dispatch1();
};
Tv.prototype.dispatcher = function() { 
    return new Dispatch2();
};


Store.prototype.sellAbstract = function(product) {
     if (!product || !product.prepare) throw TypeError();

    product.prepare();
    product.dispatch2();   
};

myStore.sellAbstract(simpleProduct('game', 'Loco!', 5.9));
console.log(' -- ');

myStore.sellAbstract(simpleProduct('tv', 'LEDA!', 169));
console.log(' -- ');
