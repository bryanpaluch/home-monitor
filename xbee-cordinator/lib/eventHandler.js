exports.boot = function(handler){
 
  handler.on('sensor_reading', function(data){
    console.log('sensor reading', data);
    handler.emit('cloud_save', data);

  });

  handler.on('sensor_annouce', function(data){
    console.log('sensor up', data);
  });
 
  handler.on('web_action', function(data){
    console.log('web action', data);
  });

  handler.on('web_down', function(data){
    console.log('The connection to the web is down');
  });

  handler.on('web_up', function(data){
    console.log('The connection to the web is up, starting sync process');

  });
}
