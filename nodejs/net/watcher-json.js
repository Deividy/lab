'use strict';

const net = require('net'),
      client = net.connect({ port: 5432 });

client.on('data', function (data) {
    let msg = JSON.parse(data);

    if (msg.type === 'watching') {
        console.log("I'm watching you " + msg.file);
    } else if (msg.type === 'changed') {
        let date = new Date(msg.timestamp);
        console.log(msg.file + " changed at " + date);
    } else {
        throw Error("Unknown msg type");
    }

});
