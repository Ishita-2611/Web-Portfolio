const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Form submission route
app.post('/send-message', (req, res) => {
    // Extract form data
    const { username, email, phone, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ishitakhanduja26@gmail.com',
            pass: 'Ishu*26112004'
        }
    });

    // Email message
    const mailOptions = {
        from: 'ishitakhanduja26@gmail.com',
        to: 'ishitakhanduja26@gmail.com',
        subject: 'New Message from Contact Form',
        text: `Name: ${username}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending message');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Message sent successfully');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


