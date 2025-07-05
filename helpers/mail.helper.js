const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});


const sendMail = async (to, subject, html, text) => {
    let mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to, subject, text, html,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('EMAIL SENT SUCCESSFULLY !!');
    } catch (err) {
        console.error('Error sending email:', err);
    }
};

module.exports = {
    sendMail
};