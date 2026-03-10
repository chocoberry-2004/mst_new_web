import mongoose from "mongoose"

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  organization: String,
  country: String,
  location: String,
  date: String,
  how: String,
  why: String,
  impact: String,
  metrics: {
    totalStudents: Number,
    growthRate: String,
    placementRate: String,
    partnerCompanies: Number,
    globalPartners: Number,
    countriesInvolved: Number,
    passRate: String,
    newCourses: Number,
    studentSatisfaction: String,
    researchPapers: Number,
    internationalJournals: Number,
  },
  certifications: [String],
  imageUrl: { type: String },
  videoUrl: { type: String },
  description: String,
});

const Achievement = mongoose.model("Achievement", achievementSchema);
export default Achievement;
