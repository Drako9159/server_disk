import { Router } from "express";
import { uploadFile, downloadFile } from "../controllers/files.controllers.js";
import uploadMiddleware from "../utils/handleStorage.js";

const router = Router();

router.get("/files", (req, res) => {
  res.send({ message: "hola" });
});

router.get("/storage/download", downloadFile);

router.post("/storage/upload", uploadMiddleware.single("myFile"), uploadFile);

export default router;
