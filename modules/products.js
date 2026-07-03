const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The product name is required"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    requied: [true, "The price must be specifed"],
    min: [1, "The price can't be lower than 1"],
    max: [10_000, "the price can't be higher than 10 000"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    maxLength: [2000, "Description is too long"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "The stock can't be in negative numbers"],
    max: [1000, "The stock can't be higher than 1000 unit"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    enum: [
      "laptops",
      "phones",
      "headphones",
      "tablets",
      "smartwatchs",
      "chargers",
      "powerbanks",
    ],
  },
});

module.exports = mongoose.model("Products", productSchema);
