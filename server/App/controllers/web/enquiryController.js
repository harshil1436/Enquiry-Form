const Enquiry = require('../../model/enquiry');
const Contact = require('../../model/contact'); 

// ✅ Insert Enquiry with Contact
let enquiryInsert = async (req, res) => {
    let { name, email, subject, message, phone, address } = req.body;

    try {
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let savedContact = null;
        if (phone || address) {
            let contact = new Contact({ phone, address });
            savedContact = await contact.save();
        }

        let enquiry = new Enquiry({
            name, email, subject, message,
            contact: savedContact ? savedContact._id : null 
        });

        let savedEnquiry = await enquiry.save();

        if (savedContact) {
            savedContact.enquiry = savedEnquiry._id; // 🔗 Link Contact back to Enquiry
            await savedContact.save();
        }

        res.json({
            message: "Enquiry saved successfully",
            enquiry: savedEnquiry,
            contact: savedContact || "No contact details provided"
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

const enquirylist = async (req, res) => {
    try {
        // Fetch Enquiries and join the corresponding Contact data
        let enquiries = await Enquiry.find()
            .populate({
                path: 'contact',  // Refers to the Contact model, which is stored in the 'contact' field of Enquiry
                select: 'phone address'  // Only include phone and address from Contact model
            });

        res.json({
            status: 1,
            message: "✅ Enquiries with Contact Details fetched successfully",
            enquiries
        });

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: "❌ Server Error",
            error: err.message
        });
    }
};


// In your enquiryController.js

const enquiryUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, email, subject, message, phone, address } = req.body;
  
    try {
        // Find the enquiry by ID
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
  
        // Update the enquiry
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(
            id, 
            { name, email, subject, message, phone, address },
            { new: true }
        );
  
        res.json({
            message: "Enquiry updated successfully",
            enquiry: updatedEnquiry,
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

// In your enquiryController.js

const enquiryDelete = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the enquiry by ID
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }

        // Delete the associated contact if exists
        if (enquiry.contact) {
            await Contact.findByIdAndDelete(enquiry.contact);
        }

        // Delete the enquiry
        await Enquiry.findByIdAndDelete(id);

        res.json({
            message: "Enquiry and Contact deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


module.exports = { enquiryInsert, enquirylist, enquiryUpdate, enquiryDelete };
