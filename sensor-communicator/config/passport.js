
var  OAuthStrategy = require('passport-oauth').OAuthStrategy;
var memoryDb = require('../lib/memoryDb.js');

exports.boot = function (passport, config) {
  // require('./initializer')

  // serialize sessions
  passport.serializeUser(function(user, done) {
    console.log('serializing user');
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    user = memoryDb.get('user');
    done(err, user);
  })

  var oauthstrat = new OAuthStrategy({
         requestTokenURL: config.cc.oauthServer + '/oauth/request_token'
      ,  accessTokenURL: config.cc.oauthServer + '/oauth/access_token'
      ,  userAuthorizationURL: config.cc.oauthServer + '/dialog/authorize'
      ,  consumerKey: config.cc.consumerKey
      ,  consumerSecret: config.cc.consumerSecret
      ,  callbackURL: config.cc.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      return done(null,profile);
    }
  );
  oauthstrat.userProfile = function(token, tokenSecret, params, done) {
  this._oauth.get(config.cc.oauthServer + '/api/userinfo', token, tokenSecret, function(err, body, res){
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err));}

    try {
      var json = JSON.parse(body);
      console.log(json);
      var profile = {provider: 'cloudcordinator'};
      profile.id = json.user_id;
      profile.name = json.name;
      profile.token = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret}};
  return done(null, profile);
    } catch(e){
      done(e);
    }
  });
  
  }

  passport.use('cloudcordinator-auth', oauthstrat);

}
