'use strict';

const zmq = require('zmq');

const push = zmq.socket('push').bindSync('tcp://127.0.0.1:6999');

for (let i = 0; i < 169; i++) {
    push.send(JSON.stringify({
        details: "Its all about this job.."
    }));
}
