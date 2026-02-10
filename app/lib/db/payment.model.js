import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: String,
  plan: String,
  utr: String,
  status: {
    type: String,
    default: "pending", // pending | approved
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
