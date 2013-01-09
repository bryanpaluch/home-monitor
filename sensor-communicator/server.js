var XBee = require('svd-xbee').XBee;
var xbee = new XBee({port: '/dev/ttyUSB0', baudrate:9600});
var EventEmitter = require('events').EventEmitter;
var handler = new EventEmitter();
var app = require('express')()
var server = require('http').createServer(app)
var passport = require('passport')
require('express-namespace')


var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]



//Start the xbee radio
require('./lib/cordinator.js').boot(handler);

//Connect to cloud service and listen to events
require('./lib/cloudconnect.js').boot(handler, config);

//Manages events
require('./lib/eventHandler.js').boot(handler);

//Start the admin interface
require('./config/passport').boot(passport, config)
require('./config/settings').boot(app, config, passport)
require('./interfaces/routes')(app, passport);
server.listen(3000);
