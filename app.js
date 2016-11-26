'use strict';

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	getCompaniesService = require('./services/companies/getCompanies.js'),
	port = process.env.PORT || 7722;

app.set('views', __dirname + '/views');
app.use('/js', express.static(__dirname + '/static/js'));
app.use('/css', express.static(__dirname + '/static/css'));
app.use('/img', express.static(__dirname + '/static/resources/img'));
app.use('/bower',  express.static(__dirname + '/bower_components'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
	res.sendfile('views/index.html');
});

app.get('/companies', function (req, res) {
	getCompaniesService(req, res);
});



app.listen(port, function () {
	console.log('app listening on port ' + port);
});