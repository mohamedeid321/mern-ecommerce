import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", //in production you have to put the domain of the server then /api
  withCredentials: true,
});
export default axiosInstance;
