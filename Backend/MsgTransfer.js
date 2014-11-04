/**
 * Created by aaronlai on 5/6/14.
 */
/**
 * Created by Administrator on 26/5/2014.
 */
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require("fs");
var request = require("request");

mongoose.connect('mongodb://localhost/vCom');
var conn = mongoose.connection;
var gfs = Grid(conn.db, mongoose.mongo);


var MsgSchema = mongoose.Schema({
        MSG_ID: String,
        MSG_Subject: String,
        MSG_Description: String,
        MSG_Content: String,
        MSG_File: String,

        MSG_Date: String,
        MSG_IMG: String,
        MSG_VIDEO: String,

        Group_ID: String,
        Category_ID: String,
        District_ID: String
    }
);


var MsgModel = mongoose.model('Msg', MsgSchema);


/*
 request("http://hkciegu.org.hk/cms/loadJson.php", function (error, response, body) {


 str = String(body);
 str = str.replace(/^\s+|\s+$/g, '');
 str = str.replace(/\r?\n|\r/g, "");
 str = str.replace(";", "");
 str = str.replace(/\t/g, '');


 msgs = JSON.parse(str);

 msgs.data.forEach(function (msg) {
 var msgItem = new MsgModel(msg);

 getContentAndSave(msgItem);

 });


 });



 });
 */

//var MsgModel = mongoose.model('Event', OrgSchema);

/*
 OrgModel.remove(function (err, orgs) {
 if (err) return handleError(err);


 });
 */


conn.once('open', function () {


    //  removeAll();

    MsgModel.count(function (err, c) {
        console.log('Count is ' + c);
    });
    MsgModel.find(function (err, msg) {
        if (err) return console.error(err);
        //   orgs[orgs.length - 1].SlideImg.forEach(function (img) {
        //     readImgByFilename(gfs,img._id+img.Img);
        console.log(msg);

    });


//    });


    /*
     org.save(function(err,org){


     org.SlideImg.forEach(function(img){

     console.log(img);
     buffer='';
     writeStream = gfs.createWriteStream({ filename: img._id+img.Img,mode:'w' });
     fs.createReadStream("original.png").pipe(writeStream);

     // after the write is finished

     writeStream.on("close", function () {
     // read file, buffering data as we go
     readStream = gfs.createReadStream({ filename: "origin2.png" });

     readStream.on("data", function (chunk) {
     buffer += chunk;
     });

     // dump contents to console when complete
     readStream.on("end", function () {
     console.log("contents of file:\n\n", buffer);
     });
     });

     });
     });

     */


    // all se
});

//  console.log(org.SlideImg[0].Img._id);

exports.readImgByFilename = function (filename, res, callback) {


    OrgModel.count(function (err, c) {
        console.log('Count is ' + c);
    });

    bufferB = "";

    // read file, buffering data as we go


    gfs.files.findOne({ filename: filename }, function (err, file) {

        //   console.log(file);
        if (file != null) {
            lastModified = file.uploadDate;
            // put logic here to cache to disk.
            //     mimeType = file.metadata.contentType;
            //
            readStream = gfs.createReadStream({ filename: filename });

            res.writeHead('200', {'Content-Type': 'png'});
            readStream.pipe(res);

        } else {
            res.writeHead(200, {'Content-Type': ""});
            res.write('404 Not Found\n');
            res.end();
        }

    })


    /*
     readStream.on("data", function (chunk) {
     bufferB += chunk;
     });

     // dump contents to console when complete
     readStream.on("end", function () {
     conn.close();

     console.log("Done");
     //    console.log(bufferB);
     callback(bufferB);
     //     return bufferB;
     });

     */

}


exports.save = function (filename, res, callback) {
    org.save(function (err, org) {


        org.SlideImg.forEach(function (img) {

            //   console.log(img);
            buffer = '';
            writeStream = gfs.createWriteStream({ filename: img._id + img.Img, mode: 'w' });
            fs.createReadStream(img.Img).pipe(writeStream);

            // after the write is finished


        });
    });


}


exports.findAllOrg = function (res) {


    OrgModel.find(function (err, orgs) {
        if (err) return console.error(err);

        res.send(orgs);


    });


}

exports.findOrgById = function (orgId, res) {


    OrgModel.find({OrgID: orgId}, function (err, orgs) {
        if (err) return console.error(err);

        res.send(orgs);


    });


}

function removeAll() {

    MsgModel.remove(function (err, orgs) {
        if (err) return handleError(err);


    });


}



function getContentAndSave(msgItem){


    //   var msgItem = new MsgModel(msg);
    request("http://hkciegu.org.hk/cms/loadMsg.php?id="+msgItem.MSG_ID, function (error, response, body) {

        str = String(body);



        msgItem.MSG_Content=str;

        msgItem.save(function (err, msgItem) {

            //console.log()
            console.log(msgItem.MSG_ID + "OK!");


        });
    });

}