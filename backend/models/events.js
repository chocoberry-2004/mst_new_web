import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Event Title for Default",
    },
    type: {
      type: String,
      lowercase: true,
      default: "tech",
    },
    date: {
      type: String,
      default: Date.now,
    },
    time: {
      type: String,
      default: "9:00 am",
    },
    venue: {
      type: String,
    },
    description: {
      type: String,
      default: "Description",
    },
    status: {
      type: String,
      enum: {
        values: ["upcoming", "past"],
      },
      lowercase: true,
      default: "upcoming",
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    registered: {
      type: Boolean,
      default: false,
    },
    imageURL: [
      {
        type: String,
      },
    ],
    videoURL: String,
  },
  { timestamps: true },
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
