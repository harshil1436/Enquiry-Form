const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    phone: { type: String, required: false },
    address: { type: String, required: false },
    enquiry: { type: Schema.Types.ObjectId, ref: 'Enquiry' } // 🔗 Reference to Enquiry
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;
