import express from "express";
import {
  createFAQ,
  getAllFAQs,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faqController.js";

const router = express.Router();

router.get("/", getAllFAQs);
router.post("/", createFAQ);
router.put("/:id", updateFAQ);
router.delete("/:id", deleteFAQ);

export default router;
