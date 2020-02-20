const Proposal = require("../models/proposals");
const User = require('../models/users')

module.exports = (app) => {

  // Show all proposals for a user
  app.get("/proposals", (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    
    User.findById(req.user._id)
      .then(user => {
        const payload = user.proposals.map(function(proposal) {
          return {id: proposal.index, title: proposal.title, summary: proposal.summary}
        })
        return res.send({status: 200, message: "Success: Proposal added", proposals: payload})
      })
      .catch(err => {
        console.log(err)
        return res.send({statu: 400, message: "Error", err: err})
      })
  })

  // create new proposal for a user
  app.post("/proposals/new", (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    const proposal = new Proposal(req.body);
    proposal.author = req.user._id
    User.findById(req.user._id)
      .then(user => {
        proposal.index = Object.keys(user.proposals).length;
        user.proposals.push(proposal);
        user.save()
        proposal.save()
        return res.send({status: 200, message: "Success: Proposal added"})
      })
      .catch(err => {
        console.log(err)
        return res.send({status: 400, message: "Error", err: err})
      })
  })

  app.get('/proposal/:index', (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    const num = parseInt(req.params.index)
    User.findById(req.user._id)
      .then(user => {
        if (num >= Object.keys(user.proposals).length){
          return res.send({status: 401, message: "Error: Invalid id"})
        }
        proposal = user.proposals[num]
        return res.send({itle: proposal.title, summary: proposal.summary})
      })
      .catch(err => {
        console.log(err)
        return res.send({status: 400, message: "Error", err: err})
      })
  })

  // Update a proposal at given index
  app.post('/proposal/:index/update', (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    new_prop = req.body
    if (new_prop.title != null && new_prop.summary != null) {
      const num = parseInt(req.params.index)
      User.findById(req.user._id)
        .then(user => {
          Proposal.findById(user.proposals[num])
            .then(proposal => {
              proposal.title = new_prop.title;
              proposal.summary = new_prop.summary
              proposal.save()
              return res.send({status: 200, message: "Success: Proposal updated"})
            })
        })
        .catch(err => {
          console.log(err)
          return res.send({status: 400, message: "Error", err: err})
        })
    }
    
  })

  // delete a proposal using index for a user


  // Update a proposal summary
}