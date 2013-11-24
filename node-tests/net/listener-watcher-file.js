"use strict";

const fs = require('fs'),
      net = require('net'),
      filename = process.argv[2];

const server = net.createServer(function(conn) {
    conn.write(JSON.stringify({
        type: 'watching',
        file: filename
    }) + "[$\n$]");

    let watcher = fs.watch(filename, function () {

        conn.write('{ "type": "changed", "file": "' + filename);

        setTimeout(function() {
            conn.write('", "timestamp": ' + Date.now() + ' }[$\n$]');
            setTimeout(function () {
                conn.write('{ "type": "changed", "file": "' + filename);
                setTimeout(function () {
                    conn.write('", "timestamp": ' + Date.now() + ' }[$\n$]');
                }, 2000);
            }, 50);
        }, 100);

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

