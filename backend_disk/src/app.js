import express from "express";
import path from "path";
import morgan from "morgan";

const app = express();

app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));
app.use(express.json());

// routes
import files from "./routes/files.routes.js";
app.use("/api", files);

import storage from "./routes/storage.routes.js";
app.use("/api", storage);


app.use((req, res, next) => {
  res
    .status(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send("404 Not Found");
});

export default app;
