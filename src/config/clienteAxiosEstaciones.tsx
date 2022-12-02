import axios, { AxiosInstance } from "axios";

export const clienteEstaciones: AxiosInstance = axios.create({
  baseURL: "https://microserv.net/",
});

export default clienteEstaciones;
