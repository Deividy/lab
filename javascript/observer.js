/*
 * Observer Pattern + Class Inherit + Factory Method
 */

var O = (function() {

    // Interfaces
    var Subject = (function() {

        function Subject() { 
            this._observers = [ ];
            this.value = "Hey";
            sayHi();
        }
        
        // Private
        var sayHi = function() {
            console.log("Hi world!");
        }

        Subject.prototype.register = function(observer) {
            if (!observer.update || !observer.name) {
                throw new Error("You should implement the Observer Interface (.name and .update())");
            }

            this._observers.push(observer);
        };

        Subject.prototype.unregister = function(name) {
            for (var i = 0; i < this._observers.length; i++) {
                if (this._observers[i].name == name) {
                    return this._observers.splice(i, 1);
                }
            }
            throw new Error("Observer " + name + " not found");
        }
        
        Subject.prototype.notifyAll = function() {
            if (this._observers.length === 0) {
                console.log("[" + this.name  + "] Oops... No one to notify");
                return;
            }

            console.log("[" + this.name + "] Start notify ... ");

            for (var i = 0; i < this._observers.length; i++) {
                this._observers[i].update(this);
            }
            return true;
        }

        return Subject;
    }());

    var Observer = (function() {
        function Observer() { }

        Observer.prototype.update = function(object) {
            throw new Error("You should implement your own update \n " + this.toString());
        };

        return Observer;

    }());
    
    // Interfaces implementation
    function MySubject(name) { 
        // constructor chain
        Subject.call(this); 
        this.name = name || "John Doe"; 
    }
    MySubject.prototype = Object.create(Subject.prototype);
    MySubject.prototype.constructor = MySubject;

    MySubject.prototype.register = function (observer) {
        Subject.prototype.register.call(this, observer);

        console.log("Registering in [" + this.name + "] : " + observer.name);
    }
    
    MySubject.prototype.unregister = function(name) {
        Subject.prototype.unregister.call(this, name);

        console.log("Bye (" + name + ")");
    };


    function MyObserver(name) { 
        this.name = name || "Anonymous";
    };
    MyObserver.prototype = Object.create(Observer.prototype);
    MyObserver.prototype.constructor = MyObserver;
    
    MyObserver.prototype.update = function(object) {
        console.log("(" + this.name + ") Updating... " + object.value);
    };

    // just fun
    console.log("--");
    b = new MySubject();
    console.log(b instanceof Subject);              // => true
    console.log(b.constructor === MySubject);       // => true
    console.log(b.constructor == Subject);          // => false

    console.log(b.constructor);                     // => [Function: MySubject]
    console.log(b.constructor.name);                // => MySubject
    console.log('--');

    // Expose factory methods
    return { 
        newObserver: function(name) { return new MyObserver(name); },
        newSubject: function(name) { return new MySubject(name); }
    };

}).call(this);

// console.log(MySubject);          // => ReferenceError;

(function() {

    var s = O.newSubject("First subject");
    var o = O.newObserver("First observer");

    s.register(o);
    s.register(O.newObserver("Second observer"));

    console.log(" ");

    s.value = "Eh nois";
    s.notifyAll();

    s.unregister("Second observer");

    console.log(" ");
    s.value = "Notify it!";
    s.notifyAll();

    s.unregister("First observer");
    s.value = "New one";
    s.notifyAll();

    console.log(" ");

    var newSub = O.newSubject();
    newSub.register(O.newObserver("Yey"));
    newSub.notifyAll();

}());
