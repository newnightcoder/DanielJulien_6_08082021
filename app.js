import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as path from "path";
import "./dbConfig.js";
import authRoute from "./routes/authRoute.js";
import saucesRoute from "./routes/saucesRoute.js";
const app = express();

const port = process.env.PORT || "3000";

const __dirname = path.resolve();

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes middlewares
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", authRoute);
app.use("/api/sauces", saucesRoute);

app.listen(port, (err) => {
  if (err) console.log(`server error: ${err.message}`);
  console.log(`Server running on port ${port}🔥`);
});
