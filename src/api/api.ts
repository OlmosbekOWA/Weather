import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: `https://api.weatherapi.com/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "uz",
  },
});

instance.interceptors.request.use(
  (config) => ({ ...config }),
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response: AxiosResponse<any>) => response.data,
    (error) => Promise.reject(error.response?.data || error)
);

export default instance;
