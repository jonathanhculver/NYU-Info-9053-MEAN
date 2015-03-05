var db = require("./config/db");

db.connect(function(){
	db.seed(function(){

	});
	setTimeout(function() {
		db.disconnect(function(){});
	}, 2000)
});