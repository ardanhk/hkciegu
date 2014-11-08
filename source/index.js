var express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
CollectionDriver = require('./collectionDriver').CollectionDriver;

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

var mongoHost = 'localHost';
var mongoPort = 27017;
var collectionDriver;

MongoClient.connect('mongodb://localhost/hkciegu', function(error, db) {
	if (error) {
		console.error("Error! Exiting... Must start MongoDB first");
		process.exit(1);
	}
	console.log("Successfully connected to the database");
	collectionDriver = new CollectionDriver(db);
	//db.close();
});

app.all('/admin/*', function(req, res, next) {
	
	next();
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));



app.use(express.static(path.join(__dirname, 'public')));