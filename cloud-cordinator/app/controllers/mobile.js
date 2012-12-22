/**
 * Module dependencies.
 */
var passport = require('passport')
, mongoose = require('mongoose')
, crypto = require('crypto')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor');

exports.checkMobile = function (req, res){
  if(req.isMobile || req.isTablet){
    console.log('redirecting to mobile site');
    req.redirect('/mobile');
  }else{
    next();
  }
}

exports.unsecure = function(req, res) {
      res.render('mobile/unsecure', {
      });
}

exports.show = function(req, res){
  //make sure we used middleware properly and sensors object was appended to req
  if(req.sensors){
    res.render('mobile/sensors');
  }else{
    res.render('mobile/unsecure');
  }
}
