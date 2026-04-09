// Run this ONCE to populate the coupons collection:
//   node seedCoupons.js

require('dotenv').config();
const mongoose = require('mongoose');
const Coupon = require('./models/Coupon');

const COUPONS = [
  'SAVE10', 'SAVE20', 'WELCOME15', 'LAUNCH25', 'EARLY30',
  'BONUS10', 'FIRST20', 'SPECIAL15', 'VIP25', 'PROMO30',
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Insert only coupons that don't already exist (avoids duplicate-key errors on re-run)
  for (const code of COUPONS) {
    await Coupon.updateOne({ code }, { $setOnInsert: { code } }, { upsert: true });
  }

  console.log(`Seeded ${COUPONS.length} coupons`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
