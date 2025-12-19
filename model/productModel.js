const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter the product name"],
    minLength: [3, "At 3 characters required"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter the product price"],
    minLength: [1, "no negative value"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter the quantity"],
    minLength: [1, "no negative value"],
  },
  category: {
    type: String,
    required: [true, "Please enter the category"],
    enum: ["vegetable", "fruits", "grains", "spices", "others"],
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  productImage: {
    type: String,
  },
});
const productModel = mongoose.model("productModel", productSchema);
module.exports = productModel;
