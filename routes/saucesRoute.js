import express from "express";
import multer from "multer";
import * as saucesController from "../controllers/sauces.js";

const saucesRouter = express.Router();

// multer config
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
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
const imgUpload = multer({ storage: imgStorage }).single("image");

saucesRouter.get("/", saucesController.getAll);
saucesRouter.post("/", imgUpload, saucesController.addSauce);
saucesRouter.get("/:id", saucesController.getOne);
saucesRouter.put("/:id", imgUpload, saucesController.updateSauce);
saucesRouter.delete("/:id", saucesController.deleteSauce);

export default saucesRouter;
