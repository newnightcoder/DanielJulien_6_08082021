import express from "express";
import * as saucesController from "../controllers/sauces.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

// Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.logUser);
router.get("/sauces", saucesController.getAll);
router.post("/sauces", saucesController.addSauce);

export default router;
