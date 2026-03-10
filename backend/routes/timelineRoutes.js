import express from "express";
import {
  createTimeline,
  getTimeline,
  updateTimeline,
  deleteTimeline,
} from "../controllers/timelineController.js";

const router = express.Router();

router.get("/", getTimeline);
router.post("/", createTimeline);
router.put("/:id", updateTimeline);
router.delete("/:id", deleteTimeline);

export default router;
