import express from "express";
import multer from "multer";
import * as saucesController from "../controllers/sauces.js";

const saucesRouter = express.Router();

// multer config
const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});
const imgUpload = multer({ imgStorage }).single("image");

saucesRouter.get("/", saucesController.getAll);
saucesRouter.post("/", imgUpload, saucesController.addSauce);
saucesRouter.get("/:id", saucesController.getOne);
saucesRouter.put("/:id", imgUpload, saucesController.updateSauce);
saucesRouter.delete("/:id", saucesController.deleteSauce);

export default saucesRouter;
