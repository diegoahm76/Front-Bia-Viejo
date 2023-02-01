import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const clienteEstaciones: AxiosInstance = axios.create({
  baseURL: "https://isamc2022-001-site1.itempurl.com/",
  //baseURL: "http://localhost:5105/",
});

clienteEstaciones.interceptors.request.use(
  async (request: AxiosRequestConfig) => {
    try {
      const { userinfo: { tokens } } = JSON.parse(localStorage.getItem('userInfo')!);
      if (tokens.access) {
        request.headers!['Authorization'] = `Bearer ${tokens.access}`;
      }
    } catch (e) { }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default clienteEstaciones;
