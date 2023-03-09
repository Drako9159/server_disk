import { Router } from "express";
import { uploadFile, downloadFile, getInfo, getIcons } from "../controllers/files.controllers.js";
import uploadMiddleware from "../utils/handleStorage.js";

const router = Router();

router.get("/files", (req, res) => {
  res.send({ message: "hola" });
});

router.get("/storage/download", downloadFile)

router.get("/storage/info", getInfo)

router.post("/storage/upload", uploadMiddleware.single("myFile"), uploadFile);

//router.get("/storage/icons", getIcons)


export default router;
