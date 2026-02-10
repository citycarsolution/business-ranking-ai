import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  name: String,
  ownerId: String,
  plan: {
    type: String,
    default: "agency",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Team ||
  mongoose.model("Team", TeamSchema);
