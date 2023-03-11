import { Router } from "express";

import { getFolders } from "../controllers/storage.v2.controller.js";
const router = Router();

router.get("/storage", getFolders);

//router.post("/storage", newFolder);

//router.get("/storage/icons", getIcons);

export default router;
