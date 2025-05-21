const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creater:{ type: mongoose.Schema.Types.ObjectId,ref:"User"}
 
});

module.exports = mongoose.model('Sport', sportSchema);