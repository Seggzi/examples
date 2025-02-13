const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to verify user
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

// ✅ View Wallet Balance
router.get("/balance", verifyToken, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ balance: user.walletBalance });
});

// ✅ Fund Wallet (Simulated, Replace with Payment API)
router.post("/fund", verifyToken, async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const user = await User.findById(req.user.id);
    user.walletBalance += amount;
    await user.save();

    res.json({ message: "Wallet funded successfully!", balance: user.walletBalance });
});

// ✅ Withdraw Funds
router.post("/withdraw", verifyToken, async (req, res) => {
    const { amount } = req.body;
    if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });

    const user = await User.findById(req.user.id);
    if (amount > user.walletBalance) return res.status(400).json({ error: "Insufficient balance" });

    user.walletBalance -= amount;
    await user.save();

    res.json({ message: "Withdrawal successful!", balance: user.walletBalance });
});

module.exports = router;
