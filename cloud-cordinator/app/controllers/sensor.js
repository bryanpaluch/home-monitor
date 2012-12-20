
var passport = require('passport')
, mongoose = require('mongoose')
, actions = require('../../libs/sensorData.js')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor')
, Reading = mongoose.model('Reading');

//Controller for Site 
exports.update = [
  function(req, res){
  var sensor = req.sensor;
    if(sensor && req.body.name){
      sensor.name = req.body.name;
      sensor.save(function(err){
        if(err) throw (err);
        var type = req.sensor.lastReading.type;
        res.render('sensors/' + type + '/show', {sensor: req.sensor});
      });
    }else{
        var type = req.sensor.lastReading.type;
        res.render('sensors/' + type + '/show', {sensor: req.sensor});
    }
  }
]
export.createAction = [
  function(req, res){
  var type = req.sensor.lastReading.type;
    if(type && actions[type]){
      console.log('creating action forms for sensor type ', actions[type].sensorType);
      res.render('sensors/action', 
                 {actions: actions[type].actions, 
                  type: actions[type].sensorType,
                  sensor: req.sensor
                 }
                );
    }else{
      console.log('sensor type not supported yet ', type);
      res.render('sensors/' + type + '/show', {sensor: req.sensor});
    }

  }
]
exports.show = [
  function(req, res){
  if(req.sensor && req.sensor.lastReading.type){
    var type = req.sensor.lastReading.type;
    console.log(req.sensor);
    res.render('sensors/' + type + '/show', {sensor: req.sensor});
  }else{
    console.log('sensor not found or no type', req.sensor, req.sensor.lastReading.type);
    res.redirect('/notfound');
  }
}
]
//Controller for xbee cordinator API
exports.read = [
  function(req, res) {
    if(req.sensor){
      console.log('sensor already exists, reading');
      var sensor = req.sensor;
      sensor.lastReading = req.body.payload;
      sensor.save(function(err){
        if(err)
          console.log(err);
      });
      var reading = new Reading({ data: req.body.payload,
                                  sensor: sensor._id});
      reading.save(function(err){
        if(err)
          console.log(err);
      });
    }else{
      var sensor = new Sensor({mac: req.body.sensorId,
                               name: 'New Sensor',
                               user: req.user._id,
                               lastReading: req.body.payload});
      sensor.save(function(err){
        if(err) {
          console.log(err);
        }
        console.log(this);
      });
    }
    res.json({ status: 'OK'});
  }
]
