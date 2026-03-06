import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:5001/api/v1",
  headers: {
    Accept: "application/json",
  },
});
