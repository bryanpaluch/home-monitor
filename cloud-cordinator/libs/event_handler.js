var EventEmitter2 = require('eventemitter2').EventEmitter2;

var handler = new EventEmitter2();


var getHandler = function(){
  return handler;
}

exports.getHandler = getHandler;

