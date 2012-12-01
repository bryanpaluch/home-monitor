var sensorDb = require('dirty')('data/sensors.db');
var statusDb = require('dirty')('data/status.db');
var _ = require('underscore');
var sensors = {};

sensorDb.on('load', function(){
  console.log('sensor db loaded');
});

statusDb.on('load', function(){
  console.log('status db loaded');
});

module.exports.checkChange = function(data, cb) {
  sensor = sensors[data.sensorId];
  if(_.isEqual(sensor,data)){
    cb(data, false);
  }else{
    sensors[data.sensorId]=  data;
    cb(data, true);
  }
} 

module.exports.registerSensor = function(data, cb){
 sensor = sensorDb.get(data.sensorId);
 if(sensor){
    console.log('sensor already in database');
    cb();
  }else{
    sensorDb.set(data.sensorId, data);
    cb();
  }
}

module.exports.sensorDb = sensorDb;
module.exports.statusDb = statusDb;
