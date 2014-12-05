var express = require('express'),
	router = express.Router(),
	User = require('../models/User'),
	Activity = require('../models/Activity'),
	Organization = require('../models/Organization');

// getOrgs
router.route('/getOrgs').get(function (req, res) {
	console.log('Request: getOrgs');
	Organization.find({}, function(err, orgs) {
		res.json(orgs);
	});
});

// findOrg
router.route('/findOrg').get(function (req, res) {
	console.log('Request: findOrg');
	Organization.find({}).sort('-order').limit(1).exec(function (err, org) {
		if (err) {
			console.error('Error occur: ' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, organization: org[0]});
		}
	});
});

// findOrg/_id
router.route('/findOrg/:_id').get(function (req, res) {
	console.log('Request: findOrg/' + req.param('_id'));
	Organization.findOne({_id: req.param('_id')}, function (err, org) {
		if (err) {
			console.error('Error occur: ' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, organization: org});
		}
	});
});

// getActs
router.route('/getActs').get(function (req, res) {
	console.log('Request: getActs');
	Activity.find({isDeleted: false}, '_id name description createAt', function (err, docs) {
		if (err) {
			console.error('Error occur: ' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, activities: docs});
		}
	});	
});

// latestActs
router.route('/latestActs').get(function (req, res) {
	console.log('Request: latestActs');
	Activity.find({isDeleted: false}, '_id name description createAt').sort('-createAt').limit(3).exec(function (err, docs) {
		if (err) {
			console.error('Error occur: ' + err);
			res.json({success: false, message: err.message});
		} else {
			res.json({success: true, activities: docs});
		}
	});
});

// findAct/_id
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

// newAct
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

// editAct
router.route('/editAct').put(function (req, res) {
	console.log('Request: editAct/' + req.param('_id'));
	Activity.findOne({_id: req.param('_id')}, function (err, doc) {
		if (err) {
			console.error('Error occur: ' + err)
			res.json({success: false, message: err.message});
		} else {
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
			doc.save(function (err) {
				if (err) {
					console.log('Error occur:' + err);
					res.json({success: false, message: err.message});
				} else {
					res.json({success: true});
				}
			});
		}
	});
});

// deletectAct/_id
router.route('/deleteAct/:_id').put(function (req, res) {
	console.log('Request: deleteAct/' + req.param('_id'));
	Activity.findOne({_id: req.param('_id')}, function (err, doc) {
		if (err) {
			console.error('Error occur: ' + err)
			res.json({success: false, message: err.message});
		} else {
			doc.isDeleted = true;
			doc.save(function (err) {
				if (err) {
					console.log('Error occur:' + err);
					res.json({success: false, message: err.message});
				} else {
					res.json({success: true});
				}
			});
		}
	});
});

module.exports = router;