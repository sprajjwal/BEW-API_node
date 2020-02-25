const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require('../utils/autopopulate')
const User = require('../models/users')

const ProposalSchema = new Schema({
  title: {type: String, required: true},
  summary: {type: String, required: true},
  approved: {type: Boolean, default: false},
  author: {type: String, required:true},
  recipient: {type: String, required:true}
})


module.exports = mongoose.model("Proposal", ProposalSchema);