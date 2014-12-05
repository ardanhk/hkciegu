var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Activity = require('./Activity');

var Organization = new Schema({
	
	name: {type: String, required: true},
	order: {type: Number, required: true},
	logo: String,

	slides: [{
		image: String,
		caption: String
	}],
	
	mission: {
		image: String,
		description: String
	},

	contact: {
		address: String,
		tel: String,
		fax: String,
		email: String
	},

	introduction: {
		image: String,
		description: String
	},

	structure: {
		committeeImage: String,
		structureImage: String
	},

	service: {
		image: String,
		description: String
	},

	downloads: [{
		name: {type: String, required: true},
		url: {type: String, required: true}
	}],

	links: [{
		name: {type: String, required: true},
		url: {type: String, required: true}
	}],

	activities: [{
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
	}],

	application: [{
		activityId: {type: Schema.Types.ObjectId, required: true},
		memberId: {type: String, required: true},
		tel: {type: String, required: true},
		nop: {type: Number, required: true},
		email: String
	}],

	galleries: [{
		name: {type: String, required: true},
		image: {type: String, required: true}
	}]

});

module.exports = mongoose.model('Organization', Organization);