import bcrypt from "bcrypt";
import { createToken } from "../middlewares/auth.js";
import User from "../models/User.js";

// SIGNUP
export const createUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  try {
    if (!user.password.match(passwordRegex)) {
      res.status(401).json({
        message:
          "votre mot de passe doit contenir entre 6 et 20 caractères, avec au moins 1 lettre en capitale et 1 chiffre",
      });
    } else {
      const newUser = await User.create(user);
      console.log("user added:", newUser);
      res.status(201).json({ message: "compte créé avec succès" });
    }
  } catch (error) {
    console.log(`Oops! ${error.message}`);
    res.status(500).json({
      message: `Cette adresse email est déjà utilisée. \n Si vous avez un compte: cliquez sur LOGIN et entrez vos identifiants. \n Si vous n'avez pas de compte: entrez ci-dessus votre adresse email et le mot de passe de votre choix.`,
    });
  }
};

// LOGIN
export const logUser = async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    // 1- check if user is in DB
    const isUser = await User.findOne({ email: req.body.email });
    if (!isUser) {
      // throw "utilisateur non trouvé";
      return res.status(401).json({ error: "utilisateur non trouvé" });
    }
    // 2- verify password
    const isValid = await bcrypt.compare(req.body.password, isUser.password);
    if (!isValid) {
      return res.status(401).json({ error: "password incorrect!" });
    }
    // 3- JWT
    const token = createToken(isUser._id);
    console.log(`JWT created!!! ${token}`);
    // 4- send user to frontend
    res.status(200).json({
      userId: isUser._id,
      token: token,
    });
  } catch (error) {
    console.log(`Oops! ${error}`);
    res.status(500).json(error);
  }
};
