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
  eventUpload.array('imageURL', 4),
  createEvent,
);

router.put("/:id", eventUpload.array('imageURL', 4), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
