const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    walletBalance: { type: Number, default: 0 } // New field
});

module.exports = mongoose.model("User", UserSchema);
