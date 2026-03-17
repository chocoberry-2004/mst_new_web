import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/partners/");
  },
  filename: (req, file, cb) => {
    // Generates a unique filename like 1710000000-microsoft-logo.svg
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const partnerUpload = multer({ storage });


