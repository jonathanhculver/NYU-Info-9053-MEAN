var mongoose = require("mongoose");
var Person = mongoose.model("Person", {
	name: String
});

module.exports = {
	Person: Person
};