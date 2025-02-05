const Contact = require('../../model/contact');
const Enquiry = require('../../model/enquiry');

const contactInsert = async (req, res) => {
    try {
        let { name, email, subject, message, phone, address } = req.body;

        // 🔹 First, save the enquiry data
        let newEnquiry = new Enquiry({ name, email, subject, message });
        let savedEnquiry = await newEnquiry.save();

        // 🔹 Now, save contact data and link it with enquiry
        let newContact = new Contact({ phone, address, enquiry: savedEnquiry._id });
        let savedContact = await newContact.save();

        // 🔹 Update enquiry document with contact reference
        savedEnquiry.contact = savedContact._id;
        await savedEnquiry.save();

        res.json({
            status: 1,
            message: "✅ Contact and Enquiry saved successfully",
            enquiry: savedEnquiry
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "❌ Server Error",
            error: error.message
        });
    }
};

// ✅ **List Enquiries with Contact Details**
const enquiryWithContactList = async (req, res) => {
    try {
        let enquiries = await Enquiry.find().populate("contact"); // ✅ Fetch enquiries with linked contacts

        res.json({
            status: 1,
            message: "✅ Enquiries fetched successfully",
            enquiries
        });

    } catch (error) {
        res.status(500).json({
            status: 0,
            message: "❌ Server Error",
            error: error.message
        });
    }
};

module.exports = { contactInsert, enquiryWithContactList };
