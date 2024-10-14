const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    subcategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
    ],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
