ioclient = require('socket.io-client');
memoryDb = require('./memoryDb.js');
request = require('request');

exports.boot = function (handler){
  var cloudinitiated = memoryDb.checkCloudInit('cloudinitiated');


  handler.on('cloud_save', function(data){
    if(cloudinitiated){
      console.log('saving to cloud');
      saveToCloud(data); 
    }else{
      cloudinitiated = memoryDb.checkCloudInit('cloudinitiated');
      if(cloudinitiated){
        console.log('saving to cloud');
        saveToCloud(data); 
      }else{
        console.log('cloud not initiated not saving to cloud');
      }
    }


  });
  
  function saveToCloud(data){
    console.log(data);
    request('http://home-monitor.bryanpaluch.com/api/sensor/' + data.sensorId, function(error, response, body ){
      if(!error && response.status == 200){
        console.log(body);
      }else{
        console.log('error', error);
      }
    });

  }




}
//       request.put({
//				url: 'http://homemonitor.bryanpaluch.com/temp',
//				json: {
//					temp: float
//				}
//        },
//        function(err, res, data) {
//          console.log(data);
//        });
