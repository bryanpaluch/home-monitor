var memoryDb = require('./memoryDb.js');

exports.boot = function(handler){
  handler.on('sensor_reading', function(data){
    memoryDb.checkChange(data,function(obj, updated){
      if(updated || obj.payload.event){
        if(obj.payload.event){
          console.log('has an event object, ignoring cache and sending to cache');
        }
        handler.emit('cloud_save', data);
      }
    });
  });
  handler.on('sensor_annouce', function(data){
    console.log('sensor annoucing');
    console.log(data);
  });
  handler.on('web_action', function(data){
    console.log('web action', data);
    console.log('determining route');
    handler.emit(data.mac, data);
  });

  handler.on('web_down', function(data){
    console.log('The connection to the web is down');
  });

  handler.on('web_up', function(data){
    console.log('The connection to the web is up, starting sync process');

  });
}
