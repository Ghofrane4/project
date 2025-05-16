const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const multer = require('multer');
const path = require('path');


// Set up multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});
const upload = multer({ storage: storage });

// Update user information
router.put('/update-image/:id', upload.single('image'), userController.updatImage);

// Register a user after clicking the link
router.post('/register', userController.registerUser);

// Get all admins
router.get('/admins', userController.getAdmins);

// Activate a user
router.post('/activate/:id', userController.activateUser);


router.post('/deactivate/:id', userController.deactivateUser);


router.put('/update/:id', userController.updateUser);


router.delete('/delete/:id', userController.deleteUser);

router.get('/admin/:id', userController.getAdminById);


router.get('/getUserInfo/:id', userController.getUserInfo);

router.get('/getUserInfoMail/:mail', userController.findUserEmail);






module.exports = router;
