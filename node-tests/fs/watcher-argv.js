const fs = require('fs'),
      filename = process.argv[2];

if (!filename) {
    throw Error("I need something to watch...");
}

fs.watch(filename, function() {
    console.log("I'm " + filename + " just changed!");
});

console.log("Now watching " + filename);
