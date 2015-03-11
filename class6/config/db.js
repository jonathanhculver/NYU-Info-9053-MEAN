var mongoose = require('mongoose');

var connect = function(cb) {
	mongoose.connect("mongodb://localhost/my_world_test");
	mongoose.connection.once("open", function(){
		cb();
	});
};

var disconnect = function(cb) {
	mongoose.disconnect(cb);
};

module.exports = {
	connect: connect,
	disconnect: disconnect
};


