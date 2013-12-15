'use strict';

const fs = require('fs');

fs.watch('../fs/just-a-text.txt');

// if we throw before we bind the uncaughtException of process it will blew up
//throw new Error("Testing Error");

process.on('uncaughtException', function (errorObject) {
    console.log(errorObject);
});

throw new Error("Testing Error");
