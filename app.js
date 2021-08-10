import express from "express";
import "./dbConfig.js";
import router from "./routes/router.js";
const app = express();

const PORT = process.env.PORT || "8080";

// App middlewares (to read req.body etc...)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route middlewares
app.get("/", (req, res) => {
  res.send("hey hey");
});

app.use("/api/auth", router);

app.listen(PORT, (err) => {
  if (err) console.log(`server error ${err}`);
  console.log(`Server running on port ${PORT}🔥`);
});
