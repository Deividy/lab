var a = { x: 1 }, b = new Object(), c = new Object();
var b.prototype = Object.create(a);
b.prototype.y = 2;

var c = Object.create(b);
c.prototype.x = 5;

var d = Object.create(c);

console.log(d);
