const jwt = require('jsonwebtoken')
const User = require('../models/users')

module.exports = (app) => {
  app.post("/signup", (req, res) => {
    const user = new User(req.query);

    user
      .save()
      .then(user => {
        console.log(user)
        const token = jwt.sign({_id: user._id}, process.env.SECRET, {expiresIn: "60 days"})
        res.send(token)
      })
      .catch(err => {
        return res.status(400).send({ err: err });
      })
  })
}