var fs = require("fs");
var http = require("http");
var mustache = require("mustache");

http.createServer(function(req, res){
	fs.readFile("index.html", function(err, data){
		var model = {
			title: 'test'
		}
		var output = mustache.render(data.toString(), model);
		res.end(output);
	});
}).listen(process.env.PORT || 8080);