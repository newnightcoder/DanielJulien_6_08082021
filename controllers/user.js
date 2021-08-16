import User from "../models/User.js";

export const createUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // create user in DB
    const newUser = await User.create(user);
    console.log("user added:", newUser);
  } catch (error) {
    console.log(`Oops! ${error.message}`);
    res.send(`Oops! ${error.message}`);
  }
};

export const logUser = async (req, res) => {
  // 1- check if user is already in DB
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // 2- create JWT
    // const token = createToken(newUser._id);
    // res.cookie("JWT", token, { httpOnly: true, maxAge: 1000 * 60 * 3 });
    // console.log(`JWT created!!! ${token}`);

    // 3- send user to frontend
    res.status(200).json(user);
  } catch (error) {
    console.log(`Oops! ${error.message}`);
    res.send(`Oops! ${error.message}`);
  }
};
