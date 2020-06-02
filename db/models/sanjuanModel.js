const mongoose = require('mongoose');

const { Schema } = mongoose;

const sanjuanModel = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Array, required: true },
  days: { type: Array, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model('SanJuan', sanjuanModel);
