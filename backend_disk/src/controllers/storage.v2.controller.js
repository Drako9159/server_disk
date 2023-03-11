import fs from "node:fs";
import path from "node:path";

import handleError from "../utils/handleError.js";
import handleFormatBytes from "../utils/handleFormatBytes.js";

export function getPath(seed, file = "") {
  const library = {
    pathIcons: path.join(process.cwd(), `./src/assets/iconsFormat/${file}`),
    pathFolders: path.join(process.cwd(), `./src/storage/${file}`),
  };
  return library[seed].replace(/\\/gi, "/");
}
export async function reader(res, seed, folder = "", item = "") {
  try {
    const library = {
      readIcons: fs.readdirSync(getPath("pathIcons")),
      readFolders: fs.readdirSync(getPath("pathFolders", folder)),
      readStat: fs.statSync(getPath("pathFolders", folder) + "/" + item),
      readExtname: path.extname(getPath("pathFolders", folder) + "/" + item),
    };
    return library[seed];
  } catch (err) {
    return `${seed}`.toUpperCase();
  }
}

export async function getFolders(req, res) {
  const { folder } = req.query;
  let folders = [];
  try {
    const icons = await reader(res, "readIcons");

    if (!folder) {
      folders = await reader(res, "readFolders");
    } else {
      folders = await reader(res, "readFolders", folder);
    }

    if (typeof folders == "string") {
      handleError(res, "ERROR_" + folders, 500);
    } else {
      if (folders == []) {
        handleError(res, "EMPTY", 200);
      } else {

        async function iterator() {
          let data = [];
          folders.forEach(async (e) => {
            let info = await reader(res, "readStat", folder, e);
            let size = handleFormatBytes(info.size);
            let isDirectory = info.isDirectory();
            let type = "";
            let icon = "";

            if (isDirectory) {
              type = "folder";
              icon = "folder-fill.svg";
            } else {
              type = await reader(res, "readExtname", folder, e);
              icon = type.split(".")[1] + ".png";
            }

            if (!icons.includes(icon)) icon = "file.svg";

            data.push({
              name: e,
              isDirectory: isDirectory,
              size: size,
              type: type,
              icon_path: icon,
            });
          });
          return await data;
        }

        res.send({ data: await iterator() });
      }
    }
  } catch (err) {
    handleError(res, "INVALID_ARGUMENTS", 500);
  }
}
