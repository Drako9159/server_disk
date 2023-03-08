import fs from "fs";
import path from "node:path";
import handleError from "../utils/handleError.js";

const DB_PATH = path.join(process.cwd(), "./src/database/");
const STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
const json_files = fs.readFileSync(`${DB_PATH}/files.json`, "utf-8");

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
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
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
        
        const size = formatBytes(info.size)
      
        let fileData = {
          size: size,
          type: infoExt,
          isDirectory: info.isDirectory()
        }
        res.send({ data: fileData })
        
        /*
        res.download(STORAGE_PATH + `${file}`, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("NOT_DOWNLOAD_FILE");
          }
        });*/
      }
    } catch (e) {
      handleError(res, "INVAILD_PATH_FOLDER", 500);
    }
  }
}
export async function downloadFile(req, res) {
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
        res.download(STORAGE_PATH + `${file}`, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("NOT_DOWNLOAD_FILE");
          }
        });
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
