var ObjectID = require('mongodb').ObjectID;

CollectionDriver = function(db) {
	this.db = db;
};

// [Class Method] Callback(error, collection)
CollectionDriver.prototype.getCollection = function(collectionName, callback) {
	this.db.collection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else
			callback(null, the_collection);
	});
};

// [Class Method] Callback(error, result)
CollectionDriver.prototype.findAll = function(collectionName, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else {
			the_collection.find().toArray(function(error, results) {
				if (error)
					callback(error);
				else
					callback(null, results);
			});
		}
	});
};

// [Class Method] Callback(error, doc)
CollectionDriver.prototype.get = function(collectionName, id, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else {
			var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
			if (!checkForHexRegExp.test(id))
				callback({error: "invalid id"});
			else
				the_collection.findOne({'_id': ObjectID(id)}, function(error, doc) {
					if (error)
						callback(error);
					else
						callback(null, doc);
				});
		}
	});
};

// [Class Method] Callback(error, obj)
CollectionDriver.prototype.save = function(collectionName, obj, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else {
			obj.created_at = new Date();
			console.log("Data inserted");
			the_collection.insert(obj, function() {
				callback(null, obj);
			});
		}
	});
};

// [Class Method] Callback(error, obj)
CollectionDriver.prototype.update = function(collectionName, obj, entityId, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else {
			obj._id = ObjectID(entityId);
			obj.updated_at = new Date();
			the_collection.save(obj, function(error, doc) {
				if (error)
					callback(error);
				else
					callback(null, obj);
			});
		}
	});
};

// [Class Method] Callback(error, doc)
CollectionDriver.prototype.delete = function(collectionName, entityId, callback) {
	this.getCollection(collectionName, function(error, the_collection) {
		if (error)
			callback(error);
		else {
			the_collection.remove({'_id': ObjectID(entityId)}, function(error, doc) {
				if (error)
					callback(error);
				else
					callback(null, doc);
			})
		}
	});
};

exports.CollectionDriver = CollectionDriver;