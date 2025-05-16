const express = require('express');
const router = express.Router();
const superadminController = require('../Controllers/superadminController');

// Get a superadmin by ID
router.get('/:id', superadminController.getSuperadminById);

// Update a superadmin by ID
router.put('/:id', superadminController.updateSuperadmin);

// Get a superadmin by Email
router.post('/find-user', superadminController.findUserByEmail);

// Login a superadmin
router.post('/login', superadminController.login);

// Forgot Password
router.post('/forgot-password', superadminController.forgotPassword);

// Reset Password
router.post('/reset-password', superadminController.resetPassword);

router.post('/send-registration-link', superadminController.sendRegistrationLink);

router.put('/update-profile/:id', superadminController.updateProfile);

router.get('/history/:id', superadminController.getHistoryByAdminId);

router.get('/getsuperAdminInfoMail/:mail', superadminController.findSuperAdminEmail);
module.exports = router;
