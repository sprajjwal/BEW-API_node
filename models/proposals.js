const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require('../utils/autopopulate')

const ProposalSchema = new Schema({
  title: {type: String, required: true},
  summary: {type: String, required: true},
  approved: {type: Boolean, default: false},
  author: {type: Schema.Types.ObjectId, ref:"User", required:true},
  recipient: {type: Schema.Types.ObjectId, ref:"User", required:true}
})

// ProposalSchema
//   .pre('findOne', this.populate('author'))
//   .pre('findOne', this.populate('recipient'))
//   .pre('find', this.populate('author'))
//   .pre('find', this.populate('recipient'))

module.exports = mongoose.model("Proposal", ProposalSchema);