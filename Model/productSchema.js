// 1. Import mongoose
const mongoose = require("mongoose");

// 2. Define schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    // type:ObjectId,
    type: String,
    required: true,
  },
  leasingPeriod: {
    type: String,
    required: true,
  },
  leasingPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// 3. Create model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
