import fs from "fs";
import path from "node:path";
import mime from "mime-types";
import handleError from "../utils/handleError.js";
import { readerDownload, readExist, readStat } from "../libs/reader.js";

const DB_PATH = path.join(process.cwd(), "./src/database/");

const STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
const json_files = fs.readFileSync(`${DB_PATH}/files.json`, "utf-8");

async function dbWriter(db) {
  fs.writeFileSync(
    `${DB_PATH}/files.json`,
    JSON.stringify(db, null, 2),
    "utf-8"
  );
}

export async function downloadFile(req, res) {
  const { file } = req.query;
  if (!file) handleError(res, "REQUIRE_FILE_PATH", 500);
  try {
    if (!(await readExist(file))) {
      handleError(res, "FILE_NOT_FOUND", 500);
    } else {
      let info = await readStat(file);
      if (info.isDirectory()) {
        handleError(res, "NOT_IS_FILE", 500);
      } else {
        await readerDownload(res, file);
      }
    }
  } catch (err) {
    handleError(res, "INVAILD_PATH_FOLDER", 500);
  }
}
/*
export async function downloadsFile(req, res, next) {
  const { file } = req.query;
  if (!file) {
    handleError(res, "REQUIRE_FILE_PATH", 500);
  } else {
    let STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
    try {
      if (!fs.existsSync(STORAGE_PATH + `${file}`)) {
        res.send({ message: "NO_FILE_FOUND" });
      } else if (fs.existsSync(STORAGE_PATH + `${file}`)) {
        let info = fs.statSync(STORAGE_PATH + `${file}`);
        if (info.isDirectory()) {
          handleError(res, "NOT_IS_FILE", 500);
        } else {
          const mimeType = mime.lookup(STORAGE_PATH + `${file}`);
          const filename = path.basename(STORAGE_PATH + `${file}`);
          const head = {
            "Content-Type": mimeType,
            "Content-Disposition": "attachment; filename=" + filename,
            "Content-Disposition": "inline; filename=" + filename,
          };
          res.writeHead(200, head);
          const fileStream = fs.createReadStream(STORAGE_PATH + `${file}`);
          fileStream.pipe(res);
        }
      }
    } catch (e) {
      handleError(res, "INVAILD_PATH_FOLDER", 500);
    }
  }
}
*/
export async function uploadFile(req, res) {
  res.send({ message: "ok" });
}
