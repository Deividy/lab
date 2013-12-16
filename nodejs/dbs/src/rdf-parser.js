'use strict';

const fs = require('fs'),
      cheerio = require('cheerio');

module.exports = function (filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) return callback(err);

        let $ = cheerio.load(data.toString());

        let collect = function (index, el) {
            return $(el).text();
        };

        callback(null, { 
            _id: $('pgterms\\:ebook').attr('rdf:about').replace('') 
        
        });
    });
};
