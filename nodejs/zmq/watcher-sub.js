'use strict';

const zmq = require('zmq');

const sub = zmq.socket('sub');

sub.subscribe('');

sub.on('message', function (data) {
    let message = JSON.parse(data);
    let date = new Date(message.timestamp);

    console.log(message.filename + " has changed at " + date);
});

sub.connect('tcp://localhost:6999');
