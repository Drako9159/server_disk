import { Router } from "express";
import {
  getFolders,
  newFolder,
  getIcons,
} from "../controllers/storage.controllers.js";
const router = Router();

router.get("/storage", getFolders);

router.post("/storage", newFolder);

router.get("/storage/icons", getIcons);

export default router;
