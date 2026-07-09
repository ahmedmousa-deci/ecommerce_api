import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The Category name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxLength: [2000, "Description is too long"],
    },
    slug: {
      type: String,
      required: [true, "The slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Please enter a valid slug"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
