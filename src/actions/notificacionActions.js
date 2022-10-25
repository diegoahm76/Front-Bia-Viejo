import clienteEstaciones from "../config/clienteAxiosEstaciones";
import {} from "../types/estacionesTypes";
import Swal from "sweetalert2";
import { formatISO } from "date-fns";
import {
  COMENZAR_DESCARGA_NOTIFICACIONES,
  DESCARGA_NOTIFICACIONES_ERROR,
  DESCARGA_NOTIFICACIONES_EXITO,
} from "../types/notificacionesTypes";

export const obtenerNotificacionesAction = () => async (dispatch) => {
  dispatch(descargarNotificaciones(true));

  try {
    const { data: dataGetNotificaciones } = await clienteEstaciones.get(
      "Notificaciones"
    );
    dispatch(descargarNotificacionExito(dataGetNotificaciones));
  } catch (error) {
    console.log(error);
    dispatch(descargarNotificacionesError(false));
  }
};

const descargarNotificaciones = (estado) => ({
  type: COMENZAR_DESCARGA_NOTIFICACIONES,
  payload: estado,
});

const descargarNotificacionExito = (notificaciones) => ({
  type: DESCARGA_NOTIFICACIONES_EXITO,
  payload: notificaciones,
});

const descargarNotificacionesError = (estado) => ({
  type: DESCARGA_NOTIFICACIONES_ERROR,
  payload: estado,
});
