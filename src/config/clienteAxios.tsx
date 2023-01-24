import axios from "axios";
const clienteAxios = axios.create({
  baseURL: "https://backend-bia-beta-production.up.railway.app/api/",
});

clienteAxios.interceptors.request.use(
  async (request) => {
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

export default clienteAxios;
