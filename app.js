import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import * as path from "path";
import "./dbConfig.js";
import authRoute from "./routes/router.js";
const app = express();

const port = process.env.PORT || "3000";

const __dirname = path.resolve();
// App middlewares (to read req.body etc...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Route middlewares
app.use("/api/auth", authRoute);
app.use("/api/sauces", authRoute);
app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(port, (err) => {
  if (err) console.log(`server error: ${err.message}`);
  console.log(`Server running on port ${port}🔥`);
});
