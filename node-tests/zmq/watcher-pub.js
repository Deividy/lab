'use strict';

const fs = require('fs'),
      zmq = require('zmq');

const pub = zmq.socket('pub');
const filename = process.argv[2];

fs.watch(filename, function () {

    pub.send(JSON.stringify({
        type: 'changed',
        filename: filename,
        timestamp: Date.now()
    }));

});

pub.bindSync('tcp://*:6999');

console.log("I can hear you..");
