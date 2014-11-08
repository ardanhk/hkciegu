var express = require('express'),
bodyParser = require('body-parser'),
path = require('path'),
passport = require('passport'),
LocalStrategy = require('passport-local');

var app = express();
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy( function(username, password, done) {
	console.log("Username: " + username + " Password: " + password)
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

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function (error, user, info) {
		if (error) {
			console.log(error);
			return res.redirect('/login.html');
		}
		if (!user) {
			console.log("User is null");
			return res.redirect('/login.html');
		}
		return res.redirect('/admin');
	})(req, res, next);
});

app.all('/admin/*', function(req, res, next) {
	if (req.isAuthenticated()) {
		console.log('next()');
		next();
	} else {
		console.log('redirect to login');
		res.redirect('/login.html');
	}
});

app.use('/admin', express.static(path.join(__dirname, 'admin')));



app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080);

/*
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
})
*/