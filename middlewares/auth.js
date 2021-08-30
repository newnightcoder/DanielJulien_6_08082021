import jwt from "jsonwebtoken";

// JWT creation
export const createToken = (id) => {
  return jwt.sign({ id }, "TEST_JWT_SECRET", {
    expiresIn: "1h",
  });
};

// auth middleware
export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "TEST_JWT_SECRET");
    const tokenUserId = decodedToken.id;
    if (req.body.userId && req.body.userId !== tokenUserId) {
      throw new Error("user ID invalide");
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "c'est mort" });
  }
};
