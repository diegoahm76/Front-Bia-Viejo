import axios from "axios";

const clienteEstaciones = axios.create({
  baseURL: "https://microserv.net/",
});

export default clienteEstaciones;
