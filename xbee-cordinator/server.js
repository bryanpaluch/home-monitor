var util = require('util');
var XBee = require('svd-xbee').XBee;
var request = require('request');
var xbee = new XBee({port: '/dev/ttyUSB0', baudrate:9600});
var nStore = require('nstore');
var EventEmitter = require('events').EventEmitter;
var sensorDb = nStore.new('data/sensors.db', function(){
                  console.log('database loaded');
  });
var statusDb = nStore.new('data/status.db', function(){
                  console.log('status db loaded');
  });
var handler = new EventEmitter();
//Start the xbee radio
require('./lib/cordinator.js').boot(handler);

//Connect to cloud service and listen to events
require('./lib/socket.js').boot(handler, sensorDb, statusDb);

//Manages events
require('./lib/eventHandler.js').boot(handler);
