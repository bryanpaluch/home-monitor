
var memoryDb = require('../lib/memoryDb')

module.exports = function (app, passport, auth) {
  
  app.get('*', function(req, res, next){
      console.log('checking cloud init status');
      req.cloudinit = memoryDb.checkCloudInit();
      console.log(req.cloudinit);
      next();
  });

  app.get('/about',function(req,res){
    console.log('rendering about');
    res.render('about/show');
  });

	// conference routes
  var users = require('../app/controllers/users')
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.get('/user', users.show)
  app.put('/user', users.update);
  app.get('/auth/cloudcordinator', passport.authorize('cloudcordinator-auth', {scope: '*',  failureRedirect: '/login'}), users.show);
  app.get('/auth/cloudcordinator/callback', passport.authorize('cloudcordinator-auth', {scope: '*', failureRedirect: '/login'}), users.cloudCordinatorCallback);
	
  app.get('/', function(req, res){
        console.log(req.cloudinit);
         res.redirect('/about');});
}
