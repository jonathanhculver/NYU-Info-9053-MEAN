var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
	res.render('index.html'); 
}); 

app.get("/api/people", function(req, res){
	
	var people = [{
		name: "Moe"
	},
	{	
		name: "Larry"
	},
	{
		name: "Currly"
	}];

	res.send(people);
});

app.listen(process.env.port || 3000);