const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Make sure the service is correct
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password
  }
});

const sendApprovalEmail = async (to, lease) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Lease Approval Notification',
    text: `Dear ${lease.name},

We are pleased to inform you that your lease request for the product has been successfully approved. The lease amount is ${lease.amount} and it is scheduled to commence on ${lease.date}.

We extend our sincere appreciation for choosing our leasing services. Your satisfaction and trust are paramount to us, and we are committed to providing you with exceptional service.

Should you have any questions or require further assistance, feel free to reach out to our team.

Thank you for choosing us!

Warm regards,

Manager
9999967834`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendApprovalEmail;
