const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    method: {
      type: String,
      enum: ["credit card", "mobile money"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["successful", "failed"],
      default: "successful",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);
