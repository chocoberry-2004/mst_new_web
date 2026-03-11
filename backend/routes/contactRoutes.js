import express from "express";
import {
  getContactInfo,
  updateContactInfo,
} from "../controllers/contactController.js";

const router = express.Router();

router.get("/", getContactInfo);
router.post("/", updateContactInfo); // Use POST or PUT to update the main contact info

export default router;
