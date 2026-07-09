import mongoose from "mongoose";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.price = ret.price.toString(); // making the price string in the json response

        return ret;
      },
    },
    toObject: true,
  },
);

// instead of storing the property inStock in the database and change it manually,
// this sentence will add a virtual property (that does not being stored in the database ), and it will change dynamically with every query.
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

export default mongoose.model("Products", productSchema);
