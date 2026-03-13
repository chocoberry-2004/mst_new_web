import mongoose from "mongoose";

const campusSchema = new mongoose.Schema({
  id: String, // e.g., "yangon-campus-1"
  name: { type: String, required: true },
  address: String,
  mapUrl: String,
  phone: [String],
  email: String,
});

const contactSchema = new mongoose.Schema(
  {
    headquarters: {
      name: String,
      address: String,
      phone: [String],
      email: String,
    },
    campuses: [campusSchema],
  },
  { timestamps: true },
);

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
