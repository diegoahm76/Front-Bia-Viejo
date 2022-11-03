import clienteEstaciones from "../config/clienteAxiosEstaciones";
import Swal from "sweetalert2";
import {
  COMENZAR_DESCARGA_ALARMAS_CONFIG,
  DESCARGA_ALARMAS_CONFIG_COMPLETADO,
  DESCARGA_ALARMAS_CONFIG_ERROR,
  EDITAR_ALARMA_CONFIG_COMPLETADO,
  EDITAR_ALARMA_CONFIG_ERROR,
  OBTENER_ALARMA_CONFIG_EDIT_COMPLETADO,
  OBTENER_ALARMA_CONFIG_EDIT_ERROR,
  PETICION_EDITAR_ALARMA_CONFIG,
  PETICION_OBTENER_ALARMA_CONFIG_EDIT,
} from "../types/alarmasConfigTypes";

export const obternerAlarmasConfigAction = () => async (dispatch) => {
  dispatch(descargarAlarmasConfig(true));

  try {
    const { data } = await clienteEstaciones.get("AlarmasConfiguraciones");
    dispatch(descargarAlarmasConfigCompletado(data));
  } catch (err) {
    dispatch(descargaAlarmasConfigError(true));
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const descargarAlarmasConfig = (estado) => ({
  type: COMENZAR_DESCARGA_ALARMAS_CONFIG,
  payload: estado,
});

const descargaAlarmasConfigError = (estado) => ({
  type: DESCARGA_ALARMAS_CONFIG_ERROR,
  payload: estado,
});

const descargarAlarmasConfigCompletado = (alarmasConfig) => ({
  type: DESCARGA_ALARMAS_CONFIG_COMPLETADO,
  payload: alarmasConfig,
});

export const obtenerAlarmaConfigEditAction =
  (objectid, reset) => async (dispatch) => {
    dispatch(peticionObtenerAlarmaConfigEdit(true));

    try {
      const { data } = await clienteEstaciones.get(
        `AlarmasConfiguraciones/${objectid}`
      );
      console.log(data);
      reset(data);
      dispatch(obtenerAlarmaConfigEditCompletado(data));
    } catch (err) {
      console.log(err);
      dispatch(obtenerAlarmaConfigEditError(false));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }
  };

const peticionObtenerAlarmaConfigEdit = (estado) => ({
  type: PETICION_OBTENER_ALARMA_CONFIG_EDIT,
  payload: estado,
});

const obtenerAlarmaConfigEditCompletado = (dataEdit) => ({
  type: OBTENER_ALARMA_CONFIG_EDIT_COMPLETADO,
  payload: dataEdit,
});

const obtenerAlarmaConfigEditError = (estado) => ({
  type: OBTENER_ALARMA_CONFIG_EDIT_ERROR,
  payload: estado,
});

export const editarAlarmaConfigAction = (dataEdit) => async (dispatch) => {
  dispatch(peticionEditarAlarmaConfig(true));
  console.log("data edit", dataEdit);
  try {
    await clienteEstaciones.put("AlarmasConfiguraciones", dataEdit);
    dispatch(editarAlarmaConfigCompletado(false));
    dispatch(obternerAlarmasConfigAction());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Alarma actualizada correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log(err);
    dispatch(editarAlarmaConfigError(false));
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const peticionEditarAlarmaConfig = (estado) => ({
  type: PETICION_EDITAR_ALARMA_CONFIG,
  payload: estado,
});

const editarAlarmaConfigCompletado = (estado) => ({
  type: EDITAR_ALARMA_CONFIG_COMPLETADO,
  payload: estado,
});

const editarAlarmaConfigError = (estado) => ({
  type: EDITAR_ALARMA_CONFIG_ERROR,
  payload: estado,
});
