'use strict';

const cluster = require('cluster');

if (cluster.isMaster) {
    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }
}

cluster.on('online', function (worker) {
    console.log("Worker # " + worker.process.pid + " ready to fight.");
});

cluster.on('exit', function (worker) {
    console.log('');
    console.log("We lost # " + worker.process.pid);
    console.log('');
    console.log("  ` one die, another is born ...`");
    console.log('');

    cluster.fork();
});
