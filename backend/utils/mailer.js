const nodemailer = require('nodemailer');

// Transporter is created once and reused — creating it per-request is wasteful
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use a Gmail App Password, not your real password
  },
});

/**
 * Sends a coupon code to the user's email.
 * @param {string} toEmail  - recipient email
 * @param {string} name     - recipient name (for personalisation)
 * @param {string} coupon   - coupon code string
 */
async function sendCouponEmail(toEmail, name, coupon) {
  const mailOptions = {
    from: `"Landing Page" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Your exclusive coupon code is here!',
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: auto;">
        <h2>Hey ${name}, welcome aboard!</h2>
        <p>Thanks for signing up. Here's your exclusive discount code:</p>
        <div style="
          background: #f4f4f4;
          border: 2px dashed #888;
          padding: 20px;
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          letter-spacing: 4px;
          border-radius: 8px;
          margin: 24px 0;
        ">
          ${coupon}
        </div>
        <p>Use it at checkout to claim your discount. Happy shopping!</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendCouponEmail };
