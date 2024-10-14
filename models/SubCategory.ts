const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subcategorySchema);
