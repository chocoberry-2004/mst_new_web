import express from "express";
import {
  createAchievement,
  getAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";
import { upload } from "../middlewares/upload.js";
import achievementUpload from "../middlewares/achievementUpload.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievementById);

// Creating requires file upload handling
router.post(
  "/",
  achievementUpload.single('imageUrl'),
  createAchievement,
);

router.put("/:id", achievementUpload.single('imageUrl'), updateAchievement);
router.delete("/:id", deleteAchievement);

export default router;
