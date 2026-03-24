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
    degree: [
      {
        type: String
      }
    ],
    expertise: {
      type: String,
      default: "Teaching",
    },
    profileImageURL: String,
    city: {
      type: String,
      enum: ["Yangon", "Mandalay"],
      default: "Yangon"
    }
  },
  { timestamps: true },
);

const Lecturer = mongoose.model("Lecturer", lecturerSchema);
export default Lecturer;
