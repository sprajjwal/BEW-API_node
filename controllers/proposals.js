const Proposal = require("../models/proposals");
const User = require('../models/users')

module.exports = (app) => {

  // create new proposal for a user
  app.post("/new_proposal", (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    const proposal = new Proposal(req.body);
    User.findById(req.user._id)
      .then(user => {
        proposal.author = user.username
        user.outgoing_proposals.push(proposal);
        User.findOne({username: req.body.recipient})
          .then(rec => {
            rec.incoming_proposals.push(proposal)
            rec.save()
            user.save()
            proposal.save()
            return res.status(200).send({status: 200, message: "Success: Proposal added"})
          })
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({status: 401, message: "Error", err: err})
      })
  })

  // Show all proposals for a user
  app.get("/outgoing_proposals", (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    
    User.findById(req.user._id)
      .then(user => {
        User.findById(user.recipient)
        const payload = user.outgoing_proposals.map(function(proposal, index) {
          return {
            id: index, 
            title: proposal.title, 
            summary: proposal.summary, 
            recipient: proposal.recipient}
        })
        return res.status(200).send({status: 200, message: "Success:", proposals: payload})
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({statu: 401, message: "Error", err: err})
      })
  })

  // Show all proposals for a user
  app.get("/incoming_proposals", (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    
    User.findById(req.user._id)
      .then(user => {
        const payload = user.incoming_proposals.map(function(proposal, index) {
          return {
            id: index, 
            title: proposal.title, 
            summary: proposal.summary, 
            author: proposal.author,
          }
        })
        return res.status(200).send({status: 200, message: "Success:", proposals: payload})
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({statu: 401, message: "Error", err: err})
      })
  })


  app.get('/outgoing_proposals/:id', (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    const num = parseInt(req.params.id)
    User.findById(req.user._id)
      .then(user => {
        if (num >= Object.keys(user.outgoing_proposals).length){
          return res.status(401).send({status: 401, message: "Error: Invalid id"})
        }
        proposal = user.outgoing_proposals[num]
        User.findOne({username: proposal.recipient})
          .then(recipient => {
            return res.send({
              title: proposal.title, 
              summary: proposal.summary,
              recipient: recipient.username
            })
          })
          
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({status: 401, message: "Error", err: err})
      })
  })

  app.get('/incoming_proposals/:id', (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    const num = parseInt(req.params.id)
    User.findById(req.user._id)
      .then(user => {
        if (num >= Object.keys(user.incoming_proposals).length){
          return res.status(401).send({status: 401, message: "Error: Invalid id"})
        }
        
        proposal = user.incoming_proposals[num]
        User.findOne({username: proposal.author})
          .then(author => {
            console.log(proposal)
            return res.send({
              title: proposal.title, 
              summary: proposal.summary,
              author: author.username,
              approved: proposal.approved
            })
          })
          
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({status: 401, message: "Error", err: err})
      })
  })

  // Update a proposal at given index
  app.post('/outgoing_proposals/:id/update', (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    new_prop = req.body
    if (new_prop.title != null && new_prop.summary != null) {
      const num = parseInt(req.params.id)
      User.findById(req.user._id)
        .then(user => {
          Proposal.findById(user.outgoing_proposals[num])
            .then(proposal => {
              proposal.title = new_prop.title;
              proposal.summary = new_prop.summary
              proposal.save()
              return res.status(200).send({status: 200, message: "Success: Proposal updated"})
            })
        })
        .catch(err => {
          console.log(err)
          return res.status(401).send({status: 401, message: "Error", err: err})
        })
    }
    
  })

  // delete a proposal using id for a user
  app.post('/outgoing_proposals/:id/delete', (req, res) => {
    if (!req.user) {
      return res.status(401).send({status: 401, message: "Unauthenticated request"})
    }
    const num = parseInt(req.params.id)
    User.findById(req.user._id)
      .then(user => {
        User.findOne({username: user.outgoing_proposals[num].recipient})
          .then(recipient => {
            recipient_index = recipient.incoming_proposals.findIndex(obj => 
              String(obj._id) === String(user.outgoing_proposals[num]._id))
            recipient.incoming_proposals.splice(recipient_index)
            recipient.save()
            Proposal.deleteOne({_id: user.outgoing_proposals[num]._id})
            user.outgoing_proposals.splice(num)
            user.save()
            return res.status(200).send({status: 200, message: "Success: Proposal deleted"})
          })
        
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({status: 401, message: "Error", err: err})
      })
  })

  // Approve a proposal

  app.post('/incoming_proposals/:id/approve', (req, res) => {
    if (!req.user) {
      return res.send({status: 401, message: "Unauthenticated request"})
    }
    const num = parseInt(req.params.id)
    User.findById(req.user._id)
      .then(user => {
        Proposal.findById(user.incoming_proposals[num]._id)
          .then(proposal => {
            proposal.approved = true
            proposal.save()
            return res.status(200).send({status: 200, message: "Success: Proposal approved"})
          })
      })
      .catch(err => {
        console.log(err)
        return res.status(401).send({status: 401, message: "Error", err: err})
      })
  })
}