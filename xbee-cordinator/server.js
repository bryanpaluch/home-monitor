var util = require('util');
var XBee = require('svd-xbee').XBee;
var request = require('request');
var xbee = new XBee({port: '/dev/ttyUSB0', baudrate:9600});
//var nStore = require('nstore');
//var sensorDb = nStore('data/sensors.db');
var EventEmitter = require('events').EventEmitter;
var handler = new EventEmitter();
//Start the xbee radio
require('./lib/cordinator.js').boot(handler);

//Connect to cloud service and listen to events
require('./lib/socket.js').boot(handler);

//Manages events
require('./lib/eventHandler.js').boot(handler);
