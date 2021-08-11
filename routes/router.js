import express from "express";
import User from "../models/User.js";

const router = express.Router();

/*****************
   SIGNUP route 
******************/

router.post("/signup", async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    console.log("user added:", newUser);
    res.send(`status code:${res.statusCode} \n new user:${newUser}`);
  } catch (error) {
    res.send(`Oops! error:${error.message}`);
    console.log(`Oops! error:${error.message}`);
  }
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
