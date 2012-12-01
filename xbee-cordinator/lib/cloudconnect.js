ioclient = require('socket.io-client');
memoryDb = require('./memoryDb.js');

exports.boot = function (handler){
  var cloudinitiated = memoryDb.statusDb.get('cloudinitiated');


  handler.on('cloud_save', function(data){
    if(cloudinitiated){
      console.log('saving to cloud');
      //Post to cloud
    }else{
      console.log('cloud not initiated not saving to cloud');
    }


  });





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
