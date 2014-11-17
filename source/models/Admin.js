var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	bcrypt = require('bcrypt'), // Blowfish key cipher
	SALT_WORK_FACTOR = 10;

// Mongoose Configuration
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
	console.log("Connection Established.");
});

var AdminSchema = new Schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	accessToken: String,
	createAt: {type: Date, default: Date.now}
});

// Hash the password
AdminSchema.pre('save', function (next) {
	var admin = this;
	if (!admin.isModified('password'))
		return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
		if (error)
			return next(error);

		bcrypt.hash(admin.password, salt, function(error, hash) {
			if (error)
				return next(error);
			admin.password = hash;
			next();
		});
	});
});

AdminSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
		if (error)
			return callback(error);
		callback(null, isMatch);
	});
}

module.exports = mongoose.model("Admin", AdminSchema);