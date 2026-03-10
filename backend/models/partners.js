import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    url: { type: String },
    tier: {
      type: String,
      enum: ["platinum", "gold", "silver", "bronze"],
      lowercase: true,
    },
    description: { type: String },
    categories: [String],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;
