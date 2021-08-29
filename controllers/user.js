import jwt from "jsonwebtoken";
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
    res.status(201).json({ message: "compte créé avec succès" });
  } catch (error) {
    console.log(`Oops! ${error.message}`);
    res.status(500).json({
      message: `Cette adresse email est déjà utilisée. \n Si vous avez un compte: cliquez sur LOGIN et entrez vos identifiants. \n Si vous n'avez pas de compte: entrez ci-dessus votre adresse email et le mot de passe de votre choix.`,
    });
  }
};

// JWT creation
export const createToken = (id) => {
  return jwt.sign({ id }, "testjwt");
};

export const logUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // 1- check if user is in DB
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) {
      return res
        .status(401)
        .json({ error: "Please sign in to create an account." });
    }
    // 2- JWT
    const token = createToken(isUser._id);
    console.log(`JWT created!!! ${token}`);
    // // 3- send user to frontend
    res.status(200).json({ userId: isUser._id, token: token });
  } catch (error) {
    console.log(`Oops! ${error.message}`);
    res.status(500).json(error);
  }
};

// res.cookie("JWT", token, { httpOnly: false, maxAge: 1000 * 60 * 3 });
