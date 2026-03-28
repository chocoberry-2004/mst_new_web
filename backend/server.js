import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import publicRoutes from "./routes/publicRoutes.js";
import fs from "fs";

import achievementRoutes from "./routes/achievementRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import lecturerRoutes from "./routes/lecturerRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import partnerRoutes from "./routes/partnerRoutes.js";

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(
//   cors({
//     origin: ["https://mst-new-web.onrender.com", "http://localhost:5173   "],
//   }),
// );

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mst-new-web.onrender.com",
      "https://mst-new-web-shiv.onrender.com",
      "https://www.mstinstitute.net/",
    ],
  }),
);

app.use(express.urlencoded());
app.use(express.json());
dotenv.config();

const uploadDirs = ["uploads/events", "uploads/partners", "uploads/lecturers"];

uploadDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

const mongodbUrl = process.env.MONGODB_URL;

const port = process.env.PORT;

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("Connected to Database."))
  .then(() => {
    app.listen(port, () => {
      console.log(`App is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("MongoDB Error!"));

app.use("/uploads", express.static("uploads"));

app.use("/api/achievements", achievementRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/partners", partnerRoutes);
app.use("/api/lecturers", lecturerRoutes);
app.use("/api/timeline", timelineRoutes);

app.use("/api/", publicRoutes);

// app.listen(port, () => {
//   console.log(`App is running on http://localhost:${port}`);
// });
