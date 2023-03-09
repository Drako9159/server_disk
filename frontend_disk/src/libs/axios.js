import axios from "axios";
const URL = import.meta.env.VITE_BACKEND
const authApi = axios.create({
  baseURL: URL,
});
export default authApi;
