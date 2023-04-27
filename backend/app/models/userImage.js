import mongoose from "mongoose";

const UserImgSchema = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model('ImageUploder', UserImgSchema);

export default Image;