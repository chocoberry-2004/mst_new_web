import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: String,
  type: String,
  level: String,
  duration: String,
  hours_per_week: String,
  fees: {
    amount: Number,
    currency: String,
    paymentOption: {
      type: String,
      enum: ['One-time Payment', "3-month installment plan"],
      default: "One-time Payment"
    }
  },
  class_type: String,
  delivery_methods: [
    {
      mode: {
        type: String,
        enum: ["In-person", "Live Online(Zoom)"],
        default: "In-person"
      },
      location: String
    }
  ],
  prerequisites: [
    {
      type: String,
      required: true
    }
  ]
}, { timestamps: true });

const CourseModel = mongoose.model("Course", courseSchema);
export default CourseModel;