const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const imageSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Unique ID for each image, generated using uuid
  url: { type: String, required: true },
  alt: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    category: { type: String, required: true },
    images: [imageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
