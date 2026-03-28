import express from "express";
import {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievementById);

// Creating requires file upload handling
router.post(
  "/",
  upload.fields([
    { name: "imageURL", maxCount: 5 },
    { name: "videoURL", maxCount: 1 },
  ]),
  createAchievement,
);

router.put("/:id", updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
