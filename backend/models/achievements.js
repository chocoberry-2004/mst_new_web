import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    organization: String,
    country: String,
    location: String,
    description: String,
    date: Date,
    imageUrl: [{ type: String }],
    videoUrl: { type: String },
  },
  { timestamps: true },
);

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
