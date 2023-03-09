import fs from "fs";
import path from "node:path";
import handleError from "../utils/handleError.js";

const DB_PATH = path.join(process.cwd(), "./src/database/");

const json_files = fs.readFileSync(`${DB_PATH}/files.json`, "utf-8");

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// reader files and folders
export async function getFolders(req, res) {
  // query need path folder
  // image/png/exampe.png
  const { folder } = req.query;
  let STORAGE_PATH = "";
  if (!folder) {
    STORAGE_PATH = path.join(process.cwd(), `./src/storage/`);
  } else {
    STORAGE_PATH = path.join(process.cwd(), `./src/storage/${folder}/`);
  }
  try {
    let ICONS_PATH = path.join(process.cwd(), `./src/assets/iconsFormat/`);
    const readIcons = fs.readdirSync(ICONS_PATH);
    //console.log(readIcons)
    const readFolders = fs.readdirSync(STORAGE_PATH);
    let dir = STORAGE_PATH.replace(/\\/gi, "/").split("storage/")[1];
    let data = [];

    readFolders.forEach((e) => {
      let info = fs.statSync(STORAGE_PATH + e);
      let isDirectory = info.isDirectory();
      let size = formatBytes(info.size);
      let type = path.extname(STORAGE_PATH + e);

      type = type === "" ? "folder" : type;

      let typeFormat = path.extname(STORAGE_PATH + e).toLowerCase();
      if (!isDirectory) {
        typeFormat = typeFormat.split(".")[1] + ".png";
      } else {
        typeFormat = "folder-fill.svg";
      }
      if(!readIcons.includes(typeFormat)) {
        typeFormat = "file.svg"
      }
      

      data.push({
        name: e,
        isDirectory: isDirectory,
        size: size,
        type: type,
        icon_path: typeFormat,
      });
    });

    res.send({ data: data, directory: dir });
  } catch (error) {
    handleError(res, "NO_FOLDER_SUCH", 404);
  }
}

export async function getIcons(req, res) {
  const { format } = req.query;
  let STORAGE_PATH = path.join(process.cwd(), `./src/assets/iconsFormat/`);
  const readIcons = fs.readdirSync(STORAGE_PATH);
  if (!format) {
    res.send({ data: readIcons });
  } else {
    try {
      let exist = readIcons.includes(format);
      if (exist) {
        res.download(STORAGE_PATH + format, (err) => {
          if (err) {
            handleError(res, "NOT_SERVE_FILE", 500);
          }
        });
      } else {
        handleError(res, "FORMAT_NOT_INCLUDE", 404);
      }
    } catch (error) {
      handleError(res, "NO_ICON_SUCH", 404);
    }
  }
}

// create new folder
export async function newFolder(req, res) {
  // receive folderPath and create
  const { folderPath } = req.body;
  if (!folderPath) {
    handleError(res, "FAIL_FOLDER_PATH", 500);
  } else {
    let STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
    try {
      if (!fs.existsSync(STORAGE_PATH + `${folderPath}`)) {
        fs.mkdirSync(STORAGE_PATH + `${folderPath}`);
        res.send({ message: "FOLDER_CREADO" });
      } else if (fs.existsSync(STORAGE_PATH + `${newFolder}`)) {
        res.send({ message: "FOLDER_EXIST" });
      }
    } catch (e) {
      handleError(res, "INVAILD_PATH_FOLDER", 500);
    }
  }
}
