import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    facultyId: { type: String, unique: true }, // Added to match your JSON "FAC-IT-001"
    name: {
      type: String,
      default: "Faculty Name",
    },
    description: {
      type: String,
      required: true,
    },
    courses: [
      {
        id: String, // Matches "C-001", etc.
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          default: "International Qualification",
        },
        levels: [String], // Simple array of strings
        duration: {
          type: String,
          default: "6 Months",
        },
        overview: {
          type: String,
        },
        career_paths: [String], // Simple array of strings
      },
    ],
  },
  { timestamps: true },
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;
