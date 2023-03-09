import fs from "fs";
import path from "node:path";
import mime from "mime-types";
import handleError from "../utils/handleError.js";

const DB_PATH = path.join(process.cwd(), "./src/database/");
const ICON_FOLDER_FILL = path.join(
  process.cwd(),
  "./src/assets/folder-fill.svg"
);
const ICON_FILE = path.join(process.cwd(), "./src/assets/file.svg");
const STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
const json_files = fs.readFileSync(`${DB_PATH}/files.json`, "utf-8");

export async function getIcons(req, res) {
  const { type } = req.query;
  if (!type) {
    handleError(res, "NOT_TYPE_ICON", 500);
  } else {
    if (type == "folder_fill") {
      res.download(ICON_FOLDER_FILL, (err) => {
        if (err) {
          handleError(res, "NOT_SERVE_FILE", 500);
        }
      });
    } else if (type == "file") {
      res.download(ICON_FILE, (err) => {
        if (err) {
          handleError(res, "NOT_SERVE_FILE", 500);
        }
      });
    } else {
      handleError(res, "ICON_NOT_IDENTIFY", 500);
    }
  }
}

export async function getFolders(req, res) {
  const readFolders = fs.readdirSync(STORAGE_PATH);
  res.send({ folders: readFolders });
}

async function dbWriter(db) {
  fs.writeFileSync(
    `${DB_PATH}/files.json`,
    JSON.stringify(db, null, 2),
    "utf-8"
  );
}

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export async function getInfo(req, res) {
  const { file } = req.query;
  if (!file) {
    handleError(res, "REQUIRE_FILE_PATH", 500);
  } else {
    let STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
    try {
      if (!fs.existsSync(STORAGE_PATH + `${file}`)) {
        res.send({ message: "NO_FILE_FOUND" });
      } else if (fs.existsSync(STORAGE_PATH + `${file}`)) {
        let infoExt = path.extname(STORAGE_PATH + `${file}`);
        infoExt = infoExt.split(".")[1];
        const info = fs.statSync(STORAGE_PATH + `${file}`, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("NOT_INFO_FILE");
          }
        });
        const size = formatBytes(info.size);
        let fileData = {
          size: size,
          type: infoExt,
          isDirectory: info.isDirectory(),
        };
        res.send({ data: fileData });
      }
    } catch (e) {
      handleError(res, "INVAILD_PATH_FOLDER", 500);
    }
  }
}

export async function downloadFile(req, res, next) {
  // receive file path
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

export async function uploadFile(req, res) {
  //console.log(req.file)
  const { title, age, gender, synopsis, stars } = req.body;
  let data = {
    title: title,
    age: age,
    gender: gender,
    synopsis: synopsis,
    stars: stars,
  };
  dbWriter({ data: data });
  res.send({ message: "ok" });
}
