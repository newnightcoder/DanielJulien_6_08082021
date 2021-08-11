import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "./dbConfig.js";
import router from "./routes/router.js";
const app = express();

const PORT = process.env.PORT || "3000";

// App middlewares (to read req.body etc...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
// app.use(express.static("public"));

// Route middlewares
app.get("/", (req, res) => {
  res.cookie("cookie", "test");
  res.send("hey hey");
});

app.use("/api/auth", router);

app.listen(PORT, (err) => {
  if (err) console.log(`server error: ${err.message}`);
  console.log(`Server running on port ${PORT}🔥`);
});
