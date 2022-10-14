import axios from "axios"

const clienteAxios = axios.create({
  baseURL: 'https://backend-bia-production.up.railway.app/api/'
})

export default clienteAxios