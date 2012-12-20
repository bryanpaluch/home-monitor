/**
 * Module dependencies.
 */
var passport = require('passport')
, mongoose = require('mongoose')
, crypto = require('crypto')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor');
exports.signup = function (req, res){
  res.render('users/signup', {
              title: 'Sign up'
              });
}
exports.create = function(req, res){
 console.log(req.body); 
  var user = new User(req.body);
  console.log(user);
  user.provider = 'local';
  user.save(function(err){
    if(err) {
      console.log(err);
      return res.render('users/signup', {
        error: err.errors
      });
    }
    console.log(this);
    req.logIn(user, function(err){
      if(err) return next(err);
      return res.redirect('/');
    });
  });
}

exports.session = passport.authenticate('local', { successReturnToOrRedirect: '/', failureRedirect: '/login' });
exports.about = function(req, res){
  console.log(req.session); 
  res.render('about/show');
}
exports.login = function(req, res) {
    res.render('users/login', {
          title: 'Login'
            });
}

exports.logout = function(req, res) {
    req.logout();
      res.redirect('/login');
}

exports.show = function(req, res) {
    var user = req.profile
      res.render('users/show', {
            title: user.name,
                user: user,
                    updated: false
      });
}

exports.showallsensors = function(req, res){
  Sensor.find({user: req.user._id}, function(err, sensors){
    if(err) return err;
    res.render('users/allsensors', {sensors: sensors});
  });
}
exports.signin = function(req, res) {}

exports.info = [
  function(req, res) {
    console.log(req.user);
    res.json({ user_id: req.user.id, name: req.user.name, phoneNumber: req.user.phoneNumber })
  }
]
exports.socketkey = [
  function(req, res){
    var socketKey = {
                      user :req.user,
                      timestamp: new Date()
                    };
    var cipher = crypto.createCipher("aes-256-cbc","SecretPassword");
    var encryptedSocketKey =  cipher.update(JSON.stringify(socketKey), 'utf8', 'base64');
    encryptedSocketKey +=  cipher.final('base64');
    res.json({status: 'ok', timestamp: socketKey.timestamp, socketKey: encryptedSocketKey});

}
]
exports.decryptSocketKey = function(encryptedSocketKey, cb){
  var decipher = crypto.createDecipher('aes-256-cbc', "SecretPassword");
  var user = decipher.update(encryptedSocketKey, 'base64', 'utf8');
  user += decipher.final('utf8');
  cb(JSON.parse(user));
}

