'use strict';

const zmq = require('zmq'),
      filename = process.argv[2];

const req = zmq.socket('req');

req.on('message', function (data) {
    let res = JSON.parse(data);

    console.log('Received response ', res);
});

req.connect('tcp://localhost:6699');

for (let i = 0; i < 3; i++) {
    console.log('sending request ' + i + ' ' + filename);

    req.send(JSON.stringify({
        filename: filename
    }));
}
