import { Router } from "express";

import { getDirectories, getIcons, getDownload, createFolder } from "../controllers/storage.v2.controller.js";
const router = Router();

router.get("/storage", getDirectories);

router.get("/storage/icons", getIcons)

router.get("/storage/download", getDownload )

router.post("/storage", createFolder)

export default router;
