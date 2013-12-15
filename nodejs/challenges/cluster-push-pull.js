'use strict';

const cluster = require('cluster'),
      zmq = require('zmq');

if (!cluster.isMaster) {
    return;
}

const push = zmq.socket('push').bind('ipc://boss.ipc'),
      pull = zmq.socket('pull').bind('ipc://supervisor.ipc');

let workersReadyCount = 0;

pull.on('message', function (data) {
    let job = JSON.parse(data);

    if (job.isReady) {
        console.log("Worker [" + workersReadyCount + "] # " + job.pid);

        workersReadyCount++;

        if (workersReadyCount === 3) {
            for (let i = 0; i < 30; i++) {
                push.send("Work harder! # " + i);
            }
        }

        return;
    }

    console.log("Worker # " + job.pid)
    console.log(" - To Do: " + job.toDo);
    console.log("");
});

cluster.on('online', function (worker) {
    worker.pull = zmq.socket('pull').connect('ipc://boss.ipc');
    worker.push = zmq.socket('push').connect('ipc://supervisor.ipc');

    worker.pull.on('message', function (data) {

        worker.push.send(JSON.stringify({
            pid: worker.process.pid,
            toDo: data.toString()
        }));

    });
        
    worker.push.send(JSON.stringify({ 
        isReady: true, 
        pid: worker.process.pid 
    }));
});

for (let i = 0; i < 3; i++) {
    cluster.fork();
}

