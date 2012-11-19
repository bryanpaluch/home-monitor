var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('underscore');

exports.show = function(req, res, next) {
    res.render('admin/show' );
}

exports.all = function(req, res, next){
  User.find({},function(err, users){
    if(err) return err;
    res.render('admin/all', {users: users});
  });
}
exports.showuser = function(req, res, next){
  res.render('admin/edituser', {user: req.profile,
                                    message: {flash: 'Admin Edit User'}});
}
exports.edituser = function(req, res, next){
  var user = req.profile;
  console.log(user, 'profile');
  user = _.extend(user, req.body);
  console.log(req.body, 'req.body');
  console.log(user, 'user after extend');
  user.save(function(err, doc){
    if(err){
      console.log(err);
      res.render('admin/edituser', {user: req.profile, 
                                    message: {flash: 'Change Failed',
                                              err: err}});
    }else{
      res.render('admin/edituser', {user: user,
                                    message: {flash: 'Change Updated'}});
    }
  });
}



