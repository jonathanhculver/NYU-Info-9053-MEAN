var fizzBuzz = require("../src/fizz_buzz");
describe("FizzBuzz", function() {
	it("exists", function() {
		expect(fizzBuzz).toBeDefined();
	});
});

describe("fizzBuzz.generate(3)", function() {
	var result;
	beforeEach(function(){
		result = fizzBuzz.generate(3);
	});
	it("returns [1, 2, 'Fizz']", function() {
		expect(result).toEqual([1,2, "Fizz"]);
	});
});

describe("fizzBuzz.generate(5)", function() {
	var result;
	beforeEach(function(){
		result = fizzBuzz.generate(5);
	});
	it("returns [1, 2, 'Fizz']", function() {
		expect(result).toEqual([1,2, "Fizz", 4, "Buzz"]);
	});
});