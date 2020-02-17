const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, require: true},
  proposals: [{type: Schema.Types.ObjectId, ref:"Proposal"}]
})

UserSchema.pre("save", (next) => {
  const user = this;
  
  if (!user.isModified("passowrd")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = (password, done) => {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  })
}

module.exports = mongoose.model("User", UserSchema)