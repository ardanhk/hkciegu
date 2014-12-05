var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash'),
    mongoose = require('mongoose'),
    config = require('./config'),
    routes = require('./routes/index'),
    apiRoutes = require('./routes/api'),
    User = require('./models/User'),
    Organization = require('./models/Organization');

config.options.server.socketOptions = config.options.replset.socketOptions = { keepAlive: 1 };

var connectWithRetry = function () {
    return mongoose.connect(config.MONGODB_URL, config.options, function (err) {
        if (err) {
            console.error('Failed to connect to mongoDB, will retry in ' + config.RETRY_INTERVAL/1000.0 + ' sec(s): ', err);
            setTimeout(connectWithRetry, config.RETRY_INTERVAL);
        }
    });
}
connectWithRetry();
var db = mongoose.connection;
db.once('open', function callback() {
    console.log("MongoDB Connection Established.");
});
db.on('connected', function () {
    console.log("MongoDB Connected.");
});
db.on('error', function (err) {
    console.error("MongoDB Connection Error: " + err);
});

// Express Configuration
var app = express();
app.set('port', process.env.PORT || config.PORT);

app.enable("jsonp callback");
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

/*
var organization = new Organization();
organization.name = '香港建造業總工會';
organization.order = 1;
organization.logo = '/img/navbar-logo.png';
organization.slides.push({image: '/img/slideshow/1.jpg', caption: '爭取權益，團結友愛！'});
organization.slides.push({image: '/img/slideshow/2.jpg', caption: '爭取權益，團結友愛！'});
organization.slides.push({image: '/img/slideshow/3.jpg', caption: '爭取權益，團結友愛！'});
organization.mission.image = '/img/our.jpg';
organization.mission.description = '<ul><li>凝聚香港建造業從業員</li><li>爭取公平和合理的雇傭條件</li><li>推動行業職業安全健康</li><li>促進從業員與業界的溝通</li></ul>';
organization.contact.address = '九龍油麻地上海街383號華興商業中心2字樓';
organization.contact.tel = '(852) 2388 6887';
organization.contact.fax = '(852) 2385 5002';
organization.contact.email = 'hkciegu@yahoo.com.hk';
organization.introduction.image = '/img/our.jpg';
organization.introduction.description = '香港建造業總工會成立於1986年是香港工會聯合會的屬會，是建造行業集團工會。本會凝聚了歷史長短不一、工種不同的屬會23間。當中有成立了一百多年跨越一個世紀歷史悠久的屬會；有會員眾多、傳統優良、享有盛名的屬會；亦有成立不久、潛力待發、方興未艾的屬會。 工會宗旨是：堅持「愛國、愛港、團結、權益、福利、參與」的精神，爭取勞工權益、調處勞資關係、推廣職業安全與健康、關心工人職業生活、興辦工人福利、開展文娛康樂活動、參與勞工事務和社會事務，促進工人團結。凡從事建造行業，包括地盤、裝修、文職人員、以及與建造行業有關，不論任何工作部門及工程之員工，均可參加工會。';
organization.structure.committeeImage = '/img/orgChart.png';
organization.structure.structureImage = '/img/orgChart1.png';
organization.service.image = '/img/our.jpg';
organization.service.description = '<ul><li>工聯會進修中心</li><li>就業轉介</li><li>項目計劃<ul><li>預防石棉沉着病全港社區推廣計劃</li><li>超越「塵世美」社交復康計劃</li><li>肺塵埃沉着病補償基金委員會醫學監測計劃</li><li>「職業性失聰人士社群及職業復康活動計劃」</li><li>建造業午間安全巡迴講座</li></li></ul>';
organization.downloads.push({name: '會員申請表格', url: '#'});
organization.downloads.push({name: '修改會員資料申請表格', url: '#'});
organization.downloads.push({name: '報讀課程表格', url: '#'});
organization.links.push({name: '香港工會聯合會', url: 'http://www.ftu.org.hk'});
organization.links.push({name: '工聯優惠中心', url: 'http://www.hkftu.com.hk'});
organization.links.push({name: '工人醫療所', url: 'http://www.ftuclinics.org.hk/tc/about_us/background.html'});
organization.links.push({name: '香港海員工會', url: 'http://www.hksu1946.hk/main/index.php'});
organization.links.push({name: '建造業議會', url: 'http://www.hkcic.org/chi/main.aspx'});
organization.save();
*/

// Testing only END

/*
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
*/

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