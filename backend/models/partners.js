import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String },
    url: { type: String },
    description: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Partner = mongoose.model("Partner", partnerSchema);
export default Partner;
