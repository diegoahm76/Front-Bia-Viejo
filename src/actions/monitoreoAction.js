import clienteEstaciones from "../config/clienteAxiosEstaciones";
import {
  COMENZAR_DESCARGA_MONITOREO,
  COMENZAR_EDICION_MONITOREO,
  DESCARGA_MONITOREO_ERROR,
  DESCARGA_MONITOREO_EXITO,
  MONITOREO_EDITADO_ERROR,
  MONITOREO_EDITADO_EXITO,
} from "../types/monitoreoTypes";

export const obtenerMonitoreoAction = () => {
  return async (dispatch) => {
    dispatch(descargarMonitoreo(true));

    try {
      const { data: getMonitoreo } = await clienteEstaciones.get("Monitoreo");

      dispatch(descargarMonitoreoExito(getMonitoreo));
    } catch (error) {
      console.log(error);
      dispatch(descargarMonitoreoError(true));
    }
  };
};

const descargarMonitoreo = (estado) => ({
  type: COMENZAR_DESCARGA_MONITOREO,
  payload: estado,
});

const descargarMonitoreoExito = (monitoreo) => ({
  type: DESCARGA_MONITOREO_EXITO,
  payload: monitoreo,
});

const descargarMonitoreoError = (estado) => ({
  type: DESCARGA_MONITOREO_ERROR,
  payload: estado,
});

export const editarMonitoreAction = (monitoreo) => {
  return async (dispatch) => {
    dispatch(editarMonitoreo());
    try {
      await clienteEstaciones.put("Monitoreo", monitoreo);
      dispatch(editarMonitoreoExito(monitoreo));
    } catch (error) {
      console.log(error);
      dispatch(editarMonitoreoError(true));
    }
  };
};

const editarMonitoreo = () => ({
  type: COMENZAR_EDICION_MONITOREO,
});

const editarMonitoreoExito = (monitoreo) => ({
  type: MONITOREO_EDITADO_EXITO,
  payload: monitoreo,
});

const editarMonitoreoError = (estado) => ({
  type: MONITOREO_EDITADO_ERROR,
  payload: estado,
});
