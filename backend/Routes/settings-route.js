const express = require('express');
const router = express.Router();
const settingsController = require('../Controllers/settingsController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/settings' directory exists
const uploadDir = 'uploads/settings';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for image uploads (e.g., logo or background image)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Use multer's `.fields()` method to handle multiple file uploads
const upload = multer({
    storage: storage
}).fields([
    { name: 'Logo', maxCount: 1 },         // Upload a single Logo image
    { name: 'BackgroundImage', maxCount: 1 } // Upload a single BackgroundImage
]);

// Create Settings
router.post('/add', upload, settingsController.createSettings);

// Update Settings by ID
router.put('/update/:id', upload, settingsController.updateSettings);

// Get a single Settings by ID
router.get('/display/:id', settingsController.getSettingsById);

// Delete Settings by ID
router.delete('/delete/:id', settingsController.deleteSettings);

module.exports = router;
