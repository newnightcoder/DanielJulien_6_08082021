import express from "express";
import multer from "multer";
import * as saucesController from "../controllers/sauces.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

// multer config
const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../images");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.fieldname}`);
  },
});
const imgUpload = multer({ imgStorage: imgStorage }).single("image");

// Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.logUser);
router.get("/", saucesController.getAll);
router.post("/", imgUpload, saucesController.addSauce);
router.get("/:id", saucesController.getOne);
router.put("/:id", saucesController.updateSauce);
router.delete("/:id", saucesController.deleteSauce);

export default router;
