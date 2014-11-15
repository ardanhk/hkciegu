var mongoose = require('mongoose'),
	Schema = mongoose.Scheman,
	bcrypt = require('bcrypt'), // Blowfish key cipher
	SALT_WORK_FACTOR = 10;

// Mongoose Configuration
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {

});

var AdminSchema = new Schema({
	username: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	createAt: {type Date, default: Date.now}
});

AdminSchema.pre('save', {var admin = this;})

module.exports = mongoose.model(Admin&, AdminSchema);