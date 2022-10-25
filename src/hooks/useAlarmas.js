import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteEstaciones from "../config/clienteAxiosEstaciones";

const useAlarmas = () => {
  const [dataAlarmas, setDataAlarmas] = useState([]);
  const [typeAction, setTypeAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const getDataAlarmas = async () => {
    const { data } = await clienteEstaciones.get("Alarmas");
    setDataAlarmas(data);
  };

  useEffect(() => {
    getDataAlarmas();
  }, []);

  const deleteAction = async (params) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Una alarma que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConfiguration(params);
      }
    });
  };

  const deleteConfiguration = async (params) => {
    clienteEstaciones
      .delete(`Alarmas/${params.data.idAlarma}`)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Alarma eliminada correctamente",
          showConfirmButton: false,
          timer: 2000,
        });
        getDataAlarmas();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo pasó, intente de nuevo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editAction = async (params) => {
    setTypeAction("editar");
    setIsModalActive(true);
    try {
      setLoading(true);
      const { data: dataConfig } = await clienteEstaciones.get(
        `Configuraciones/${params.data.objectid}`
      );
      const { data: dataEstacion } = await clienteEstaciones.get(
        `Estaciones/${params.data.objectid}`
      );
      dataConfig.t001nombre = dataEstacion.t001nombre;
      //   resetConfiguracion(dataConfig);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error, intenta de nuevo",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const crearAlarma = () => {
    setTypeAction("crear");
    setIsModalActive(true);
  };

  const closeModal = () => {
    setIsModalActive(false);
  };

  return {
    dataAlarmas,
    deleteAction,
    editAction,
    typeAction,
    setTypeAction,
    loading,
    setLoading,
    crearAlarma,
    isModalActive,
    closeModal,
    getDataAlarmas,
  };
};
export default useAlarmas;
