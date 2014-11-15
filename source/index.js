var express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
session = require('express-session'),
passport = require('passport'),
LocalStrategy = require('passport-local');

// Express Configuration
var app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret: 'keyboard cat', cookie: { maxAge: 100000 }}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( function(username, password, done) {
	console.log("Username: " + username + " Password: " + password);

	// To-do the login logic


	if (username == "test" && password == "test") {
		done(null, {username: "test"});
	} else {
		return done("{message: 'Incorrect username.'}");
	}
}));

passport.serializeUser(function(user, done) {
	console.log("Serialize User: " + user);
  	done(null, user);
});

passport.deserializeUser(function(user, done) {
	console.log("Deserialize User: " + user);
  	done(null, user);
});

app.get('/login', function(req, res, next) {
	res.sendfile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local', {
	successRedirect:'/admin',
	failureRedirect:'/login'
}));

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