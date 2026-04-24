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
    overview: {
      type: String,
    },
    career_paths: [String],
  },
  { timestamps: true },
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
