var  MongoClient = require('mongodb').MongoClient,
     async = require('async');

var connectionString = 'mongodb://localhost:27017/lab';
var stressCollection = 'stress';

// we need to figure out the max instances of MongoClient our drive can handler
// then we can start to do the stress with the max clients
// you might want to put a higher/lower value here
var maxClients = 20;
var stopIn = 150000;

var numDocs = 100;
var delay = 1000;
var power = 2;

var doublePower = false;

var dbs = [ ];
var lastClientIndex = 0;
var count = 0;

var stress = function() {
    if (count >= stopIn) {
        return;
    }

    getDbClient(doStress);
    count++;
};

var doStress = function (db, index) {
    var tasks = { };

    // I want to test how many requests it can handler by time, so at
    // some point, we'll be inserting thousand of millions of documents, every
    // one in a separated request
    for (var i = 0; i < numDocs; i++) {
        tasks[i] = buildInsertTask(db.collection(stressCollection), index);
    }

    console.log(" - DB " + index + " .parallel()");

    async.parallel(tasks, function (err) {
        if (err) throw new Error(err);

        console.log("  * DB " + index + " # DONE INSERT " + numDocs + " DOCUMENTS! #");

        for (var i = 0; i < power; i++) {
            setTimeout(stress, delay);
        }

        if (doublePower) {
            power++;
        }
    });
};

var buildInsertTask = function(collection, clientIndex) {
    return function(cb) {
        collection.insert({
            clientIndex: clientIndex,
            time: new Date().getTime(), 
            fullDate: new Date(),
            random: Math.random() 
        }, cb);
    };
};

// we need to create a new instance or get one if we reached the max connections
var getDbClient = function(callback) {
    var db = null,
        index = 0;

    // if we hit the max connections we get a an available client db to work
    if (dbs.length > maxClients) {
        index = getAvailableClientIndex();
        db = dbs[index];

        return callback(db, index);  
    };

    // we insert before we connect and then change the dbs[index] to the right
    // db. We do it because this function is called async with a lot of stress
    index = dbs.push(db) - 1;

    MongoClient.connect(connectionString, { url_decode_auth: true }, function(err, db) {
        if (err) {
            console.log(dbs.length);
            throw new Error(err);
        }

        console.log("# " + index + " UP! #");
        dbs[index] = db;

        callback(db, index);
    });
};

var getAvailableClientIndex = function () {
    var index = lastClientIndex + 1,
        db = dbs[index];

    lastClientIndex = index;

    // the db may not be ready, e.g, hit the .push but don't yet set it in
    // .connect()
    if (!db) {
        lastClientIndex = -1;
        return getAvailableClientIndex();
    }

    return index;
};

stress();
