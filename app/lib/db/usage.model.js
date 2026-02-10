import mongoose from "mongoose";

const UsageSchema = new mongoose.Schema({
  userId: String,
  date: String, // YYYY-MM-DD
  count: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Usage ||
  mongoose.model("Usage", UsageSchema);
