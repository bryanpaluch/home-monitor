
var io, publishAction;

exports.boot = function(iosocket){
  var handler = require('./event_handler').getHandler();
  io = iosocket;
  handler.on('action::new', function(evt){
   publishAction(evt); 
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


