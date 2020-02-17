const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProposalSchema = new Schema({
  title: {type: String, required: true},
  summary: {type: String, required: true},
  approved: {type: Boolean, default: False},
  // author: {type: Schema.Types.ObjectId, ref:"User", required:true}
})

module.exports = mongoose.model("Proposal", ProposalSchema);