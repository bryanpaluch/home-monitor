
var passport = require('passport')
, mongoose = require('mongoose')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor');
, Reading = mongoose.model('Reading');


exports.create = [
  passport.authenticate('token', {session: false}),
  function(req, res){
    console.log(req.user, req.body);
    res.json({status: 'OK'});
  }
]


exports.read = [
  passport.authenticate('token', { session: false }),
  function(req, res) {
    console.log(req.user);
    res.json({ status: 'OK'});
  }
]
