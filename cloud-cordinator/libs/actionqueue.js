
var io, publishAction;

exports.boot = function(iosocket){
  var handler = require('./event_handler').getHandler();
  io = iosocket;
  handler.on('action::new', function(evt){
   console.log(evt);
   if(evt.act){
     console.log("doing action from the bus");
     publishAction(evt.act);
     handler.emit('action::complete', evt);
   }
   else{
     console.log('doing action from local process');
     publishAction(evt);
    }
  });
}

publishAction = exports.publishAction = function(action){
    if(io.sockets.manager.rooms['/gateway_' +action.user]){
      console.log('connected gateway for sensor emitting event to gateway');
      io.sockets.in('gateway_' + action.user).emit('action', action);
    }else{
      //queue action
      console.log('queuing action ');
    }
}

exports.checkActionQueue = function(user){


}

function saveAction(action){


}

function emitAction(action){

}


