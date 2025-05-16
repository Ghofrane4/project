const express = require('express');
const router = express.Router();
const contactInformationController = require('../Controllers/contactInformationController');

// Create contactInformation
router.post('/add', contactInformationController.createContactInformation);

// Update contactInformation by ID
router.put('/update/:id', contactInformationController.updateContactInformation);

// Get a single contactInformation by ID
router.get('/display/:id', contactInformationController.getContactInformationById);

// Delete contactInformation by ID
router.delete('/delete/:id', contactInformationController.deleteContactInformation);

module.exports = router;
