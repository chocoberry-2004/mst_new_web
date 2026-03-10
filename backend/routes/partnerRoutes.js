import express from "express";
import {
  createPartner,
  getPartners,
  updatePartner,
  deletePartner,
} from "../controllers/partnerController.js";
import { partnerUpload } from "../middlewares/partnerUpload.js";

const router = express.Router();

// GET /api/partners
router.get("/", getPartners);

// POST /api/partners (Handles single logo upload)
router.post("/", partnerUpload.single("logo"), createPartner);

// PUT /api/partners/:id
router.put("/:id", partnerUpload.single("logo"), updatePartner);

// DELETE /api/partners/:id
router.delete("/:id", deletePartner);

export default router;
