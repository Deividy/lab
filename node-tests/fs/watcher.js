const fs = require('fs');

fs.watch('just-a-text.txt', function () {
    console.log("File just-a-text.txt just changed!");
});

console.log("I'm in!");

for (var i = 0; i < 100000000; i++) {
    (function(i) {
        var anotherI = i;
        anotherI++;
    }(i));
}

console.log("Now wtaching just-a-text.txt for changes");
