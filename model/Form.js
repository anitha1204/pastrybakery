const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  message: { type: String, required: true },
  location: { type: String, required: true }
  
});

module.exports = mongoose.model('Form', formSchema);