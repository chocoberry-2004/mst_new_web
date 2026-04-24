import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/achievements/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

const achievementUpload = multer({ storage })
export default achievementUpload