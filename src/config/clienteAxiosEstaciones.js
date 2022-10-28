import axios from "axios";

const clienteEstaciones = axios.create({
  baseURL: "http://isamc2022-001-site1.itempurl.com/",
});

export default clienteEstaciones;
