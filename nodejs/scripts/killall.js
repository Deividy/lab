#!/usr/bin/env node --harmony

"use strict";

const spawn = require('child_process').spawn,
      ps = spawn('ps', [ '-ax' ]);

ps.stdout.on('data', function (chunk) {
    let cmds = chunk.toString().split('\n');

    cmds.forEach(function(p) {
        let s = p.split(/\s+/),
            pid = s[1],
            cmd = s.splice(4).join(' '),
            rgx = new RegExp(process.argv[2], 'gi');

        if (cmd.match(rgx) && !cmd.match(/killall.js/)) {
            spawn('kill', [ '-9', pid ]);
        }
    });
});

