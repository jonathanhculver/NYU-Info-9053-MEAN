var request = require("request");
var cheerio = require("cheerio");

describe("home page", function() {
	describe("/3", function() {
		var html;
		var $;
		beforeEach(function(done) {
			request("http://localhost:8080/3", function(error, response, body) {
				html = body;
				$ = cheerio.load(body);
				done(); //tells tests to wait till its done to run
			});
		});

		it("it should contain hello", function(){
			expect(html).toContain('hello');
		});
		it("it should contain 5 li items", function(){
			expect($("li").length).toEqual(5);
		});
	})
});