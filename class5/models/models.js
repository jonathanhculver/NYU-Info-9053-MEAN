var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
	name: String
});

PersonSchema.statics.findOneByName = function(name, cb) {
	this.findOne({name: name}, cb); 
};
var Person = mongoose.model("Person", PersonSchema);

module.exports = {
	Person: Person
};