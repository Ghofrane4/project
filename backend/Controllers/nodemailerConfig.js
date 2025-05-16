const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'zayaneyassine6@gmail.com',
        pass: 'grji sutz vefu njcs'
    }
});

const sendEmail = async (to, subject, text) => {    
    const mailOptions = {
        from: 'zayaneyassine6@gmail.com',
        to,
        subject,
        text
    };
    
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
