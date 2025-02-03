const express = require('express');
const { enquiryInsert, enquirylist, enquiryDelete, enquiryUpdate} = require('../../controllers/web/enquiryController'); // Fixed function name
const enqrouter = express.Router();

enqrouter.post("/insert", enquiryInsert);
enqrouter.get("/view",enquirylist)
enqrouter.put('/update/:id', enquiryUpdate); 
enqrouter.delete('/delete/:id', enquiryDelete); 

module.exports = enqrouter;
