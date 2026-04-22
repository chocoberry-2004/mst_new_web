import mongoose from "mongoose";

const shortCourseSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Beginner to Intermediate', 'Intermediate', 'Advanced'],
    default: 'Beginner to Intermediate'
  },
  duration: {
    type: String,
    default: '1 Month'
  },
  hours_per_week: {
    type: String,
    default: "3 hours"
  },
  fees: {
    amount: {
      type: Number,
      default: 100
    },
    currency: {
      type: String,
      default: "Kyat"
    }
  }
}, { timestamps: true }
)

const shortCourseModel = mongoose.model("Short_course", shortCourseSchema)
export default shortCourseModel