const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number
});

module.exports = mongoose.model('Contact', contactSchema);
