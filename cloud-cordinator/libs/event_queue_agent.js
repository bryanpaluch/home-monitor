var redis = require('redis');
var ip;
var uuid = require('node-uuid');

function boot(redisip){
  var handler = require('./event_handler').getHandler();
  var pubclient = redis.createClient(null, redisip, null);
  pubclient.select(3, function(){});

  handler.on('event::new', function(evt){
   var event = { id: uuid.v1(), time: new Date().getTime(), evt: evt};
   console.log("pushing event to queue");
   console.log(event);
   pubclient.rpush("eventQueue", JSON.stringify(event), function(){});
  });
}


module.exports.boot = boot;
