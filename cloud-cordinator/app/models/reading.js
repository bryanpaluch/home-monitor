// user schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('underscore')

var ReadingSchema = new Schema({
    data: {type: Schema.Types.Mixed} 
  , sensor: {type : Schema.ObjectId, ref: 'Sensor'}
  , createdAt : {type : Date, default : Date.now}
});

mongoose.model('Reading', ReadingSchema);
