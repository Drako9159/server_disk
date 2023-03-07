import axios from "axios";

const authApi = axios.create({
  baseURL: "http://192.168.1.207:5000/api",
});

export default authApi;
