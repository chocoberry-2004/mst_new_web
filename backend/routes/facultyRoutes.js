import express from "express";
import {
  createFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  addCourseToFaculty,
} from "../controllers/facultyController.js";

const router = express.Router();

router.get("/", getAllFaculties);
router.post("/", createFaculty);
router.put("/:id", updateFaculty);
router.delete("/:id", deleteFaculty);

// Special route for managing nested courses
router.post("/:id/courses", addCourseToFaculty);

export default router;
