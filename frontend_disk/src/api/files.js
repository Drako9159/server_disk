import axios from "../libs/axios";

export async function getFolders() {
  return await axios.get("/storage");
}
export async function getFiles(folderPath) {
  return await axios.get(`/storage?folder=${folderPath}`);
}