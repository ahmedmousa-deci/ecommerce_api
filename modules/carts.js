import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: [true, "product id is required"],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity cannot be less than 1"],
          default: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Price Can't be less than zero"],
      default: 0,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Carts", cartsSchema);
