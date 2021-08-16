import express from "express";
import jwt from "jsonwebtoken";
import * as userController from "../controllers/user.js";

const router = express.Router();

// JWT creation
const createToken = (id) => {
  return jwt.sign({ id }, "testjwt");
};

// Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.logUser);

export default router;
