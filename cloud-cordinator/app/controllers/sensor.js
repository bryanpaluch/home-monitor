
var passport = require('passport')
, mongoose = require('mongoose')
, User = mongoose.model('User')
, Sensor = mongoose.model('Sensor')
, Reading = mongoose.model('Reading');


exports.update = [
  function(req, res){
    if(req.sensor){
      console.log('sensor already exists, updating');
      var sensor = new Sensor({
                               name: req.body.name,
                              });
    }else{
      console.log('creation currently not supported by this method'); 
    }
    res.json({status: 'OK'});
  }
]


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
