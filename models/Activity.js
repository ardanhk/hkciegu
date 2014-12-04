var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Activity = new Schema({
	name: {type: String, required: true},
	description: {type: String, require: true},
	canRegister: {type: Boolean, require: true},
	activityPhotos: Array,
	startDate: Date,
	endDate: Date,
	courseCode: String,
	fee: Number,
	createAt: {type:Date, default: Date.now, require: true},
	updateAt: Date,
	isDeleted: {type: Boolean, default: false, require: true}
});

Activity.pre('save', function(next) {
	var activity = this;
	if (activity.canRegister) {
		if (activity.startDate == null || activity.endDate == null || activity.courseCode == null || activity.fee == null) {
			return next(new Error("Information incomplete"));
		}
	}
	return next();
});

module.exports = mongoose.model('Activity', Activity);