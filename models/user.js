const mongoose = require('mongoose');
const { schema } = require('./group');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['admin', 'user'],  // restrict to allowed values
//     default: 'user',          // default role
//     // required: true,
//   },
  CreatedGroups: { type: mongoose.Schema.Types.ObjectId,ref:"Group"},
 
});

module.exports = mongoose.model('User', userSchema);