ioclient = require('socket.io-client');
memoryDb = require('./memoryDb.js');
request = require('request');

var cloudinitiated;

exports.boot = function (handler, config){

  console.log('booting cloud connection...', cloudinitiated);
  function checkCloudInitiated(){ 
   console.log('checking for cloud credentials'); 
    setTimeout(function(){
      cloudinitiated = memoryDb.checkCloudInit();
      console.log(cloudinitiated);
      if(cloudinitiated)
        connectToCloud();
      else
         checkCloudInitiated();
    }, 2000);
  }
  checkCloudInitiated();

  handler.on('cloudinitiated', function(){
    connectToCloud();
  });

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

  function connectToCloud(){
    console.log('requesting a socket key from cloud');
    var oauth = { consumer_key : config.cc.consumerKey,
                  consumer_secret: config.cc.consumerSecret,
                  token: cloudinitiated.token.token,
                  token_secret: cloudinitiated.token.attributes.tokenSecret
                };

    request.get({url: 'http://homemonitor.bryanpaluch.com/api/socketkey',
             oauth: oauth, json : true}
             ,function(error, response, body ){
      if(!error){
        console.log('received socket key');
        socket = ioclient.connect('http://homemonitor.bryanpaluch.com',
                                  {
                                    transports: ['websocket'],
                                    connectTimeout: 5000});
        socket.on('connect_failed', function(){
          console.log('connection to the cloud cordinator failed, trying again later');
        });
        socket.on('connect', function(){
          socket.emit('auth', body);
          console.log('connected to cloud cordinator, ready for actions');
        });
        socket.on('action', function(data){
          console.log('received action from cloud cordinator', data);
        });
        socket.on('disconnect', function(){
          console.log('disconnected from cloud cordinator, will try to reconnect soon');
        });
      }else{
        console.log('error', error);
      }
    });

  }

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
