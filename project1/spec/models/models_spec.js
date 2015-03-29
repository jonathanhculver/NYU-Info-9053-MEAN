var models = require("../../models/models");
var db = require("../../config/db");
var Person = models.Person;
var Place = models.Place;
describe("models", function() {

    describe("Person", function() {
    	var ids = {};
    	beforeEach(function(done){
    		db.connect(function(){
    			models.seedPeople(function(err, moe, larry, curly){
    				ids.moeId = moe._id;
    				ids.larryId = larry._id;
	                models.seedPlaces(function(err, nyc, paris, london){
                        ids.nycId = nyc._id;
                        ids.parisId = paris._id;
                        ids.londonId = london._id;
                        done();
                    });
    			});
    		});
    	});
    	afterEach(function(done){
    		db.disconnect(function(){
    			done();
    		});
    	});

    	describe("getPersonByName", function(){
    		var person;
    		beforeEach(function(done){
    			Person.getOneByName("Moe", function(err, _person){
    				person = _person;
    				done();
    			});
    		});

    		it("person is moe", function() {
    			expect(person.name).toEqual("Moe");
    		});
    	});

    	describe("getPersonById", function(){
    		var person;
    		beforeEach(function(done){
    			Person.getOneById(ids.moeId, function(err, _person){
    				person = _person;
    				done();
    			});
    		});

    		it("returns moe", function(){
    			expect(person.name).toEqual("Moe");
    		});
    	});

    	describe("getAll", function(){
    		var people;
    		beforeEach(function(done){
    			Person.getAll(function(err, _people){
    				people = _people.map(function(person){
    					return person.name;
    				});
    				done();
    			});
    		});
    		it("returns moe, larry, curly", function(){
    			expect(people).toEqual(['Moe', 'Larry', 'Curly']);
    		});
    	});

        describe("addFavoritePlace", function(){
            var place,
                person,
                error;
            beforeEach(function(done){
                Person.addPlace(ids.moeId, ids.parisId, function(err, _place){
                    place = _place;
                    Person.getOneById(ids.moeId, function(err, _person){
                        person = _person;
                        Person.addPlace(ids.moeId, ids.parisId, function(message){
                            error = message;
                            done();
                        });
                    });
                });
            });
            it("paris is favorited 1 time", function(){
                expect(place.numberOfTimesFavorited).toEqual(1);
            });
            it("moe has 1 fav place", function(){
                expect(person.numberOfFavoritePlaces).toEqual(1);
            });
            it("moe's fav place is paris", function(){
                expect(person.favoritePlaces.indexOf(ids.parisId)).not.toEqual(-1);
            });
            it("moe can not add paris twice", function(){
                expect(error.message).toEqual('ALREADY_FAVORITED');
            });
        });

        describe("removeFavoritePlace", function(){
            var place,
                person,
                error;
            beforeEach(function(done){
                Person.addPlace(ids.moeId, ids.parisId, function(err, _place){
                    Person.removePlace(ids.moeId, ids.parisId, function(err, _place){
                        place = _place;
                        Person.removePlace(ids.moeId, ids.parisId, function(err) {
                            error = err;
                            Person.getOneById(ids.moeId, function(err, _person){
                                person = _person;
                                done();
                            });
                        });
                    });
                });
            });
            it("paris is favorited 0 times", function(){
                expect(place.numberOfTimesFavorited).toEqual(0);
            });
            it("moe has 0 fav places", function(){
                expect(person.numberOfFavoritePlaces).toEqual(0);
            });
            it("moe's fav place is not paris", function(){
                expect(person.favoritePlaces.indexOf(ids.parisId)).toEqual(-1);
            });
            it("moe can not remove paris twice", function(){
                expect(error.message).toEqual('PLACE_NOT_FOUND');
            });
        });

        describe("allWhoFavoritedPlace", function(){
            var people;
            beforeEach(function(done){
                Person.addPlace(ids.moeId, ids.parisId, function(err, _place){
                    Person.addPlace(ids.larryId, ids.parisId, function(err, _place){
                        Person.findAllWhoFavoritedPlace(ids.parisId, function(err, _people){
                            people = _people.map(function(person){
                                return person.name;
                            });
                            done();
                        });
                    });
                });
            });
            it("people are moe and larry", function(){
                expect(people).toEqual(['Moe', 'Larry']);
            });
        });

    });

    /** test Place class **/

    describe("Place", function() {
        var ids = {};
        beforeEach(function(done){
            db.connect(function(){
                models.seedPlaces(function(err, nyc, paris, london){
                    ids.nycId = nyc._id;
                    ids.parisId = paris._id;
                    ids.londonId = london._id;
                    done();
                });
            });
        });
        afterEach(function(done){
            db.disconnect(function(){
                done();
            });
        });
        describe("getPlaceByName", function() {
            var place;
            beforeEach(function(done){
                Place.getOneByName("Paris", function(err, _place){
                    place = _place;
                    done();
                });
            });
            it("place is paris", function() {
                expect(place.name).toEqual("Paris");
            });
        });
        describe("getPlaceById", function() {
            var place;
            beforeEach(function(done){
                Place.getOneById(ids.nycId, function(err, _place){
                    place = _place;
                    done();
                });
            });
            it("place is nyc", function() {
                expect(place.name).toEqual("New York");
            });
        });
        describe("getAllPlaces", function(){
            var places;
            beforeEach(function(done){
                Place.getAll(function(err, _places){
                    places = _places.map(function(place){
                        return place.name;
                    });
                    done();
                });
            });
            it("places are london, nyc, paris", function(){
                expect(places).toEqual(['London', 'New York', 'Paris']);
            });
        });
        describe("increase number of times favorited", function(){
            var place;
            beforeEach(function(done){
                Place.increaseNumberOfTimesFavorited(ids.nycId, function(err, _place){
                    place = _place;
                    done();
                });
            });
            it("nyc is favorited 1 time", function(){
                expect(place.numberOfTimesFavorited).toEqual(1);
            })
        });
        describe("decrease number of times favorited", function(){
            var place;
            beforeEach(function(done){
                Place.decreaseNumberOfTimesFavorited(ids.nycId, function(err, _place){
                    place = _place;
                    done();
                });
            });
            it("nyc is favorited -1 time", function(){
                expect(place.numberOfTimesFavorited).toEqual(-1);
            })
        });
        describe("getAllFavPlaces", function(){
            var places;
            beforeEach(function(done){

                Place.increaseNumberOfTimesFavorited(ids.nycId, function(){
                    Place.increaseNumberOfTimesFavorited(ids.parisId, function(){
                         Place.getAllFavoritedPlaces(function(err, _places){
                            places = _places.map(function(place){
                                return place.name;
                            });
                            done();
                        });
                    });
                });
               
            });
            it("Favorite Places are NYC and Paris", function(){
                expect(places).toEqual(['New York', 'Paris']);
            });
        });
        describe("getAllUnFavPlaces", function(){
            var places;
            beforeEach(function(done){

                 Place.getAllUnfavoritedPlaces(function(err, _places){
                    places = _places.map(function(place){
                        return place.name;
                    });
                    done();
                });
               
            });
            it("Unfavorite Places are NYC, Paris, London", function(){
                expect(places).toEqual(['New York', 'Paris', 'London']);
            });
        });

    });

    /** end place testing */

});