import express from "express";
import "./dbConfig.js";

const app = express();
const PORT = process.env.PORT || "8080";
app.listen(PORT, console.log(`server running on port ${PORT}🔥`));
