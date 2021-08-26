import express from "express";
import * as userController from "../controllers/user.js";

const authRouter = express.Router();

// Routes
authRouter.post("/signup", userController.createUser);
authRouter.post("/login", userController.logUser);

export default authRouter;
