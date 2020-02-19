const Proposal = require("../models/proposals");
const User = require('../models/users')

module.exports = (app) => {
  // create new proposal for a user
  app.post("/propose/new", (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    const proposal = new Proposal(req.body);
    proposal
      .save()
      .then(proposal => {
        return User.findById(req.user._id)
      })
      // add proposal to user
      .then(user => {
        user.proposals.unshift(proposal);
        user.save();
        return res.send({status: 200, message: "Success: Proposal added"})
      })
      .catch(err => {
        console.log(err)
        return res.send({statu: 400, message: "Error", err: err})
      })
  })

  // delete a proposal using title for a user


  // Update a proposal summary
}