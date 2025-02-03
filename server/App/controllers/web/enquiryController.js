const enquiryModel = require('../../model/enquiry'); // ✅ Fixed path

let enquiryInsert = (req, res) => {
    let { name, email, subject, message } = req.body;

    let enquiry = new enquiryModel({
        name,
        email,
        subject,
        message
    });

    enquiry.save()
        .then(() => {
            res.send({ message: "Enquiry saved successfully" });
        })
        .catch((err) => {
            if (err.name === "ValidationError") {
                let errors = Object.values(err.errors).map(e => e.message);
                return res.status(400).json({ message: "Validation Error", errors });
            }
            res.status(500).json({ message: "Server Error", error: err.message });
        });
};

let enquirylist = async (req, res) => {
    try {
      let enquiry = await enquiryModel.find();
      res.send({ status: 1, enquiries: enquiry }); // Use 'enquiries' instead of 'EnquiryTable'
    } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  };

  // Update Enquiry
let enquiryUpdate = async (req, res) => {
    let { id } = req.params;
    let { name, email, subject, message } = req.body;

    try {
        let updatedEnquiry = await enquiryModel.findByIdAndUpdate(id, { name, email, subject, message }, { new: true });
        if (!updatedEnquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        res.json({ message: "Enquiry updated successfully", enquiry: updatedEnquiry });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// Delete Enquiry
let enquiryDelete = async (req, res) => {
    let { id } = req.params;

    try {
        let deletedEnquiry = await enquiryModel.findByIdAndDelete(id);
        if (!deletedEnquiry) {
            return res.status(404).json({ message: "Enquiry not found" });
        }
        res.json({ message: "Enquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = { enquiryInsert, enquirylist, enquiryUpdate, enquiryDelete };
