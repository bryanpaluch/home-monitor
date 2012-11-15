var util = require('util');
var XBee = require('svd-xbee').XBee;

var xbee = new XBee({
	port: '/dev/ttyUSB0',
	baudrate: 9600
});

module.exports.boot = function(emitter) {
	var handler = emitter;
	xbee.on("configured", function(config) {
		console.log("XBee Config: %s", util.inspect(config));
	});

	xbee.on("node", function(node) {: console.log("Node %s connected", node.remote64.hex);
		node.send("Hello!", function() {
			console.log('sent!');
		});
		node.on("data", function(data) {
			//Every packet that comes in should be parsed based on its sensor type.
      //sensor type is defined by the first byte of the array.
      //0x00 is a thermostat
      
			var float = data.readFloatLE(0);
			console.log(float);
			handler.emit('sensor_reading', {
				sensorId: node.remote64.hex,
				payload: {
					temp: float
				}
			});
			request.put({
				url: 'http://homemonitor.bryanpaluch.com/temp',
				json: {
					temp: float
				}
			},
			function(err, res, data) {
				console.log(data);
			});

		});

	});

	xbee.init();
}

