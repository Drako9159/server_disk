import fs from "fs";
import path from "node:path";
import handleError from "../utils/handleError.js";
import handleFormatBytes from "../utils/handleFormatBytes.js";
import {
  readExist,
  getFoldersData,
  createFolder,
  readIcons,
  sendIcon
} from "../libs/reader.js";
import {
  recoverData,
  checkExist,
  sendIcons,
  sendDownload,
  mkdirFolder,
} from "../libs/reader-v2.js";

const DB_PATH = path.join(process.cwd(), "./src/database/");
const json_files = fs.readFileSync(`${DB_PATH}/files.json`, "utf-8");

// reader files and folders
/*
export async function getsFolders(req, res) {
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
    const readFolders = fs.readdirSync(STORAGE_PATH);
    let dir = STORAGE_PATH.replace(/\\/gi, "/").split("storage/")[1];
    let data = [];
    readFolders.forEach((e) => {
      let info = fs.statSync(STORAGE_PATH + e);
      let isDirectory = info.isDirectory();
      let size = handleFormatBytes(info.size);
      let type = path.extname(STORAGE_PATH + e);

      type = type === "" ? "folder" : type;

      let typeFormat = path.extname(STORAGE_PATH + e).toLowerCase();
      if (!isDirectory) {
        typeFormat = typeFormat.split(".")[1] + ".png";
      } else {
        typeFormat = "folder-fill.svg";
      }
      if (!readIcons.includes(typeFormat)) {
        typeFormat = "file.svg";
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
*/


export async function getFolders(req, res) {
  const { folder } = req.query;
  let folders = []
  if (!folder) {
    folders = await getFoldersData();
  } else {
    folders = await getFoldersData(folder);
  }
  try {
    res.send({ data: folders });
  } catch (error) {
    handleError(res, "NO_FOLDER_SUCH", 404);
  }
}

/*
export async function getIcons(req, res) {
  const { format } = req.query;
  const icons = await readIcons();
  if (!format) {
    res.send({ data: icons });
  } else {
    try {
      if (icons.includes(format)) {
        await sendIcon(res, format)
      } else {
        handleError(res, "FORMAT_NOT_INCLUDE", 404);
      }
    } catch (error) {
      handleError(res, "NO_ICON_SUCH", 404);
    }
  }
}
*/
export async function getIcons(req, res) {
  const { format } = req.query;
  if (!format) {
    res.send({ data: await sendIcons() });
  } else {
    try {
      const data = await sendIcons(format);
      res.download(data, (err) => {
        if (err) {
          handleError(res, "ICON_NOT_INCLUDE", 500);
        }
      });
    } catch (error) {
      handleError(res, "ERROR_QUERY", 500);
    }
  }
}

export async function newFolder(req, res) {
  const { folderPath } = req.query;
  if (!folderPath) handleError(res, "NOT_¨PROVIDER_PATH", 500);
  try {
    if (await readExist(folderPath)) {
      handleError(res, "FOLDER_EXIST", 500);
    } else {
      await createFolder(folderPath);
      res.send({ message: "FOLDER_CREATED" });
    }
  } catch (err) {
    handleError(res, "INVALID_PATH_FOLDER", 500);
  }
}

// create new folder / depreacated
/*
export async function newsFolder(req, res) {
  const { folderPath } = req.body;
  if (!folderPath) {
    handleError(res, "FAIL_FOLDER_PATH", 500);
  } else {
    let STORAGE_PATH = path.join(process.cwd(), "./src/storage/");
    try {
      if (!fs.existsSync(STORAGE_PATH + `${folderPath}`)) {
        fs.mkdirSync(STORAGE_PATH + `${folderPath}`);
        res.send({ message: "FOLDER_CREADO" });
      } else if (fs.existsSync(STORAGE_PATH + `${folderPath}`)) {
        res.send({ message: "FOLDER_EXIST" });
      }
    } catch (e) {
      handleError(res, "INVAILD_PATH_FOLDER", 500);
    }
  }
}
*/
