import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./dbConfig.js";
import authRoute from "./routes/router.js";
const app = express();

const port = process.env.PORT || "3000";

// App middlewares (to read req.body etc...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use(express.static("public"));

// Route middlewares
app.use("/api/auth", authRoute);
app.use("/api", authRoute);

app.listen(port, (err) => {
  if (err) console.log(`server error: ${err.message}`);
  console.log(`Server running on port ${port}🔥`);
});
