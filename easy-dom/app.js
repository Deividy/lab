var express = require('express'),
    app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views');
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.static('public/'))
console.log('Express server listening on port 5000');

app.listen(5000);
app.get("/", function (req, res) {
    res.render('index');
});
