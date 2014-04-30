var express = require('express');
var popular = require('./popular');
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

app.get('/popular', function(req, res){
	popular.getPopularWithCache(function(err, items){
		if(err){return res.send(500, 'algo fallo');}

		res.send(items);
	});
});



app.listen(6789);