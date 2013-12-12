function Person() {
    this.test = function () {
        console.log('ei');
    }
}

function Deividy () {
    this.test2 = function () {
        console.log('test2');
    }
}

Deividy.prototype = new Person();

p = new Deividy();
p.test();
p.test2();


