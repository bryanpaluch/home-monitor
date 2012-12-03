var clients = [
    { id: '1', name: 'Xbee.Cordinator', consumerKey: 'wlekrjawe23ij23r', consumerSecret: 'w3ljasfdlkje' }
];


exports.find = function(id, done) {
  console.log('doing consumer key lookup');
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.id === id) {
      return done(null, client);
    }
  }
  return done(null, null);
};

exports.findByConsumerKey = function(consumerKey, done) {
  for (var i = 0, len = clients.length; i < len; i++) {
    var client = clients[i];
    if (client.consumerKey === consumerKey) {
      return done(null, client);
    }
  }
  return done(null, null);
};
