const express = require('express');
const router = express.Router();
const aboutUsController = require('../Controllers/aboutusController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads/aboutus' directory exists
const uploadDir = 'uploads/aboutus';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Set the destination folder for uploads inside 'aboutus'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});
const upload = multer({ storage: storage });

// Create AboutUs
router.post('/add', upload.single('image'), aboutUsController.createAboutUs);

// Update AboutUs by ID
router.put('/update/:id', upload.single('image'), aboutUsController.updateAboutUs);

// Get a single AboutUs by ID
router.get('/display/:id', aboutUsController.getAboutUsById);

// Delete AboutUs by ID
router.delete('/delete/:id', aboutUsController.deleteAboutUs);

module.exports = router;
