// user schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var AccessTokenSchema = new Schema({
    key: String
  , secret: String
  , user: {type: Schema.ObjectId, ref:'User'}
  , clientID: String
  , createdAt: {type: Date, default: Date.now}
});


AccessTokenSchema.pre('save', function(next) {
 console.log('saving' + this); 
  next();
});

mongoose.model('AccessToken', AccessTokenSchema);
