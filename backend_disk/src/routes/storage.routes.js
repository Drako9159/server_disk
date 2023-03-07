import { Router } from "express";
import {  getFolders, newFolder } from "../controllers/storage.controllers.js";
const router = Router();

router.get("/storage", getFolders)

router.post("/storage", newFolder)

export default router;