const express = require('express');
const { enquiryInsert, enquirylist, enquiryDelete, enquiryUpdate } = require('../../controllers/web/enquiryController'); // Adjust path if needed

const enqrouter = express.Router();

enqrouter.post("/insert", enquiryInsert);
enqrouter.get("/view", enquirylist); // 🔴 ERROR MAY BE HERE
enqrouter.put('/update/:id', enquiryUpdate);
enqrouter.delete('/delete/:id', enquiryDelete);

module.exports = enqrouter;
