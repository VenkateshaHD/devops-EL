import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://192.168.49.2:30948/api"
    : import.meta.env.VITE_API_URL || "/api";

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
