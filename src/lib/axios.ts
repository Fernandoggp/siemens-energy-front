import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:5001/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data && data.success === false) {
      const message =
        data.messages && data.messages.length > 0
          ? data.messages[0]
          : "Erro na requisição";

      return Promise.reject(new Error(message));
    }

    return response;
  },
  (error) => {
    if (error.response?.data?.messages?.length) {
      return Promise.reject(new Error(error.response.data.messages[0]));
    }

    if (error.response?.data?.message) {
      return Promise.reject(new Error(error.response.data.message));
    }

    if (error.message) {
      return Promise.reject(new Error(error.message));
    }

    return Promise.reject(new Error("Erro ao conectar com o servidor"));
  }
);