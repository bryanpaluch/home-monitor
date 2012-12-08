ioclient = require('socket.io-client');
memoryDb = require('./memoryDb.js');
request = require('request');

exports.boot = function (handler, config){
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
    var oauth = { consumer_key : config.cc.consumerKey,
                  consumer_secret: config.cc.consumerSecret,
                  token: cloudinitiated.token.token,
                  token_secret: cloudinitiated.token.attributes.tokenSecret
                };
    console.log(oauth);
    request.put({url: 'http://homemonitor.bryanpaluch.com/api/sensor/' + data.sensorId,
             oauth: oauth, json : true, body: data}
             ,function(error, response, body ){
      if(!error){
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
