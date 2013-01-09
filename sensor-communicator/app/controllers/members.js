
var mongoose = require('mongoose')
  , Member = mongoose.model('Member')
  , _ = require('underscore')
	, User = mongoose.model('User')

// New member
exports.add = function(req, res){
  res.render('members/add', {
      title: 'Add Family Member'
    , member: new Member({})
  })
}


// Create an member
exports.create = function (req, res) {
  var member = new Member(req.body)
  member.user = req.user

  member.save(function(err){
    if (err) {
      res.render('members/new', {
          title: 'New Member'
        , member: member
        , errors: err.errors
      })
    }
    else {
      res.redirect('/members/'+member._id)
    }
  })
}


// Edit an member
exports.edit = function (req, res) {
  res.render('members/edit', {
    title: 'Edit '+req.member.title,
    member: req.member
  })
}


// Update member
exports.update = function(req, res){
  var member = req.member

  member = _.extend(member, req.body)
	validateTN(member.phoneNumber, member._id, 'Paluch')
  member.save(function(err, doc) {
    if (err) {
      res.render('members/edit', {
          title: 'Edit Member'
        , member: member
        , errors: err.errors
      })
    }
    else {
      res.redirect('/members/'+member._id)
    }
  })
}


// View an member
exports.show = function(req, res){
  res.render('members/show', {
    title: req.member.title,
    member: req.member,
    comments: req.comments
  })
}


// Delete an member
exports.destroy = function(req, res){
  var member = req.member
  member.remove(function(err){
    // req.flash('notice', 'Deleted successfully')
    res.redirect('/members')
  })
}


// Listing of Members
exports.index = function(req, res){
  var perPage = 5
    , page = req.param('page') > 0 ? req.param('page') : 0

  Member
    .find({})
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, members) {
      if (err) return res.render('500')
      Member.count().exec(function (err, count) {
				console.log(members)
        res.render('members/index', {
            title: 'List of Family Members'
          , members: members
          , page: page
          , pages: count / perPage
        })
      })
    })
}

