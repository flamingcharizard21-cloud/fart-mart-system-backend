const mongoose = require("mongoose");
const salesSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter the product name"],
    minLength: [3, "At 3 characters required"],
  },
  userName: {
    type: String,
    required: [true, "Please enter the user name"],
    minLength: [3, "At 3 characters required"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the price"],
    minLength: [1, "no negative value"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity"],
    minLength: [1, "no negative value"],
  },
  payment: {
    type: String,
    required: [true, "Please enter the payment method"],
    enum: ["Online", "COD"],
  },
  date: {
    type: Date,
    required: [true, "Please enter the date"],
  },
});
const salesModel = mongoose.model("salesModel", salesSchema);
module.exports = salesModel;
