import multer from "multer";

// MULTER CONFIG
// dictionary for mime_types
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
// multer storage config
const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${name}${Date.now()}.${extension}`);
  },
});
// multer ready
const imgUpload = multer({ storage: imgStorage }).single("image");

export default imgUpload;
