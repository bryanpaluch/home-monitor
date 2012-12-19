util = require('util');
user = require('../app/controllers/user.js');
module.exports = function(server, auth) {

	io = require('socket.io').listen(server)
	io.set('log level', 0);

	io.set('authorization', function(data, accept) {
		if (data.headers) {
          data.authorized = false;
          console.log(data.headers);
					return accept(null, true);
		} else {
			return accept('No cookie transmitted', false);
		}
	});

	io.sockets.on('connection', function(socket) {
      socket.on('disconnect', function() {
      });
      socket.on('auth', function(data){
        user.decryptSocketKey(data.socketKey, function(user){
          console.log(user);
          console.log('authenticated');
          socket.authorized = true;
        });
        console.log(data);
      });

	});
}

