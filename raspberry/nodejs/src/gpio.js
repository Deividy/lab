'use strict';

// Requires
const fs = require('fs'),
      child_proccess = require('child_process'),
      _ = require('underscore');

const exec = child_process.exec;

// GPIO CONFIG
const gpioPath = "/sys/devices/virtual/gpio";
const gpioAdmin = "gpio-admin";

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

        this.open();
    }

    Gpio.prototype.open = function () {
        const self = this;

        exec(gpioAdmin + '/export' + this.pin, function (err) {
            throwIfError(err);

            self.writeDirection();
        });
    };

    Gpio.prototype.close = function () {
        exec(gpioAdmin + "/unexport" + this.pin, throwIfError);
    };

    Gpio.prototype.writeDirection = function () {
        fs.writeFile(this.file + "/direction", this.direction, throwIfError);
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

        fs.writeFile(this.file + "/value", value.toString(), 'utf8', callback);
    };

    return Gpio;
}());


module.exports = Gpio;
