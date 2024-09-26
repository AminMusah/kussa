const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantityIn: { type: Number, required: true },
    quantityOut: { type: Number, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Inventory ||
  mongoose.model("Inventory", inventorySchema);
