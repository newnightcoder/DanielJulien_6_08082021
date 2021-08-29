import express from "express";
import * as saucesController from "../controllers/sauces.js";
import imgUpload from "../middlewares/multer.js";

const saucesRouter = express.Router();

saucesRouter.get("/", saucesController.getAll);
saucesRouter.post("/", imgUpload, saucesController.addSauce);
saucesRouter.get("/:id", saucesController.getOne);
saucesRouter.put("/:id", imgUpload, saucesController.updateSauce);
saucesRouter.post("/:id/like", saucesController.handleLike);
saucesRouter.delete("/:id", saucesController.deleteSauce);

export default saucesRouter;
