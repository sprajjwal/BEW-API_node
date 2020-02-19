const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate")

const UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  password: {type: String, require: true},
  proposals: [{type: Schema.Types.ObjectId, ref:"Proposal"}]
})

UserSchema.pre("save", function(next) {

  // ENCRYPT PASSWORD
  const user = this;
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
  .pre('findOne', Populate('proposals'))
  .pre('find', Populate('proposals'))
  

module.exports = mongoose.model("User", UserSchema)