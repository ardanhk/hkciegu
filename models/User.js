var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	//bcrypt = require('bcrypt'), // Blowfish key cipher
	SALT_WORK_FACTOR = 10;

var User = new Schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	accessToken: String,
	createAt: {type: Date, default: Date.now}
});

/*
// Hash the password
User.pre('save', function (next) {
	var user = this;
	if (!user.isModified('password'))
		return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(error, salt) {
		if (error)
			return next(error);

		bcrypt.hash(user.password, salt, function(error, hash) {
			if (error)
				return next(error);
			user.password = hash;
			next();
		});
	});
});
*/


User.methods.comparePassword = function(candidatePassword, callback) {
	/*
	bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
		if (error)
			return callback(error);
		callback(null, isMatch);
	});
	*/

	
	if (this.password == candidatePassword)
		callback(null, true);
	else
		callback(null, false);
}

module.exports = mongoose.model('User', User);