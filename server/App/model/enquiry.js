const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let enquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: true },
    message: { type: String, required: true }
});

const enquiryModel = mongoose.model('enquiry', enquirySchema); 

module.exports = enquiryModel;
