const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate")

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, require: true},
  outgoing_proposals: [{type: Schema.Types.ObjectId, ref:"Proposal"}],
  incoming_proposals: [{type: Schema.Types.ObjectId, ref:"Proposal"}]
})

UserSchema.pre("save", function(next) {

  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch); // return for asynchronous stuff
  });
};

UserSchema
  .pre('findOne', Populate('outgoing_proposals'))
  .pre('findOne', Populate('incoming_proposals'))
  .pre('find', Populate('outgoing_proposals'))
  .pre('find', Populate('incoming_proposals'))
  .pre('findById', Populate('outgoing_proposals'))
  .pre('findById', Populate('incoming_proposals'))
  

module.exports = mongoose.model("User", UserSchema)