var title = 'blah';

//module.exports.title= title;

/*
module.exports = {
	title: title
};*/

/*

module.exports = (function() {
	var self= {};

	self.title = title;

	return self;
})();

*/

var generate = function(count){
	 var arr = [];
	 for(var i = 1; i<=count; i++) {
	 	if(i%3 === 0 && i% 5 === 0) {
	 		arr.push("FizzBuzz");
	 	} else if(i%3 === 0){
	 		arr.push("Fizz");
	 	} else if(i%5 === 0) {
	 		arr.push("Buzz");
	 	} else {
	 		arr.push(i);
	 	}
	 }
	 return arr;
};

module.exports = {
	generate: generate
};