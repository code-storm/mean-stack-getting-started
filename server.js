var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // for parsing url encoding
app.use(express.static(__dirname + '/public')); // frontend get access to all these static files
app.use('/api',appRoutes);

// before  http://localhost:8080/users
// after http://localhost:8080/api/users

mongoose.connect('mongodb://localhost:27017/tutorial', function(err){
	if(err) {
		console.log("Not connected to DB", err);
	}
	else {
		console.log("Database Successfully connected");
	}
});

app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// app.get('/home',function(req,res){
// 	res.send("Hello I'm Home ");
// });

// route
// app.get('/',function (request, response){
// 	response.send('Hello World 2');
// });

app.listen(port || 8080, function () {
	console.log("Running server at "+ port);
});