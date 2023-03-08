import axios from "../libs/axios";

export async function getFolders() {
  return await axios.get("/storage");
}
export async function getFiles(folderPath) {
  return await axios.get(`/storage?folder=${folderPath}`);
}
export async function createFolder(navs, folderPath) {
  let check = `${navs}${folderPath}`;
  const res = await axios.post("/storage", { folderPath: check });
  res.headers["Content-Type"];
  return res;
}
export async function uploadFile(path, file) {
  const formData = new FormData();
  formData.append("filePath", path);
  formData.append("myFile", file);

  return await axios.post("/storage/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function getInfo(path) {
  return await axios.get(`/storage/info?file=${path}`);
}
