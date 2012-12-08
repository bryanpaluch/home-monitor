
var passport = require('passport')
, mongoose = require('mongoose')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor')
, Reading = mongoose.model('Reading');


exports.create = [
  function(req, res){
    console.log(req.body);
    if(req.sensor){
      console.log('sensor already exists, updating');
    }else{
      var sensor = new Sensor(req.body);
    }
    console.log(req.user, req.body);
    res.json({status: 'OK'});
  }
]


exports.read = [
  function(req, res) {
    console.log('request body:', req.body);
    if(req.sensor){
      console.log('sensor already exists, reading');
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
    
    console.log(req.user, req.body);
    console.log(req.user);
    res.json({ status: 'OK'});
  }
]
