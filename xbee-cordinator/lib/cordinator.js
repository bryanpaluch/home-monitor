var util = require('util');
var XBee = require('svd-xbee').XBee;
var jParser = require('jParser');
var xbee = new XBee({
	port: '/dev/ttyUSB0',
	baudrate: 9600
});
var packet_patterns = require('./sensorData');

console.log('crap');
console.log(packet_patterns);

module.exports.boot = function(emitter) {
	var handler = emitter;
	xbee.on("configured", function(config) {
		console.log("XBee Config: %s", util.inspect(config));
	});

	xbee.on("node", function(node) {
  console.log("Node %s connected", node.remote64.hex);
		node.send("Hello!", function() {
			console.log('sent!');
		});
		node.on("data", function(data) {
			//Every packet that comes in should be parsed based on its sensor type.
      //sensor type is defined by the first byte of the array.
      //0x00 is a thermostat
      var type = data[0];
      console.log('sensor with type ' + type + ' sent data');
      if(packet_patterns[type]){
        console.log('parsing');
        var parser = new jParser(data, {pattern : packet_patterns[type].payloadPattern});
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

	xbee.init();
}
