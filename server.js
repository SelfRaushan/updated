const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // To use environment variables for security

const app = express();
const port = 3002; // Changed port from 3001 to 3002

// Middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files like CSS, JS, and images from the 'public' folder
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route to serve the homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for the About page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// Route for the Projects page
app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Route for the Blog page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'blog.html'));
});

// Route for the Resume page
app.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'resume.html'));
});

// Route for the Contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// Route for the Create Resume page
app.get('/create-resume', (req, res) => {
    res.sendFile(path.join(__dirname, 'create-resume.html')); // Ensure this file exists
});

// Route for the thank-you page
app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'thank-you.html')); // Make sure this file exists
});

// Route for the contact form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using email service provider's SMTP details
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use the email service you prefer
        auth: {
            user: process.env.EMAIL_USER, // Email from environment variable
            pass: process.env.EMAIL_PASS, // App password or your email password from environment variable
        },
    });

    // Set up email data
    const mailOptions = {
        from: email, // Sender address
        to: process.env.RECIPIENT_EMAIL, // Recipient address from environment variable
        subject: `New Message from ${name}`, // Subject line
        text: message, // Email body
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Message sent: ' + info.response);
            res.redirect('/thank-you'); // Redirect to the thank-you page
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
