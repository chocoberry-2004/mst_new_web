import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: [
      {
        type: String
      }
    ],
    degree: [
      {
        type: String
      }
    ],
    expertise: [
      {
        type: String
      }
    ],
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

