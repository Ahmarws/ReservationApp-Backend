const mongoose = require("mongoose");

const subFieldSchema = new mongoose.Schema({
  SubFieldname: { type: String, required: true },
});
const timeRangeSchema = new mongoose.Schema({
  availableHours: { type: String, required: true }
});
const fieldSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  subFields: [subFieldSchema],
  timeRanges: [timeRangeSchema],
});

module.exports = mongoose.model("Field", fieldSchema);
