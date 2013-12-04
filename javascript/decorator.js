var Beverage = (function() {
    function Beverage() { }

    Beverage.prototype.cost = function () { return 0; };

    return Beverage;

}());

var DarkRoast = (function() {
    function DarkRoast() {
        this.name = 'Dark roast';
    }
    
    DarkRoast.prototype = Object.create(Beverage.prototype)
    DarkRoast.prototype.constructor = DarkRoast;
    
    DarkRoast.prototype.cost = function() { return 1.5; };
    return DarkRoast;
}());

var Mocha = (function() {
    function Mocha(beverage) {
        this.beverage = beverage;
        this.name = this.beverage.name + " with Mocha";
    }

    Mocha.prototype.cost = function() {
        return 0.5 + this.beverage.cost();
    };

    return Mocha;
}());

var Order = (function() {
    function Order() { 
        this.orders = [ ];
    };
    
    Order.prototype.add = function(order) {
        this.orders.push(order);
    }
    
    Order.prototype.cost = function() {
        for(var i = 0; i < this.orders.length;i++) {
            console.log(this.orders[i].name + " $" + this.orders[i].cost());
        }
    }
    return Order;

}());

// Factory
DarkRoast.withDoubleMocha = function() {
    return new Mocha(new Mocha(new DarkRoast()));
}

var order = new Order();
var darkRoast = new Mocha(new DarkRoast());
order.add(darkRoast);
order.add(DarkRoast.withDoubleMocha());
order.cost();

var order = new DarkRoast();
order = new Mocha(order);
order = new Mocha(order);

console.log(order.cost());
