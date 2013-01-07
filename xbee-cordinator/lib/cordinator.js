var util = require('util');
var XBee = require('svd-xbee').XBee;
var JParser = require('jParser');
var jsonPacker = require('../lib/jsonPacker.js');
var memoryDb = require('./memoryDb.js');
var _ = require('underscore');

var xbee = new XBee({
	port: '/dev/ttyUSB0',
	baudrate: 9600,
  config: {}
});

var packet_patterns = require('./sensorData');

module.exports.boot = function(emitter) {
	var handler = emitter;
  memoryDb.listSensors(function(sensorObj){
    console.log(sensorObj);
    _.forEach(sensorObj, function(s){
      console.log(s);
    });
  });

	xbee.on("configured", function(config) {
		console.log("XBee Config: %s", util.inspect(config));
	});

	xbee.on("node", function(node) {
	  handler.emit('sensor_annouce', {id: node.remote64.hex, status: 'on', node: node});	
	  if(handler.listeners(node.remote64.hex).length === 0){
      handler.on(node.remote64.hex, function(action){
        console.log('creating binary packet from action');
        console.log(action); 
        var struct = _.find(packet_patterns[action.type].actions, function(a){
                        return a.name == action.name;});
        var jp = new jsonPacker(action.values, struct, {size:6});
        var packed = jp.pack();
        node.send(packed);
        console.log(node.remote64.hex);
        console.log(packed);
      });
    }else{
      console.log('sensor registered but already handling requests to that sensor');
    }

    node.on("data", function(data) {
			//Every packet that comes in should be parsed based on its sensor type.
      //sensor type is defined by the first byte of the array.
      //0x00 is a thermostat
      var type = data[0];
      console.log('sensor with type ' + type + ' sent data');
      if(packet_patterns[type]){
        var parser = new jParser(data, {pattern : packet_patterns[type].reading});
        var packet = parser.parse('pattern');
        console.log(packet);
        handler.emit('sensor_reading', {
             sensorId: node.remote64.hex,
             payload:  packet
        }); 
      }else{
        console.log('unsupported sensor type');
      }
	});

  });
  xbee.on('error', function(err){
    console.log(err);
  });
  try{ 
	xbee.init(function(){
    console.log('created serial connection to xbee');
  });
  }catch(e){
    console.log(e, 'error initializing xbee cordinating... waiting..');
  }
}

