"use strict";

const fs = require('fs'),
      net = require('net'),
      filename = process.argv[2];

const server = net.createServer(function(conn) {
    conn.write(JSON.stringify({
        type: 'watching',
        file: filename
    }));

    let watcher = fs.watch(filename, function () {
        conn.write(JSON.stringify({
            type: 'changed',
            file: filename,
            timestamp: Date.now()
        }));

        conn.on('close', function () {
            console.log("Subscriber disconnected.");
            watcher.close();
        });
    });
});

if (!filename) {
    throw Error("No target");
}

server.listen(5432, function () {
    console.log("Listening...");
});

