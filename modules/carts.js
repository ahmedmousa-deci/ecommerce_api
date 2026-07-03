const mongoose = require("mongoose");

const cartsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username mustn't be missing"],
      trim: true,
      match: [/^[a-zA-Z0-9_]{3,20}$/, "Username is Invalid"],
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          defualt: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Carts", cartsSchema);
