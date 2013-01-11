/**
 * Module dependencies.
 */
var passport = require('passport')
  , login = require('connect-ensure-login')
  , sensorData = require('../../libs/sensorData.js')

exports.show = function(req, res){
  if(req.sensors){
    var actions = [];
    res.render('site/show', {sensors : req.sensors, sensorData: sensorData, actions: actions});
  }else{
    res.render('users/login');
  }    

};
exports.index = function(req, res) {
  res.send('OAuth Server');
};
exports.jsonResponse = function( req, res){
  res.json(req.jsonResponse);
}
exports.loginForm = function(req, res) {
  console.log('login form');
  res.render('users/login');
};

exports.login = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
}

exports.account = [
  login.ensureLoggedIn(),
  function(req, res) {
    res.render('users/show', { user: req.user });
  }
]
