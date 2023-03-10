import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";

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
  return fs.readdirSync(pathJoin("pathFolders", file));
}

export async function readStat(file) {
  return fs.statSync(pathJoin("pathFolders", file));
}

export async function readExist(folder) {
  return fs.existsSync(pathJoin("pathFolders", folder));
}

export async function createFolder(folder) {
  fs.mkdirSync(pathJoin("pathFolders", folder));
}
