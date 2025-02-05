const express = require('express');
const contactRouter = express.Router();

// ✅ Correct Import Path
const { contactInsert, enquiryWithContactList } = require('../../controllers/web/contactController');

contactRouter.post("/insert", contactInsert);
contactRouter.get("/view", enquiryWithContactList);

module.exports = contactRouter;
