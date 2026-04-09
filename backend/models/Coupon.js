const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,          // each coupon code is one-of-a-kind
      uppercase: true,       // normalize — "save10" → "SAVE10"
      trim: true,
    },
    isUsed: {
      type: Boolean,
      default: false,        // false = available, true = already claimed
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',           // reference to the User who claimed it
      default: null,
    },
    usedAt: {
      type: Date,
      default: null,         // timestamp of when it was claimed
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Coupon', couponSchema);
