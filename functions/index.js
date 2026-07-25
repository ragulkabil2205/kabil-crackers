const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");

const razorpayKeyId = defineSecret("RAZORPAY_KEY_ID");
const razorpayKeySecret = defineSecret("RAZORPAY_KEY_SECRET");

exports.createRazorpayOrder = onRequest(
  {
    secrets: [razorpayKeyId, razorpayKeySecret],
  },
  async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id: razorpayKeyId.value(),
        key_secret: razorpayKeySecret.value(),
      });

      const { amount } = req.body;

      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `KC_${Date.now()}`,
      });

      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err.message,
      });
    }
  }
);