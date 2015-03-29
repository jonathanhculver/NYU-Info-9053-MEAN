var mongoose = require("mongoose");

var PersonSchema = new mongoose.Schema({
	name: String,
    favoritePlaces: [{
        type: mongoose.Schema.ObjectId,
        ref: "Place"
    }],
    numberOfFavoritePlaces: {type: Number, default: 0}

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

PersonSchema.statics.addPlace = function(personId, placeId, cb) {
    this.getOneById(personId, function(err, _person){
        if(_person.favoritePlaces.indexOf(placeId) != -1) {
           return cb({
                message: "ALREADY_FAVORITED"
            });
        }
        var query = {
            _id: personId
        };
        var update = {
            $push: {
                favoritePlaces: placeId
            },
            $inc: {
                numberOfFavoritePlaces: 1
            }
        };
        //add favorite place to person and increase # of fav places
        Person.update(query, update, function(err){
            //increased num of times place has been favorite
            Place.increaseNumberOfTimesFavorited(placeId, cb);
        });

    });
};

PersonSchema.statics.removePlace = function(personId, placeId, cb) {
    this.getOneById(personId, function(err, _person){
        if(_person.favoritePlaces.indexOf(placeId) == -1) {
           return cb({
                message: "PLACE_NOT_FOUND"
            });
        }
        var query = {
            _id: personId
        };
        var update = {
            $pull: {
                favoritePlaces: placeId
            },
            $inc: {
                numberOfFavoritePlaces: -1
            }
        };
        //remove favorite place from person and decrease # of fav places
        Person.update(query, update, function(err){
            //decrease num of times place has been favorite
            Place.decreaseNumberOfTimesFavorited(placeId, cb);
        });

    });
};

PersonSchema.statics.findAllWhoFavoritedPlace = function(placeId, cb) {
    this.find({favoritePlaces: placeId}, cb);
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
    this.find({})
        .sort("name")
        .exec(cb);
};

PlaceSchema.statics.increaseNumberOfTimesFavorited = function(id, cb) {
    this.findOneAndUpdate({_id: id}, {$inc: {numberOfTimesFavorited:1}}, {}, cb);
};

PlaceSchema.statics.decreaseNumberOfTimesFavorited = function(id, cb) {
    this.findOneAndUpdate({_id: id}, {$inc: {numberOfTimesFavorited:-1}}, {}, cb);
};

PlaceSchema.statics.getAllFavoritedPlaces= function(cb) {
    this.find({})
        .where('numberOfTimesFavorited').gt(0)
        .exec(cb);
};

PlaceSchema.statics.getAllUnfavoritedPlaces = function(cb) {
    this.find({})
        .where('numberOfTimesFavorited').lte(0)
        .exec(cb);
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