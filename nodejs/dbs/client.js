#!/usr/bin/env node --harmony

const request = require('request');

const options = {
    method: process.argv[2] || 'GET',
    url: "http://localhost:5984/" + (process.argv[3] || '')
};

request(options, function (err, res, body) {
    if (err) throw new Error(err);

    console.log(res.statusCode, JSON.parse(body));
});
