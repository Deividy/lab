#!/usr/bin/env node --harmony

const fs = require('fs');
fs.createReadStream(process.argv[2]).pipe(process.stdout);
