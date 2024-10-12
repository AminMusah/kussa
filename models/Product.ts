const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    images: [
      {
        // Change this line to define images as an array of objects
        _id: { type: String, default: uuidv4 },
        url: { type: String },
        alt: { type: String, default: "kussa product" }, // Add alt text if needed
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
