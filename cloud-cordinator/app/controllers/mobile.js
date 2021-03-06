/**
 * Module dependencies.
 */
var passport = require('passport')
, mongoose = require('mongoose')
, crypto = require('crypto')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor'),a
, sensorData = require('../../libs/sensorData.js')
, _ = require('underscore')

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
exports.action = function(req, res){
    res.redirect('/mobile/sensors');
}

exports.show = function(req, res){
  //make sure we used middleware properly and sensors object was appended to req
  if(req.sensors){
    var actions = [];
    res.render('mobile/show', {sensors : req.sensors, sensorData: sensorData, actions: actions});
  }else{
    res.render('mobile/unsecure');
  }
}
