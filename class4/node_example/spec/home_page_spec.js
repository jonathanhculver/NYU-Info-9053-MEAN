var request = require("request");

describe("home page", function() {
	describe("/3", function() {
		var html;
		beforeEach(function(done) {
			request("http://localhost:8080/3", function(error, response, body) {
				html = body;
				done(); //tells tests to wait till its done to run
			});
		});

		it("it should contain hello", function(){
			expect(html).toContain('hello');
		});
	})
});