import { Router } from "express";
const router = Router();
import multer from "multer";
import { createImg, getImageById, deleteImage } from "../controllers/image.js"


const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, 'app/images');
  },
  filename: (req, file, cd) => {
    cd(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/upload').post(upload.single('myfile')).post(createImg);
router.get("/:imagesId", getImageById);
router.delete("/deleteImage/:imagesId", deleteImage);

export default router