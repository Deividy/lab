'use strict';

// Requires
const fs = require('fs'),
      _ = require('underscore');

// GPIO CONFIG
const gpioPath = "/sys/class/gpio";

const gpioToPin = {
    0: 3,   // SDA
    2: 4,   // SDA

    3: 6,   // SCL
    1: 5,   // SCL

    4: 7,   // GPCLK0

    10: 19, // MOSI

    9: 21,  // MISO
    11: 23, // SCLK

    8: 24,  // CE0
    7: 25,  // CE1

    14: 8,  // TXD
    15: 10, // RXD

    18: 12, //  PCM_CLK

    23: 16,
    24: 18,
    25: 22
};

// Demands
const demandGPIO = function (gpio) {
    if (!gpioToPin[gpio]) {
        throw new Error("Invalid GPIO " + gpio);
    }
};

const demandDirection = function (direction) {
    if (direction !== 'in' && direction !== 'out') {
        throw new Error("Invalid Direction " + direction);
    }
};

const demandValue = function (value) {
    if (value != '1' && value != '0') {
        throw new Error("Value " + value + " is not a valid value!");
    }
};

const demandCallback = function (callback) {
    if (!_.isFunction(callback)) {
        throw new Error("Invalid callback");
    }

};

const throwIfError = function (err) {
    if (err) throw new Error(err);
}

var Gpio = (function () {
    function Gpio(gpio, direction) {
        demandGPIO(gpio);
        demandDirection(direction);

        this.gpio = gpio;
        this.direction = direction;

        this.pin = gpioToPin[gpio];
        this.file = gpioPath + "/gpio" + this.pin;
    }

    Gpio.prototype.open = function (callback) {
        const self = this;

        fs.writeFile(gpioPath + '/export', this.pin, function (err) {
	    if (err) return callback(err);

            self.writeDirection(callback);
        });
    };

    Gpio.prototype.close = function (callback) {
        fs.writeFile(gpioPath + "/unexport", this.pin, callback);
    };

    Gpio.prototype.writeDirection = function (callback) {
        fs.writeFile(this.file + "/direction", this.direction, callback);
    };

    Gpio.prototype.readDirection = function (callback) {
        demandCallback(callback);

        fs.readFile(this.file + "/direction", 'utf8', callback);
    };

    Gpio.prototype.read = function (callback) {
        demandCallback(callback);

        fs.readFile(this.file + "/value", callback);
    };

    Gpio.prototype.write = function (value, callback) {
        demandValue(value);
        demandCallback(callback);

        fs.writeFile(this.file + "/value", value, callback);
    };

    return Gpio;
}());


module.exports = Gpio;

let gp = new Gpio(24, 'out');
gp.close(function(err, res) {
	console.log(err);
	console.log(res);
	gp.open(function(err, res) {
		console.log(err);
		console.log(res);
		gp.write(1, function (err, res) {
			console.log(err);
			console.log(res);

			while (true) {
	
			}
		});	

	});
});

