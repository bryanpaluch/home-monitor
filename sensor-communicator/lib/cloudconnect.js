var ioclient = require('socket.io-client');
var memoryDb = require('./memoryDb.js');
var request = require('request');

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
    var disconnectTimer = null;
    console.log('requesting a socket key from cloud');
    var oauth = { consumer_key : config.cc.consumerKey,
                  consumer_secret: config.cc.consumerSecret,
                  token: cloudinitiated.token.token,
                  token_secret: cloudinitiated.token.attributes.tokenSecret
                };
    var getKeyAndConnect = function(){
      request.get({url: 'http://homemonitor.bryanpaluch.com/api/socketkey',
               oauth: oauth, json : true}
               ,function(error, response, body ){
          if(!error && response.statusCode !== 500){
          console.log('received socket key');
          var connect = function(){
            socket = ioclient.connect('http://connector.gridreact.com',
                                     {
                                      transports: ['websocket'],
                                      'connect timeout' : 5000, 
                                      'max reconnection limit': Infinity});
          }
          connect();
          socket.on('connect_failed', function(){
            console.log('connection to the cloud cordinator failed, trying again later');
            disconnectTimer = setTimeout(function(){
              console.log('attempting to connect');
              connect();
              }, 30000);
          });
          socket.on('authsuccess', function(data){
            console.log("sucessful auth");
          });
          socket.on('authfailure', function(data){
            console.log("bad auth tryin again");
          });
          socket.on('connect', function(){
            if(disconnectTimer)
              clearInterval(disconnectTimer);
            socket.emit('auth', body);
            handler.emit('web_up');
            console.log('connected to cloud cordinator, ready for actions');
          });
          socket.on('action', function(data){
            console.log('received action from cloud cordinator', data);
            handler.emit('web_action', data);
          });
          socket.on('disconnect', function(){
            handler.emit('web_down');
            console.log('disconnected from cloud cordinator, will try to reconnect soon');
            disconnectTimer = setTimeout(function(){
              console.log('attempting to connect');
              connect();
              }, 30000);
          });
        }else{

          disconnectTimer = setTimeout(function(){
            console.log('attempting to connect');
            getKeyAndConnect();
            }, 5000);
          console.log('did not connect waiting to try again');
          console.log('error', error);
        }
      });
    }
    getKeyAndConnect();

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
