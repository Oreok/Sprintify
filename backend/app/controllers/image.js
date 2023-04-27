import Image from "../models/userImage.js";
import User from "../models/user.js";
import tryCatch from "./utils/tryCatch.js";
import fs from "fs";
import { promisify } from "util";

export const createImg = tryCatch(async (req, res, next) => {
  //await Image.deleteMany({});
  const images = await Image.create({
    filePath: req.file.filename,
    fileName: req.file.originalname,
  });
  const result = await images.save();

  res
    .status(200)
    .json({ success: true, message: "Image created", result: result });
});

export const getImageById = tryCatch(async (req, res) => {
  const imageId = req.params.imagesId;
  const imageResult = await Image.findById(imageId);
  res.status(200).json({ success: true, result: imageResult });
});

export const deleteImage = tryCatch(async (req, res) => {
  // Remove image from database
  const result = await Image.findByIdAndRemove(req.params.imageId);

  // Remove image from user
  const userId = req.body.user.id;
  await User.findByIdAndUpdate(userId, { image: null });

  // Remove image from file system
  const unlinkAsync = promisify(fs.unlink);
  await unlinkAsync("app/images/" + req.body.imageUrl);

  res
    .status(200)
    .json({ success: true, message: "Image deleted", result: result });
});
