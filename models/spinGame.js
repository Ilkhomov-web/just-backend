const mongoose = require("mongoose");

// Schema for creating Products
const SpinGame = mongoose.model("SpinGame", {
  userName: {
    type: String,
    required: true,
  },
  spinWin: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})


module.exports = SpinGame