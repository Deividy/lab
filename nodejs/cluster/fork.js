'use strict';

const cluster = require('cluster');

if (cluster.isMaster) {
    console.log("Im master!");

    for (let i = 0; i < 10; i++) {
        cluster.fork();
    }
} else {
    console.log("Im not master");
}

cluster.on('online', function (worker) {
    console.log("Worker " + worker.process.pid + " up");
});

cluster.on('exit', function (worker, code, signal) {
    console.log("Worker down: " + worker.process.pid);
    console.log("Code: " + code);
    console.log("Signal: " + signal);
});
