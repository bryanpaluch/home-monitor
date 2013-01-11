/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
 , User = mongoose.model('User') 
 , Sensor = mongoose.model('Sensor') 
 , login = require('connect-ensure-login');
  
module.exports = function(app, passport){


var site = require('../app/controllers/site');
var user = require('../app/controllers/user.js');
var admin = require('../app/controllers/admin.js');
var oauth = require('../app/controllers/oauth.js');
var sensor = require('../app/controllers/sensor.js');
var mobile = require('../app/controllers/mobile.js');

app.get('/', mobile.checkMobile, user.about);
app.get('/login', site.loginForm);
app.post('/login', user.login);
app.get('/logout', site.logout);
app.get('/account', site.account);
app.get('/signup', user.signup);
app.post('/users', user.create);
app.get('/users/:userId', user.show);
app.post('/users/session', user.session);
app.get('/dialog/authorize', oauth.userAuthorization);
app.post('/dialog/authorize/decision', oauth.userDecision);
app.post('/oauth/request_token', oauth.requestToken);
app.post('/oauth/access_token', oauth.accessToken);
//All mobile website routes
app.all('/mobile/*', login.ensureLoggedIn('/mobile'));
app.get('/mobile', mobile.unsecure);
app.get('/mobile/sensors', user.getallsensors, mobile.show);
app.get('/mobile/action/:action/:sensorId', user.getallsensors, mobile.show);
app.post('/mobile/action/:action/:sensorId', sensor.action, mobile.action);
//All browser website routes
app.all('/site*', login.ensureLoggedIn());
app.get('/site/sensors', user.getallsensors, site.show);
app.get('/site/sensor/:sensorId', sensor.show);
app.post('/site/sensor/:sensorId', sensor.update, site.jsonResponse);
app.get('/site/action/:sensorId', sensor.showactions);
app.param('sensorId', function(req, res, next, id){
  console.log('looking for ', id); 
  Sensor.findOne({_id: id})
    .exec(function(err, sensor){
      if(err) return next(err);
      if(!sensor){
        next();
      }else{
        req.sensor = sensor;
        next();
      }
    });
});



app.all('/api*', passport.authenticate('token', { session: false }));
app.get('/api/userinfo', user.info);
app.get('/api/socketkey', user.socketkey);

//app.post('/api/sensor/:sensorMac', sensor.update);
app.put('/api/sensor/:sensorMac', sensor.read);
app.param('sensorMac', function(req, res, next, id){
  Sensor.findOne({mac:id})
    .exec(function(err, sensor){
      if (err) return next(err);
      if (!sensor){
        req.sensor = false;
        next();
      }else{
        req.sensor = sensor;
        next();
      }
    });
  });

app.all('/admin*', login.ensureLoggedIn(), function(req, res, next){
      console.log('checking if user is admin');
      if(req.user.isAdmin)
        next();
      else
        res.render('admin/notAdmin');
});

app.get('/admin', admin.show);
app.post('/admin/email', admin.email);
app.get('/admin/all', admin.all);
app.get('/admin/user/:userId', admin.showuser);
app.post('/admin/user/:userId', admin.edituser);
app.param('userId', function(req, res, next, id){
  User.findOne({_id: id})
  .exec(function(err, user){
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
});


}
