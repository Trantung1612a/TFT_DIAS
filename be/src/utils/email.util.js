const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = { from: process.env.EMAIL_USER, to, subject, html };
  await transporter.sendMail(mailOptions);
};

const sendOTP = async (email, otp) => {
  await sendEmail({
    to: email,
    subject: "OTP Verification - TFT DIAS",
    html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>This OTP expires in 10 minutes.</p>`,
  });
};

module.exports = { sendEmail, sendOTP };
