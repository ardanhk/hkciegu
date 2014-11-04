/**
 * Created by Administrator on 27/5/2014.
 */
var SlideImgSchema = mongoose.Schema({
    Img: String


});

var OrgSchema = mongoose.Schema({
    OrgName:String,
    SlideImg: [SlideImgSchema]



});