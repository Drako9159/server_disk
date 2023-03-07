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
