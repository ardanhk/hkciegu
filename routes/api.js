var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	Activity = require('../models/Activity');

router.route('/getActs').get(function (req, res) {
	console.log('Request: getActs');
	Activity.find({isDeleted: false}, '_id name createAt', function (err, docs) {
		if (err) {
			console.error('Error occur: ' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, activities: docs});
		}
	});	
});

router.route('/findAct/:_id').get(function (req, res) {
	console.log('Request: findAct/' + req.param('_id'));
	Activity.findOne({_id: req.param('_id')}, function (err, doc) {
		if (err) {
			console.error('Error occur: ' + err)
			res.json({success: false, message: err.message});
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
			console.log('Error occur:' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true});
		}
	});
});

router.route('/editAct').put(function (req, res) {
	console.log('Request: editAct/' + req.param('_id'));
	Activity.findOne({_id: req.param('_id')}, function (err, doc) {
		if (err) {
			console.log('testing err1');
			console.error('Error occur: ' + err)
			res.json({success: false, message: err.message});
		} else {
			console.log('testing nerr1');
			doc.name = req.param('name');
			doc.description = req.param('description');
			doc.canRegister = req.param('canRegister');
			if (doc.canRegister) {
				doc.startDate = req.param('startDate');
				doc.endDate = req.param('endDate');
				doc.courseCode = req.param('courseCode');
				doc.fee = req.param('fee');
			} else {
				doc.regStartDate = undefined;
				doc.regEndDate = undefined;
				doc.courseCode = undefined;
				doc.fee = undefined;
			}
			console.log('testing save1');
			doc.save(function (err) {
				if (err) {
					console.log('testing save err1');
					console.log('Error occur:' + err);
					res.json({success: false, message: err.message});
				} else {
					console.log('testing save nerr1');
					res.json({success: true});
				}
			});
		}
	});
});

router.route('/deleteAct/:_id').put(function (req, res) {
	console.log('Request: deleteAct/' + req.param('_id'));
});

module.exports = router;