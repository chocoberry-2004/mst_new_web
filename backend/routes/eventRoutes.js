import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { eventUpload } from "../middlewares/eventUpload.js";

const router = express.Router();

router.get("/", getEvents);

// Accepts one image and one video file
router.post(
  "/",
  eventUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createEvent,
);

router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
