const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  userDate: {type: Date, default: Date.now,},
  userMap: { type: String, required: true },
  product: [{
    name: { type: String, required: true },
    image: { type: String, required: true },
    size: {type: Array, required: true},
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  }]
});

module.exports = mongoose.model('Orders', orderSchema);
