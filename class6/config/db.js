var mongoose = require('mongoose');

var connect = function(cb) {
	mongoose.connect(process.env.CONN);
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


