const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
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
          default: 1,
        },
      },
    ],
    deliveryAddress: {
      street: { 
        type: String, 
        required: [true, "Street address is required"],
        trim: true 
      },
      city: { 
        type: String, 
        required: [true, "City is required"],
        trim: true 
      },
      state: { 
        type: String, 
        required: [true, "State is required"],
        trim: true 
      },
      zipCode: { 
        type: String, 
        required: [true, "Zip code is required"],
        trim: true 
      }
    },
    orderDate: {
      type: Date,
      default: Date.now,
    }
  }, 
  { timestamps: true } 
);

module.exports = mongoose.model("Orders", ordersSchema);