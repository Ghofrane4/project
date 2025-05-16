const express = require('express');
const router = express.Router();
const serviceController = require('../Controllers/ServiceController');

// Create a new Service
router.post('/add', serviceController.createService);

// Update Service by ID
router.put('/update/:id', serviceController.updateService);

// Get all Services
router.get('/list', serviceController.getAllServices);

// Get a single Service by ID
router.get('/display/:id', serviceController.getServiceById);

// Delete a Service by ID
router.delete('/delete/:id', serviceController.deleteService);

module.exports = router;
