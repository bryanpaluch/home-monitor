// user schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')

var SensorSchema = new Schema({
    name: String
  , mac: String
  , user: {type : Schema.ObjectId, ref: 'User'}
  , createdAt : {type : Date, default : Date.now}
});


mongoose.model('Sensor', SensorSchema);
