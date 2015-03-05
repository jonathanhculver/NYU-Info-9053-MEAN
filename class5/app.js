var mongoose = require("mongoose");

var Person = mongoose.model("Person", {
	name: String
});

mongoose.connect("mongodb://localhost/my_world");

mongoose.connection.once("open", function(){
	console.log('connected');
	var people = [
		{name: "Moe"},
		{name: "Larry"},
		{name: "Curly"}
	];
	Person.remove({}, function(){ //truncating
		Person.create(people);
	});
	setTimeout(function(){
		mongoose.disconnect(function() {
			console.log("disconnected");
		});
	}, 3000);
});