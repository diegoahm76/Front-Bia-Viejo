import { useEffect, useState } from "react";
import clienteEstaciones from "../config/clienteAxiosEstaciones";

const useAlarmas = () => {
  const [dataAlarmas, setDataAlarmas] = useState([]);

  useEffect(() => {
    const { data } = clienteEstaciones.get("Alarmas");
    console.log(data);
  }, []);
  return {
    dataAlarmas,
  };
};
export default useAlarmas;
