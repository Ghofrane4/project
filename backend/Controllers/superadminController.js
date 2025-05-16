const { Superadmin, History } = require('../Models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendEmail } = require('./nodemailerConfig');
const { Op } = require('sequelize'); // Import Op from Sequelize
const { User } = require('../Models');
const { sequelize } = require('../Models');


const JWT_SECRET = '1234567';



// Get a superadmin by ID
const getSuperadminById = async (req, res) => {
    try {
        const superadmin = await Superadmin.findByPk(req.params.id);
        if (superadmin) {
            res.status(200).json(superadmin);
        } else {
            res.status(404).json({ error: 'Superadmin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a superadmin by ID
const updateSuperadmin = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const superadmin = await Superadmin.findByPk(req.params.id);
        if (superadmin) {
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                superadmin.password = hashedPassword;
            }
            superadmin.fullname = fullname || superadmin.fullname;
            superadmin.email = email || superadmin.email;
            await superadmin.save();

            // Log the action in history
            await History.create({
                userId: superadmin.id,
                action: `Updated profile with fullname: ${fullname}, email: ${email}`,
                timestamp: new Date()
            });

            res.status(200).json(superadmin);   
        } else {
            res.status(404).json({ error: 'Superadmin not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const findUserByEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            res.status(200).json({user});
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a superadmin by Email
const findSuperAdminEmail = async (req, res) => {
    try {
        const { mail } = req.params; // ← correction ici
        const user = await Superadmin.findOne({ where: { email: mail } });
        if (user) {
            res.status(200).send(String(user.id));

        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Superadmin.findOne({ where: { email } });
        let role = 'superadmin';

        if (!user) {
            user = await User.findOne({ where: { email } });
            role = 'user';
        }

        if (!user) {
            return res.status(404).json({ message: 'Email or password invalid!' });
        }

        const validPass = bcrypt.compareSync(password, user.password);

        if (!validPass) {
            return res.status(404).json({ message: 'Email or password invalid!' });
        }        

        const payload = {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role
        };

        const token = jwt.sign(payload, JWT_SECRET);

        // Log the login action
        await History.create({
            userId: user.id,
            action: 'Logged in',
            timestamp: new Date()
        });

        res.status(200).json({
            token,
            user: {
                id: user.id,
                fullname: user.fullname,
                email: user.email,
                companyName: user.companyName,
                companyFunctionality: user.companyFunctionality,
                phoneNumber: user.phoneNumber,
                role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};




// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let user = await Superadmin.findOne({ where: { email } });
        let role = 'superadmin';

        if (!user) {
            user = await User.findOne({ where: { email } });
            role = 'user';
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

        await user.save();

        const resetUrl = `http://localhost:3000/auth/reset-password/${token}`;
        const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

        await sendEmail(user.email, 'Password Reset Request', message);

        // Log the forgot password action
        await History.create({
            userId: user.id,
            action: 'Requested password reset',
            timestamp: new Date()
        });

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Forgot Password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        let user = await Superadmin.findOne({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { [Op.gt]: Date.now() } // Ensure the token has not expired
            }
        });

        if (!user) {
            user = await User.findOne({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: { [Op.gt]: Date.now() }
                }
            });
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Update password and clear the reset token and expiration
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        // Log the password reset action
        await History.create({
            userId: user.id,
            action: 'Password reset',
            timestamp: new Date()
        });

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Reset Password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Send Registration Link
const sendRegistrationLink = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if a user with the email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate a registration token
        const token = crypto.randomBytes(20).toString('hex');
        const tokenExpires = Date.now() + 3600000; // 1 hour from now

        // Create a new User entry with just the email and token
        const newUser = await User.create({
            email,
            role: 'admin', // or any role you want to set
            resetPasswordToken: token,
            resetPasswordExpires: tokenExpires,
            isActive: false, // User is inactive until they complete registration
            companyName: null,
            companyFunctionality: null,
            phoneNumber: null
        });

        // Create the registration URL
        const registrationUrl = `http://localhost:3000/auth/register/${token}`;
        const message = `You have been invited to register as an admin. Click the link to set up your account: ${registrationUrl}`;

        // Send the registration email
        await sendEmail(email, 'Admin Registration Invitation', message);

        // Log the send registration link action
        await History.create({
            userId: newUser.id,
            action: `Sent registration link to email: ${email}`,
            timestamp: new Date()
        });

        res.status(200).json({ message: 'Registration link sent' });
    } catch (error) {
        console.error('Error in sendRegistrationLink:', error); // Log the full error details
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

// Update Profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id; // Use `userId` to be more descriptive
        const { fullname } = req.body; // Only get fullname from request body

        console.log(`Updating Superadmin with ID: ${userId}`);

        // Find the superadmin by ID
        const superadmin = await Superadmin.findOne({ where: { id: userId } });
        if (!superadmin) {
            return res.status(404).json({ message: 'Superadmin not found' });
        }

        // Update the superadmin fields
        await superadmin.update({
            fullname: fullname || superadmin.fullname,
        });

        // Log the update profile action
        await History.create({
            userId: superadmin.id,
            action: `Updated profile to fullname: ${fullname}`,
            timestamp: new Date()
        });

        // Return the updated superadmin
        res.status(200).json(superadmin);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getHistoryByAdminId = async (req, res) => {
    try {
        const { id } = req.params;
        const history = await History.findAll({ where: { userId: id }, order: [['timestamp', 'DESC']] });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    getSuperadminById,
    updateSuperadmin,
    login,
    forgotPassword,
    resetPassword,
    sendRegistrationLink,
    updateProfile,
    getHistoryByAdminId,
    findUserByEmail,
    findSuperAdminEmail
};

