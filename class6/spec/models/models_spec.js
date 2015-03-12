var models = require("../../models/models");
var db = require("../../config/db");
var Person = models.Person;
describe("models", function() {
	var ids = {};
	beforeEach(function(done){
		db.connect(function(){
			models.seed(function(err, moe, larry, curly){
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