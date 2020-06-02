const mongoose = require("mongoose");

const { Schema } = mongoose;

const sanjuanModel = new Schema({
  name: { type: String },
  description: { type: String },
  hours: { type: Array },
  days: { type: Array },
  contact: { type: String },
});

module.exports = mongoose.model("SanJuan", sanjuanModel);
