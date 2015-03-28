var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
	name: String
});

PersonSchema.statics.getOneByName = function(name, cb) {
	this.findOne({name: name}, cb);
};

PersonSchema.statics.getOneById = function(id, cb) {
	this.findOne({_id: id}, cb);
};

PersonSchema.statics.getAll = function(cb){
	this.find({}, cb).sort("-name").exec(cb);
};

var Person = mongoose.model("Person", PersonSchema);


/** Place methods **/

var PlaceSchema = new mongoose.Schema({
    name: String,
    numberOfTimesFavorited: {type: Number, default: 0}
});

PlaceSchema.statics.getOneByName = function(name, cb) {
    this.findOne({name: name}, cb);
};

PlaceSchema.statics.getOneById = function(id, cb) {
    this.findOne({_id: id}, cb);
};

PlaceSchema.statics.getAll = function(cb) {
    this.find({}, cb);
};

var Place = mongoose.model("Place", PlaceSchema);

/* end Place methods **/

var seedPeople = function(cb) {
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

var seedPlaces = function(cb) {
    var places = [
        {name: "New York"},
        {name: "Paris"},
        {name: "London"}
    ];

    Place.remove({}, function() {
        Place.create(places, function(err, nyc, paris, london) {
            cb(err, nyc, paris, london);
        });
    });
}

module.exports = {
	seedPeople: seedPeople,
    seedPlaces: seedPlaces,
	Person: Person,
    Place: Place
};