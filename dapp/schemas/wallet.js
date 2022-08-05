const mongoose = require("mongoose");

const { Schema } = mongoose;
const walletSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  owners: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Wallet", walletSchema);
