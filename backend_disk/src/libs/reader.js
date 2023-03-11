import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";
import handleFormatBytes from "../utils/handleFormatBytes.js";

function pathJoin(seed, file = "") {
  const library = {
    pathIcons: path.join(process.cwd(), `./src/assets/iconsFormat/${file}`),
    pathFolders: path.join(process.cwd(), `./src/storage/${file}`),
  };
  return library[seed].replace(/\\/gi, "/");
}

export async function readerDownload(res, file) {
  const mimeType = mime.lookup(pathJoin("pathFolders", file));
  const filename = path.basename(pathJoin("pathFolders", file));
  const head = {
    "Content-Type": mimeType,
    "Content-Disposition": "attachment; filename=" + filename,
    "Content-Disposition": "inline; filename=" + filename,
  };
  res.writeHead(200, head);
  const fileStream = fs.createReadStream(pathJoin("pathFolders", file));
  fileStream.pipe(res);
}
export async function readIcons() {
  return fs.readdirSync(pathJoin("pathIcons"));
}

export async function sendIcon(res, file) {
  res.download(pathJoin("pathIcons", file), (err) => {
    if (err) {
      res.status(500).send({ message: "NOT_SERVE_FILE" });
    }
  });
}

export function getExtname(file) {
  return path.extname(pathJoin("pathFolders", file));
}

export async function readFolders(file = "") {
  try {
    return fs.readdirSync(pathJoin("pathFolders", file));
  } catch (err) {
    return "ERROR_FOLDER_NOT_FOUND";
  }
}

export async function readStat(file) {
  return fs.statSync(pathJoin("pathFolders", file));
}

export async function readExist(folder) {
  return fs.existsSync(pathJoin("pathFolders", folder));
}

export async function getFoldersData(folder = "") {
  let data = [];

  const folders = await readFolders(folder);
  if (folders == "ERROR_FOLDER_NOT_FOUND") return folders;
  const icons = await readIcons();
  const gen = pathJoin("pathFolders", folder);

  folders.forEach(async (e) => {
    let info = fs.statSync(gen + "/" + e);
    let isDirectory = info.isDirectory();
    let size = handleFormatBytes(info.size);
    let typeFormat = getExtname(e).toLowerCase();
    let type = "";

    if (isDirectory) {
      type = "folder";
      typeFormat = "folder-fill.svg";
    } else {
      type = getExtname(e);
      typeFormat = typeFormat.split(".")[1] + ".png";
    }
    if (!icons.includes(typeFormat)) {
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
  return await data;
}

export async function createFolder(folder) {
  fs.mkdirSync(pathJoin("pathFolders", folder));
}
