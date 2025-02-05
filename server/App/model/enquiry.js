const mongoose = require('mongoose');

// Enquiry schema
const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,  // Correct reference to Contact model
    ref: 'Contact'  // Refers to the Contact model
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
