require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

// const message = {
//   from: 'viktoriiareminna@meta.ua',
//   to: 'nikusiavika@gmail.com',
//   subject: 'From Node.js wit love',
//   html: '<h1>Node.js awesome platform</h1>',
//   text: 'Node.js awesome platform',
// };

function sendEmail(message) {
  message.from = 'viktoriiareminna@meta.ua';
  return transporter.sendMail(message);
}

module.exports = sendEmail;
