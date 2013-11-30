'use strict';

const cluster = require('cluster'),
      fs = require('fs'),
      zmq = require('zmq');

if (cluster.isMaster) {
    let router = zmq.socket('router').bind('tcp://127.0.0.1:6699'),
        dealer = zmq.socket('dealer').bind('ipc://file-dealer.ipc');

    router.on('message', function () {
        let frames = Array.prototype.slice.call(arguments);
        dealer.send(frames);
    });

    dealer.on('message', function () {
        let frames = Array.prototype.slice.call(arguments);
        router.send(frames);
    });

    cluster.on('online', function (worker) {
        console.log("Worker " + worker.process.pid + " up");
    });
    
    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }
}


if (!cluster.isMaster) {
    let res = zmq.socket('rep').connect('ipc://file-dealer.ipc');

    res.on('message', function (data) {
        let req = JSON.parse(data);

        console.log(process.pid + " received req for " + req.filename);

        fs.readFile(req.filename, function (err, data) {
            if (err) throw new Error(err);

            res.send(JSON.stringify({
                pid: process.pid,
                data: data.toString(),
                timestamp: Date.now()
            }));
        });
    });
}
