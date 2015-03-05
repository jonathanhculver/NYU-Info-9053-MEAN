var models = require("../../models/models");
var Person = models.Person;
var db = require("../../config/db");

describe("Person", function() {
	beforeEach(function(done) {
		db.connect(function(){
			db.seed(function(){
				done();
			});
		});
	});
	afterEach(function(done) {
		db.disconnect(function(){
			done();
		});
	});
	describe('find one by name', function() {
		var person;

		beforeEach(function(done){
			Person.findOneByName("Moe", function(err, _person) {
				person = _person;
				done();
			});
		});

		it("returns moe", function(){
			expect(person.name).toEqual("Moe");
		});
	});
});