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
    console.log("img uploadée", file);
  },
});
const imgUpload = multer({ imgStorage: imgStorage });

// Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.logUser);
router.post("/", imgUpload.single("image"), saucesController.addSauce);
router.get("/", saucesController.getAll);
router.get("/:id", saucesController.getOne);

export default router;
