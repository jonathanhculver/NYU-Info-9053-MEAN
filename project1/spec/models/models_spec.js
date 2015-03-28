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
    				done();
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
    });

    /** test Place class **/

    describe("Place", function() {
        var ids = {};
        beforeEach(function(done){
            db.connect(function(){
                models.seedPlaces(function(err, nyc, paris, london){
                    ids.nycId = nyc._id;
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
            it("places are nyc, paris, london", function(){
                expect(places).toEqual(['New York', 'Paris', 'London']);
            });
        });

    });

    /** end place testing */

});