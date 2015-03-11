var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
	name: String
});

PersonSchema.statics.getOneByName = function(name, cb) {
	this.findOne({name: name}, cb);
};

var Person = mongoose.model("Person", PersonSchema);

var seed = function(cb) {
	var people = [
		{name: "Moe"},
		{name: "Larry"},
		{name: "Curly"}
	];
	Person.remove({}, function(){
		Person.create(people, function(err, moe, larry, curly){
			cb(err, moe, larry, curly);
		});
	});
};

module.exports = {
	seed: seed,
	Person: Person
};