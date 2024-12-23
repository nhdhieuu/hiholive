import axios from "axios";
import { BASE_URL } from "@/common/constant.ts";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
