// user schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , crypto = require('crypto')
  , _ = require('underscore')

var UserSchema = new Schema({
    name: String
  , email: {type: String, index: true}
  , provider: String
  , hashed_password: String
  , salt: String
  , webrtcProviderToken: {}
  , phoneNumber: {type : String, default: ''}
  , verified :   { type: Boolean, default: false}
  , isAdmin : {type: Boolean, default: false}
})

// virtual attributes
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

// validations
var validatePresenceOf = function (value) {
  return value && value.length
}

// the below 4 validations only apply if you are signing up traditionally

UserSchema.path('name').validate(function (name) {
  return name.length
}, 'Name cannot be blank')

UserSchema.path('email').validate(function (email) {
  return email.length
}, 'Email cannot be blank')


// pre save hooks
UserSchema.pre('save', function(next) {
  next();
})

// methods
UserSchema.method('authenticate', function(plainText) {
  console.log(plainText, this.encryptPassword(plainText));
  return this.encryptPassword(plainText) === this.hashed_password
})

UserSchema.method('makeSalt', function() {
  return Math.round((new Date().valueOf() * Math.random())) + ''
})

UserSchema.method('encryptPassword', function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
})

mongoose.model('User', UserSchema)
