var mongoose = require('mongoose');
var URL = 'mongodb://localhost/my_world_test';

var connect = function(cb) {
	mongoose.connect(URL);
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


