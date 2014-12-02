var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    routes = require('./routes/index'),
    apiRoutes = require('./routes/api'),
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({secret: 'vantis', cookie: { maxAge: 60 * 10000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Passport Logics
passport.use(new LocalStrategy( function(candidateName, password, done) {
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
// Passport Logics END

// Testing only
var user = new User();
user.username = 'admin';
user.password = 'password';
user.save();
// Testing only END

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use('/api', apiRoutes);

app.all('/admin/*', function(req, res, next) {
    if (!req.user) {
        return res.redirect('/login.html');
    }
    next();
});
app.use('/admin', express.static(path.join(__dirname, 'admin')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.post('/login', passport.authenticate('local', { successRedirect: '/admin', failureRedirect: '/login.html', failureFlash: true }));

var server = app.listen(app.get('port'), function() {
	console.log('Server listening on port ' + server.address().port);
});