var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	Activity = require('../models/Activity');

router.route('/getActs').get(function (req, res) {
	console.log("Request: getActs");
	Activity.find({}, '_id name createAt', function (err, docs) {
		if (err) {
			console.error("Error occur: " + err);
			res.json({success: false, error: err});
		} else {
			res.json({success: true, activities: docs});
		}
	});	
});

router.route('/findAct/:id').get(function (req, res) {
	console.log("Request: findAct/" + req.param("id"));
	Activity.findOne({_id: req.param("id")}, function (err, doc) {
		if (err) {
			console.error("Error occur: " + err)
			res.json({success: false, error: err});
		} else {
			res.json({success: true, activity: doc});
		}
	});
});

router.route('/newAct').post(function (req, res) {
	var activity = new Activity();
	activity.name = req.param('name');
	activity.description = req.param('description');
	activity.canRegister = req.param('canRegister');
	if (activity.canRegister) {
		activity.regStartDate = req.param('startDate');
		activity.regEndDate = req.param('endDate');
		activity.courseCode = req.param('courseCode');
		activity.fee = req.param('fee');
	}
	activity.save(function (err) {
		if (err) {
			console.log("Error occur:" + err);
			res.json({success: false, error: err});
		} else {
			res.json({success: true});
		}
	});
});

module.exports = router;