'use strict';

const zmq = require('zmq');

const pull = zmq.socket('pull').connect('tcp://127.0.0.1:6999');

let cont = 0;

pull.on('message', function (data) {
    let job = JSON.parse(data.toString());

    console.log("Job #" + ++cont);
    console.log(job.details);

});
