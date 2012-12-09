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

app.get('/', user.about);
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

app.all('/site*', login.ensureLoggedIn());

app.all('/api*', passport.authenticate('token', { session: false }));
app.get('/api/userinfo', user.info);
app.post('/api/sensor/:sensorMac', sensor.update);
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
