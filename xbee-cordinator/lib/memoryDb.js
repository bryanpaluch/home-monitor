var sensorDb = require('dirty')('data/sensors.db');
var statusDb = require('dirty')('data/status.db');
var _ = require('underscore');
var sensors = {};
var cloudAuth = false;

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
module.exports.checkCloudInit = function(){
  if(cloudAuth){
    return cloudAuth;
  }else{
    //check db
    var cloudAuth = statusDb.get('user');
    if(cloudAuth){
      console.log('retuned cloud auth', cloudAuth);
      return cloudAuth;
    }else{
      return null;
    }
  }
}

module.exports.sensorDb = sensorDb;
module.exports.statusDb = statusDb;
