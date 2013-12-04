'use strict';

const net = require('net'),
      ldj = require('./ldj-client');

const netClient = net.connect({ port: 5432 }),
      ldjClient = ldj.connect(netClient);

ldjClient.on('message', function (msg) {

    if (msg.type === 'watching') {
        console.log("I'm watching you " + msg.file);
    } else if (msg.type === 'changed') {
        let date = new Date(msg.timestamp);
        console.log(msg.file + " changed at " + date);
    } else {
        throw Error("Unknown msg type");
    }

});
