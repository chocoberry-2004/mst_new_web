import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/events/");
  },
  filename: (req, file, cb) => {
    // Generates: 1710000000-event-image.jpg
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const eventUpload = multer({ storage });
