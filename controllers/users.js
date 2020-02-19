const jwt = require('jsonwebtoken')
const User = require('../models/users')
const checkAuth = require('../utils/checkUser')

module.exports = (app) => {
  // SIGNUP for students
  app.post("/signup", (req, res) => {

    console.log(req.body)
    const user = new User(req.body);
    user
      .save()
      .then(user => {
        console.log(user)
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"})
        res.cookie('pToken', token, { maxAge: 900000, httpOnly: true });
        res.send({status: 200, message:"Success: Signed up", token:token})
      })
      .catch(err => {
        return res.send({status: 200, message:"Error: User name taken", err: err["errmsg"] });
      })
  })

  // LOGIN POST
  app.get('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username}, "username password")
    .then(user => {
      if (!user) {
        // User not found
        return res.send({ status: 401, message: "Error: Wrong Username or Password" });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.send({ status: 401, message: "Error: Wrong Username or Password" });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: "60 days"
        });
        // Set a cookie and redirect to root
        res.cookie("pToken", token, { maxAge: 900000, httpOnly: true });
        return res.send({status: 200, message: "Success: Logged in", token: token})
      });
    })
    .catch(err => {
      console.log(err);
    });
  });
  
  // LOGOUT
  app.get('/logout', (req, res) => {
    res.clearCookie('pToken');
    return res.send({status: 200, message:"Success: Logged out"});
  })
}