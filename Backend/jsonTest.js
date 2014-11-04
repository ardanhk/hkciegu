var request = require("request");

var json = '{"result":[{"sub_result" : true}],"count":"1"}',
    obj = JSON.parse(json);

console.log(obj.result);
request("http://hkciegu.org.hk/cms/loadJson.php", function(error, response, body) {

   // var trimedBody=String.trim(body);

 //  msgs=JSON.parse(body);

   /* for (data in body){
        console.log(body[data]);
        // console.log(val.path);
       // savePhoto(req.files[file]);

    }
    */

    //body = body.replace(/^\s+|\s+$/g,'')
    str=String(body);
    str = str.replace(/^\s+|\s+$/g,'');
  //  str=str.replace(/\n$/g, '');
    str = str.replace(/\r?\n|\r/g, "");
    str = str.replace(";", "");
    str = str.replace(/\t/g, '');
    // msgs=JSON.parse(str);
   // str = str.replace("\"", "");



    msgs=JSON.parse(str)
    console.log(msgs.data[0]);

});

