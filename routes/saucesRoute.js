import express from "express";
import * as saucesController from "../controllers/sauces.js";
import { auth } from "../middlewares/auth.js";
import imgUpload from "../middlewares/multer.js";

const saucesRouter = express.Router();

saucesRouter.get("/", auth, saucesController.getAll);
saucesRouter.post("/", auth, imgUpload, saucesController.addSauce);
saucesRouter.get("/:id", auth, saucesController.getOne);
saucesRouter.put("/:id", auth, imgUpload, saucesController.updateSauce);
saucesRouter.post("/:id/like", auth, saucesController.handleLike);
saucesRouter.delete("/:id", auth, saucesController.deleteSauce);

export default saucesRouter;
