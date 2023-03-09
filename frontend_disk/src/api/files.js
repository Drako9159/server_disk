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
export async function getIcons() {
  return axios
    .get("/storage/icons?type=file", { headers: { Accept: "video/mp4;charset=UTF-8" } })
    .then((response) => {
      myUrl = (window.URL || window.webkitURL).createObjectURL(
        new Blob([response.data])
      ); // response.data.data

      var myVid = document.getElementById("vidObj");
      myVid.setAttribute("src", myUrl);
      myVid.play(); //# test playback

      //setVideo(url); //# is this needed?
    });
}
export async function downloadFile(path, name) {
  return await axios
    .request({
      url: `/storage/download?file=${path}`,
      method: "GET",
      responseType: "blob",
    })
    .then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

  //eturn await axios.get(`/storage/download?file=${path}`, );
}
