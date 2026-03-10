import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      default: "2000",
    },
    title: {
      type: String,
      default: "Title",
    },
    description: {
      type: String,
      default: "Description",
    },
  },
  { timestamps: true },
);

const Timeline = mongoose.model("Timeline", timelineSchema);
export default Timeline;
