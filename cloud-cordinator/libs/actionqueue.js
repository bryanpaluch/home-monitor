
var io;

exports.boot = function(iosocket){

io = iosocket;

}

exports.publishAction = function(action){
    console.log('got a publish action request');
    console.log(action);
    console.log(io.sockets.manager.rooms);
    console.log('/gateway_'+ action.user);
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


