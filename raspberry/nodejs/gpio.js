'use strict';

const fs = require('fs'),
      child_proccess = require('child_process');

const exec = child_process.exec;

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

const demandGPIO = function (gpio) {
    if (!gpioToPin[gpio]) {
        throw new Error("Invalid GPIO " + gpio);
    }
};

const demandDirection = function (direction) {
    if (direction != 'in' && direction != 'out') {
        throw new Error("Invalid Direction " + direction);
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
        fs.readFile(this.file, 'utf8', callback);
    };

    return Gpio;
}());

