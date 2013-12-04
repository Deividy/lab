"use strict";

const fs = require('fs'),
      spawn = require('child_process').spawn;

let Watcher = (function() {
    function Watcher() { };

    Watcher.prototype.getFile = function () {
        let filename = this.filename = process.argv[2];
        return filename;
    };

    Watcher.prototype.watch = function() {
        let ls = spawn('ls', [ '-lh', this.filename ]);

        ls.stdout.on('data', function (chunk) {
            console.log(chunk.toString());
        });

        ls.on('close', function () {
            console.log('closed');
        });
    };

    return Watcher;
}());


let w = new Watcher();

fs.watch(w.getFile(), function() {
    w.watch.apply(w, arguments);
});
