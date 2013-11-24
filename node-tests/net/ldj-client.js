'use strict';

const EventEmitter = require('events').EventEmitter,
      util = require('util');

const LDJClient = function (stream) {
    EventEmitter.call(this);
    let self = this;

    this.buffer = '';
    this.stream = stream;
    
    stream.on('data', function (data) {
        self.buffer += data;

        while (self.boundary() !== -1) {
            let boundary = self.boundary();

            self.lastInput = self.buffer.substr(0, boundary);
            self.buffer = self.buffer.substr(boundary + 6);

            self.emit('message', JSON.parse(self.lastInput));
        }
    });
};

util.inherits(LDJClient, EventEmitter);

LDJClient.prototype.boundary = function () {
    return this.buffer.indexOf("[$\n$]");
};

exports.connect = function (stream) {
    return new LDJClient(stream);
};
