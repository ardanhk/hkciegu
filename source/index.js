var express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local'),
flash = require('connect-flash'),
mongoose = require('mongoose'),
User = require('./models/User');

// Mongoose Configuration
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection Established.");
});

// Express Configuration
var app = express();
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret: 'vantis', cookie: { maxAge: 100000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy( function(candidateName, password, done) {
	// To-do the login logic
	User.findOne({username: candidateName}, function(err, user) {
		if (err) done(err);
		if (user) {
			user.comparePassword(password, function(err, isMatch) {
				if (err) done(err);
				if (isMatch) done(null, user);
				else done(null, false, 'Username or password not match.');
			});
		} else done(null, false, 'Username or password not match.');
	});
}));

passport.serializeUser(function(user, done) {
	console.log("Serialize User: " + user);
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("Deserialize User: " + id);
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.get('/login', function(req, res, next) {
	res.render('login', {message: req.flash('error')});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/admin', failureRedirect: '/login', failureFlash: true }));

app.all('/admin/*', function(req, res, next) {
	if (!req.user) {
		return res.redirect('/login');
	}
	next();
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);

/*
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
})
*/