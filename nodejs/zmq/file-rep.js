'use strict';

const fs = require('fs'),
      zmq = require('zmq');

const rep = zmq.socket('rep');

rep.on('message', function (data) {
    let req = JSON.parse(data);

    console.log('Received request to get: ', req.path);

    fs.readFile(req.filename, function (err, content) {
        if (err) throw new Error(err);

        console.log('Sending response');

        rep.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

rep.bindSync('tcp://127.0.0.1:6699');

console.log("Listening zero m q requests");


process.on('SIGINT', function () {
    console.log("Shutting down...");
    rep.close();
});
