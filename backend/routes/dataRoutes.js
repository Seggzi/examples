// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/auth");
// const Wallet = require("../models/Wallet");

// // 📌 Route for Purchasing Data
// router.post("/purchase", authMiddleware, async (req, res) => {
//     const { network, plan, phone } = req.body;
//     const userId = req.user.id;

//     const plans = {
//         "1GB": 300,
//         "2GB": 600,
//         "5GB": 1500
//     };

//     if (!plans[plan]) return res.status(400).json({ message: "Invalid data plan" });

//     const cost = plans[plan];
//     let wallet = await Wallet.findOne({ userId });

//     if (!wallet || wallet.balance < cost) {
//         return res.status(400).json({ message: "Insufficient balance" });
//     }

//     wallet.balance -= cost;
//     await wallet.save();

//     return res.json({ message: `Successfully purchased ${plan} on ${phone}. New balance: ₦${wallet.balance}` });
// });

// module.exports = router;
