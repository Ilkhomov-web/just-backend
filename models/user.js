const mongoose = require("mongoose");

// Shema creating for User Model

const Users = mongoose.model('Users', {
  name:{
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cardData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  }
})


module.exports = Users;