/**
 * Module dependencies.
 */
var passport = require('passport')
, mongoose = require('mongoose')
, crypto = require('crypto')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor'),a
, sensorData = require('../../libs/sensorData.js')

exports.checkMobile = function (req, res, next){
  if(req.isMobile || req.isTablet){
    console.log('redirecting to mobile site');
    res.redirect('/mobile');
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
    console.log('got a sensors object');
    res.render('mobile/show', {sensors : req.sensors, sensorData: sensorData});
  }else{
    res.render('mobile/unsecure');
  }
}
