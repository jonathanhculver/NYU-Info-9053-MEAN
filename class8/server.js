var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.get("/", function(req, res){
	res.render('index.html'); 
}); 

app.listen(process.env.port || 3000);