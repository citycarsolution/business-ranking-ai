import mongoose from "mongoose";

const ScanSchema = new mongoose.Schema({
  userId: String,
  url: String,
  score: Number,
  issues: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Scan ||
  mongoose.model("Scan", ScanSchema);
