var redis = require('redis');
var ip;
var uuid = require('node-uuid');

function boot(redisip){
  var handler = require('./event_handler').getHandler();
  var pubclient = redis.createClient(null, redisip, null);
  pubclient.select(3, function(){});
  
  var subclient = redis.createClient(null, redisip, null);
  subclient.select(3, function(){
    var listen = function(){ 
      subclient.brpoplpush( "actionQueue",  "actionWorkQueue","0", function (err,  evt){
        var event = null; 
        try{ 
          event = JSON.parse(evt); 
        }catch(e){
          console.log('error parsing event');
          //Log err
        }
        if(err){
          //Log err
        }else if(event){
          handler.emit('action::new', event);
        }else{
          //Log err
        }
        listen();
      });
    };
    listen();
    handler.on('action::complete', function(evt){
      pubclient.lrem(["actionWorkQueue", "-1", JSON.stringify(evt)],function(err, reply){
        console.log('removed ' + evt.id + ' from workQueue');
      });
    });
  });
  handler.on('event::new', function(evt){
   var event = { id: uuid.v1(), time: new Date().getTime(), evt: evt};
   console.log("pushing event to queue");
   console.log(event);
   pubclient.rpush("eventQueue", JSON.stringify(event), function(){});
  });
}


module.exports.boot = boot;
