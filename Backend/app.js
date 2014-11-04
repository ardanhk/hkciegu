var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var dataHandler=require('./DataHandler');
var app = express();
var fs = require('fs');

var JPush = require("jpush-sdk");

//var jpushClient = JPush.build({appkey: "f108c40b77940e399d61f7d8", masterSecret: "6dafaafef254d686ac2c6b14"});
var client = JPush.buildClient('f108c40b77940e399d61f7d8', '6dafaafef254d686ac2c6b14');

//Variable
var eventInfo;
var eventName;
var eventDetail;
var accountName="Rocky";
var accounrClub="建總";
var accounrPhone="93686526";
var isJoined=false;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/', routes);
app.use('/users', users);

app.get('/push', function (req, res) {

    dataHandler.readImgByFilename('5386a54094363aa414d74ffbbg2.jpg',res,function(image){
        console.log(image);
        res.writeHead('200', {'Content-Type': 'image/png'});
        //  res.end(image,'binary');
        //   res.header({'Content_type': 'image/png'})

        // res.header({'Content_type': 'image/png'})
        //res.end(image);
    });
    console.log("Push");

});


app.get('/getImage', function (req, res) {
    console.log(req.query.imgName);
    dataHandler.readImgByFilename(req.query.imgName,res,function(image){
        console.log(image);
        res.writeHead('200', {'Content-Type': 'image/png'});

    });


});

app.get('/findAllOrgs', function (req, res) {

    dataHandler.findAllOrg(res);


});

app.get('/findOrg', function (req, res) {
    console.log(req.query.orgId);

    dataHandler.findOrgById(req.query.orgId,res);

});

app.get('/findOrg/:identifier', function(req, res){
    flow.write(req.params.identifier, res);
});


app.get('/findMsg', function (req, res) {
    console.log(req.query.msgid);

    dataHandler.findMsgById(req.query.msgid,res);

});

app.get('/findMsgByCid', function (req, res) {
    console.log(req.query.cId);

    dataHandler.findMsgsByCId(res,req.query.cId);

});



app.get('/findAllMsgs', function (req, res) {

    dataHandler.findAllMsgs(res);

});


app.get('/updateOrg', function (req, res) {

 //   console.log(req.query);
  var orgObj = JSON.parse(req.query.orgData);
    console.log(orgObj);

res.send("OK");
    //   dataHandler.findAllMsgs(res);

});




app.get('/eventInfo', function (req, res) {

    //   console.log(req.query);
   // var orgObj = JSON.parse(req.query.orgData);
    //eventInfo="團體活動";
   // eventDetail="團體活動 DEtail";
//    console.log(eventInfo);

    res.send('{"eventName":"'+eventName + '","eventDetail":"'+eventDetail+ '"}');
    //   dataHandler.findAllMsgs(res);

});

app.get('/joinEvent', function (req, res) {

    //   console.log(req.query);
  //  var orgObj = JSON.parse(req.query.orgData);
    console.log(eventInfo);
isJoined=true;
    res.send("OK");
    //   dataHandler.findAllMsgs(res);

});

app.get('/isJoined', function (req, res) {

    //   console.log(req.query);
    //  var orgObj = JSON.parse(req.query.orgData);

    res.send(isJoined);
    //   dataHandler.findAllMsgs(res);

});


app.get('/addEvent', function (req, res) {
    eventInfo="團體活動";
eventName=req.query.eventName;
    eventDetail=req.query.eventDetail;
      console.log(req.query.eventDetail);
    //  var orgObj = JSON.parse(req.query.orgData);
    console.log(eventInfo);
    client.push().setPlatform(JPush.ALL)
        .setAudience(JPush.ALL)
        .setNotification("建總 - "+req.query.eventName, JPush.ios('ios alert', 'happy', 5))
        .send(function(err, res) {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Sendno: ' + res.sendno);
                console.log('Msg_id: ' + res.msg_id);
            }
        });

    res.send(eventInfo);


});



app.get('/findAlbumByName/:orgId/:albumName', function (req, res) {

   // __dirname
console.log(req.params.albumName);
   // dataHandler.findAlbumDict(res);
    var path="F:/album/"+req.params.orgId+"/"+req.params.albumName;
    fs.readdir(path,function(err,files){
        if (err) throw err;
        var c=0;
        console.log("files",files);
res.send(files);
        /*
        files.forEach(function(file){
            c++;
            fs.readFile(dir+file,'utf-8',function(err,html){
                if (err) throw err;
                data[file]=html;
                if (0===--c) {
                    console.log(data);  //socket.emit('init', {data: data});
                }
            });

        });
        */
    });
});


app.get('/findAlbum', function (req, res) {

    dataHandler.findAlbumDict(res);

});

app.get('/findAlbum/:orgId', function (req, res) {

    dataHandler.findAlbumDictByOrgId(req.params.orgId,res);

});




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});




/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});






app.listen(3000);
