import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
  userId: String,
  teamId: String,
  role: {
    type: String,
    enum: ["owner", "admin", "member"],
    default: "member",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Member ||
  mongoose.model("Member", MemberSchema);
