const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The product name is required"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    price: {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "The price must be specified"],
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
      enum: [
        "laptops",
        "phones",
        "headphones",
        "tablets",
        "smartwatches",
        "chargers",
        "powerbanks",
      ],
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.price = ret.price.toString(); // making the price string in the json response

        return ret;
      },
    },
  },
);

module.exports = mongoose.model("Products", productSchema);
