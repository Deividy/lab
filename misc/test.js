var pg = require('pg'); 
//or native libpq bindings
//var pg = require('pg').native

var conString = "tcp://ekanban:123@localhost/ekanban";

var sqlCreate = "CREATE TABLE article (article_id bigserial primary key, article_name varchar(20) NOT NULL, article_desc text NOT NULL, date_added timestamp default NULL);"
var sqlCreate = "DROP TABLE article";

//note: error handling omitted
var client = new pg.Client(conString);
client.connect(function(err) {
  client.query(sqlCreate, function(err, result) {
      console.log(err, result);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
  })
});

