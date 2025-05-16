const mongoose = require("mongoose");

const subFieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const timeRangeSchema = new mongoose.Schema({
  start: { type: String, required: true },
  end: String,
});
const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subFields: [subFieldSchema],
  timeRanges: [timeRangeSchema],
});

module.exports = mongoose.model("Field", fieldSchema);
