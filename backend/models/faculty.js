import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "International Qualification",
    },
    levels: [String],
    duration: {
      type: String,
      default: "6 Months",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: 'active'
    },
    overview: {
      type: String,
    },
    career_paths: [String],
  },
  { timestamps: true },
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
