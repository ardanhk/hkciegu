var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Activity = new Schema({
	activityName: {type: String, required: true},
	activityDescription: {type: String, require: true},
	canRegister: {type: Boolean, require: true},
	createAt: {type:Date, default: Date.now, require: true},
	updateAt: Date,
	activityPhotos: Array,
	regStartDate: Date,
	regEndDate: Date,
	displayCourseCode: String,
	fee: Number
});

Activity.pre('save', function(next) {
	var activity = this;
	if (activity.canRegister) {
		if (regStartDate == null || regEndDate == null || displayCourseCode == null || fee == null)
			return next("Information incomplete");
	}
	return next();
});

module.exports = mongoose.model('Activity', Activity);