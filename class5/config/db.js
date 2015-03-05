var mongoose = require("mongoose");
var models = require("../models/models");

var Person = models.Person;

var connect = function(cb) {
	mongoose.connect("mongodb://localhost/my_world");
	mongoose.connection.once("open", function(){
		console.log('connected');
		cb();
	});
};

var disconnect = function(cb) {
	mongoose.disconnect(function() {
		console.log("disconnected");
		cb();
	});
};

var seed = function(cb) {
	var people = [
		{name: "Moe"},
		{name: "Larry"},
		{name: "Curly"}
	];
	Person.remove({}, function() {
		Person.create(people, cb);
	});
};

module.exports = {
	connect: connect,
	disconnect: disconnect,
	seed: seed
};