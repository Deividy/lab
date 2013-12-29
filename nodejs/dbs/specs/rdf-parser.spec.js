'use strict';

const rdfParser = require('../src/rdf-parser.js');

const expectedValue = {
    "_id": "132",
    "title": "The Art of War",
    "authors": [
        "Sunzi (6th cent. BC)",
        "Giles, Lionel"
    ],
    "subjects": [
        "Military art and science -- Early works to 1800",
        "War -- Early works to 1800"
    ]
};

exports.testRDFParser = function (test) {
    rdfParser('./cache/epub/132/pg132.rdf', function (err, book) {
        test.expect(2);
        test.ifError(err);
        test.deepEqual(book, expectedValue, "book should match");
        test.done();
    });
};
