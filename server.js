var express = require('express');
var techCrunch = require('./techCrunchPopular');
var swig = require('swig');
var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', function (req, res) {
	res.render('home');
});

app.listen(6789);