import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "Teacher",
    },
    degree: {
      type: String,
      default: "B.Sc",
    },
    expertise: {
      type: String,
      default: "Teaching",
    },
    award: {
      type: String,
      default: "Best",
    },
    bio: {
      type: String,
      default: "Bio",
    },
    profileImageURL: String,
  },
  { timestamps: true },
);

const Lecturer = mongoose.model("Lecturer", lecturerSchema);
export default Lecturer;
