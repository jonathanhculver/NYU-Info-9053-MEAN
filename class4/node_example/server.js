var fs = require("fs");
var http = require("http");
var mustache = require("mustache");

http.createServer(function(req, res){
	var testArray= [0,1,2,3,4];
	fs.readFile("index.html", function(err, data){
		var model = {
			'title': 'test',
			'testArray': testArray
		}
		var output = mustache.render(data.toString(), model);
		res.end(output);
	});
}).listen(process.env.PORT || 8080);