import mongoose from "mongoose";
import Counter from "./counter.js"; // 1. Import the Counter model

const ordersSchema = new mongoose.Schema(
  {
    // 2. Define the orderNumber field so Mongoose allows it to be saved
    orderNumber: {
      type: Number,
    },
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
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// 3. Modern async hook: No 'next' parameter required.
// If an error happens, Mongoose automatically catches the Promise rejection and safely aborts the save.
ordersSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "orderNumber" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true },
    );

    this.orderNumber = counter.seq;
  }
});

export default mongoose.model("Orders", ordersSchema);
