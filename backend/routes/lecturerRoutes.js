import express from "express";
import {
  createLecturer,
  getLecturers,
  updateLecturer,
  deleteLecturer,
} from "../controllers/lecturerController.js";
import { lecturerUpload } from "../middlewares/lecturerUpload.js";

const router = express.Router();

router.get("/", getLecturers);

// Use .single('image') to match the field name from your frontend form
router.post("/", lecturerUpload.single("image"), createLecturer);

router.put("/:id", lecturerUpload.single("image"), updateLecturer);

router.delete("/:id", deleteLecturer);

export default router;
