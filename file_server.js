var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var request = require('request');
var https = require("https");

app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.urlencoded());

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log('Server started at ' + new Date() + ', on port ' + port + '!');
});


//////////////////////////////////////////////////////////////////////////////////////
///////////////////////GET request handling (largely uncommented)/////////////////////
//////////////////////////////////////////////////////////////////////////////////////

app.get('/', function (request, response) {
		response.render('index');
});

app.get('/resume', function (request, response) {
		response.sendFile(__dirname + "/public/pdf/charley_cunningham_resume.pdf");
});

app.get('/transcript', function (request, response) {
		response.sendFile(__dirname + "/public/pdf/charley_cunningham_transcript.pdf");
});

app.get('/orchard_pipeline', function (request, response) {
		response.render('project_orchard_pipeline.ejs');
});

app.get('/penn_course_alert', function (request, response) {
		response.render('project_penn_course_alert.ejs');
});

app.get('/penn_course_plan', function (request, response) {
		response.render('project_penn_course_plan.ejs');
});

app.get('/pcx_auto_docs', function (request, response) {
		response.render('project_pcx_auto_docs.ejs');
});

app.get('/wmc', function (request, response) {
		response.render('project_wmc.ejs');
});

app.get('/pbr', function (request, response) {
		response.render('project_pbr.ejs');
});

app.get('/house_valuation_api', function (request, response) {
		response.render('project_house_valuation_api.ejs');
});

app.get('/train_rescheduling', function (request, response) {
		response.render('project_train_rescheduling.ejs');
});


setInterval(function() {
		https.get("https://www.charleycunningham.com/");
}, 300000); // keeps Heroku website awake
