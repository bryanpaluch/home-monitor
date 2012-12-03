var db = require('../../lib/memoryDb.js');

exports.signin = function(req, res) {}

// auth callback
exports.authCallback = function(req, res, next) {
	if (req.session.initialRequest) {
		res.redirect(req.session.initialRequest);
	} else {
		res.redirect('/');
	}
}
exports.cloudCordinatorCallback = function(req, res, next){
  if(req.account){
    db.statusDb.set('user', req.account);
    res.render('users/show', {
      title: req.account.name,
      user: req.account,
      updated: false
    });
  }else{
		res.redirect('/');
  }
}

// login
exports.login = function(req, res) {
	res.render('users/login', {
		title: 'Login'
	});
}

// sign up
exports.signup = function(req, res) {
	res.render('users/signup', {
		title: 'Sign up'
	});
}

// logout
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/login');
}

// session
exports.session = function(req, res) {
	res.redirect('/');
}


exports.update = function(req, res) {
  res.redirect('/');
}

// show profile
exports.show = function(req, res) {
	var user = req.profile
	res.render('users/show', {
		title: 'Cloud Info',
		user: req.cloudinit,
    updated: false
	});
}

