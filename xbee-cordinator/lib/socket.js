ioclient = require('socket.io-client');

exports.boot = function (handler, sensorDb, statusDb){
  
  var cloudinitiated;  
  statusDb.get('cloudinit',function(err, doc, key){
    console.log('cloudinitiated?', doc); 
    cloudinitiated = doc;
  });


  handler.on('cloud_save', function(data){
    console.log('Saving locally and saving to cloud');
    db.save('id', data, function(err){
      if(err) throw err;
    });
    if(cloudinitiated){
      //Post to cloud
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
