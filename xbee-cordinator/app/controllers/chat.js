var mongoose = require('mongoose'),
_ = require('underscore'),
redis = require("../../interfaces/redis"),
Member = mongoose.model('Member'),
shrt = require('short');

shrt.connect('mongodb://localhost/webrtc-me');
shrt.connection.on('error', function(error) {
	throw new Error(error);
});

// show profile
exports.show = function(req, res) {
	var user = req.user
 console.log(req.session);
	redis.listChannel(req.user._id + '-owner', function(users) {
		console.log(users);

		console.log(user._id);
		console.log('some connected users')
		res.render('chat/show', {
			you: user,
			users: users,
			thisIsHash: false
		})

	});
}

exports.showHash = function(req, res) {
	var user = req.user
	var hash = req.param('hash');
	console.log("Got a show with a hash of : " + hash);
	shrt.retrieve(hash, function(err, shortObj) {
		if (err) throw Error(err);
		if(shortObj){
			if (err) throw Error(err);
			console.log("That hash returned for user " + shortObj.URL);
			redis.listChannel(shortObj.URL + '-owner', function(users) {
				console.log(users);
				console.log(user._id);
				console.log('some connected users')
				res.render('chat/show', {
					you: user,
					users: users,
					thisIsHash: true,
					hash: hash
				})
			});
		}else{
		res.redirect('/notfound');
		}
	});
}

exports.notSupported = function(req, res) {
	res.render('chat/notSupported', {

	});
}

