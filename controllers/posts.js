const Proposal = require("../models/proposals");
const User = require('../models/user')

module.exports = (app) => {
  app.post("/propose/new", (req, res) => {
    const post = new Proposal(req.body);
    post
      .save()
      .then(
        res.status(200)
      )
  })
}