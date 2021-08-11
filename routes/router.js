import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/*****************
   JWT creation 
******************/

const createToken = (id) => {
  return jwt.sign({ id }, "testjwt");
};

/*****************
   SIGNUP route 
******************/

router.post("/signup", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // create user in DB
    const newUser = await User.create(user);
    console.log("user added:", newUser);

    // create JWT
    const token = createToken(newUser._id);
    res.cookie("JWT", token, { httpOnly: true, maxAge: 1000 * 60 * 3 });
    res.send(`JWT created!!! ${token}`);
    console.log(`JWT created!!! ${token}`);
  } catch (error) {
    console.log(`Oops! error:${error.message}`);
    res.send(`Oops! error:${error.message}`);
  }
});

router.get("/signup", (req, res) => {
  res.send("ok!");
});

/*****************
   LOGIN route 
******************/

router.post("/login", (req, res) => {
  // const newUser = new User({
  //   email: req.body.email,
  //   password: req.body.password,
  // });
  // User.find((err, doc) => {
  //   res.send(`new User: ${doc}`);
  // });
  // res.send(`${newUser}`);
  // try {
  //   const test = await newUser.save();
  //   console.log(test);
  //   res.send(`status code:${res.statusCode} new user:${test}`);
  // } catch (error) {
  //   res.send(`${error}`);
  // }
});

export default router;
