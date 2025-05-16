const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creater:{ type: mongoose.Schema.Types.ObjectId,ref:"User"}
 
});

module.exports = mongoose.model('Group', groupSchema);