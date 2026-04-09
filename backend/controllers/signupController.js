const User = require('../models/User');
const Coupon = require('../models/Coupon');
const { sendCouponEmail } = require('../utils/mailer');

async function signup(req, res) {
  const { name, email } = req.body;

  // --- 1. Basic input validation ---
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters.' });
  }

  try {
    // --- 2. Check for duplicate email ---
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    // --- 3. Grab an available coupon ---
    // findOneAndUpdate is atomic — prevents two simultaneous signups claiming the same coupon
    const coupon = await Coupon.findOneAndUpdate(
      { isUsed: false },                    // find an unused coupon
      { isUsed: true, usedAt: new Date() }, // immediately mark it used
      { returnDocument: 'after' }           // return the updated document
    );

    if (!coupon) {
      return res.status(503).json({ error: 'No coupons available at the moment. Try again later.' });
    }

    // --- 4. Save the new user ---
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      couponCode: coupon.code,
    });

    // --- 5. Link coupon back to the user ---
    coupon.usedBy = user._id;
    await coupon.save();

    // --- 6. Send the coupon via email ---
    // We don't await this — if email fails, the signup still succeeds.
    // The user has their coupon; email is best-effort.
    sendCouponEmail(user.email, user.name, coupon.code).catch((err) => {
      console.error('Email send failed for', user.email, ':', err.message);
    });

    // --- 7. Respond with success ---
    return res.status(201).json({
      message: 'Signup successful! Check your email for your coupon.',
      coupon: coupon.code,
    });

  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}

module.exports = { signup };
