import { formatISO } from "date-fns";
import clienteEstaciones from "../config/clienteAxiosEstaciones";
import {
  COMENZAR_DESCARGA_CONFIGURACIONES,
  COMENZAR_EDICION_CONFIGURACION,
  CONFIGURACION_EDITADO_ERROR,
  CONFIGURACION_EDITADO_EXITO,
  DESCARGA_CONFIGURACIONES_ERROR,
  DESCARGA_CONFIGURACIONES_EXITO,
  OBTENER_CONFIGURACION_EDITAR,
} from "../types/configuracionesEstacionesTypes";

export const obtenerConfiguracionesAction = () => {
  return async (dispatch) => {
    dispatch(descargarConfiguraciones(true));

    try {
      const { data: getConfiguraciones } = await clienteEstaciones.get(
        "Configuraciones"
      );
      console.log("Configuraciones", getConfiguraciones);

      const formatFechaConfiguraciones = getConfiguraciones.map(
        (configuracion) => ({
          ...configuracion,
          t003fechaMod: formatISO(new Date(configuracion.t003fechaMod), {
            representation: "date",
          }),
        })
      );
      dispatch(descargarConfiguracionesExito(formatFechaConfiguraciones));
    } catch (error) {
      console.log(error);
      dispatch(descargarConfiguracionesError(true));
    }
  };
};

const descargarConfiguraciones = (estado) => ({
  type: COMENZAR_DESCARGA_CONFIGURACIONES,
  payload: estado,
});

const descargarConfiguracionesExito = (configuraciones) => ({
  type: DESCARGA_CONFIGURACIONES_EXITO,
  payload: configuraciones,
});

const descargarConfiguracionesError = (estado) => ({
  type: DESCARGA_CONFIGURACIONES_ERROR,
  payload: estado,
});

export const obtenerConfiguracionEditarAction = (configuracion) => {
  return (dispatch) => {
    dispatch(obtenerConfiguracionEditar(configuracion));
  };
};

const obtenerConfiguracionEditar = (configuracion) => ({
  type: OBTENER_CONFIGURACION_EDITAR,
  payload: configuracion,
});

export const editarConfiguracionAction = (configuracion) => {
  return async (dispatch) => {
    dispatch(editarEstacion());

    try {
      await clienteEstaciones.put("Configuraciones", configuracion);

      configuracion.t003fechaMod = formatISO(
        new Date(configuracion.t003fechaMod),
        { representation: "date" }
      );
      dispatch(editarConfiguracionExito(configuracion));
    } catch (error) {
      console.log(error);
      dispatch(configuracionEditarError(true));
    }
  };
};

const editarEstacion = () => ({
  type: COMENZAR_EDICION_CONFIGURACION,
});

const editarConfiguracionExito = (configuracion) => ({
  type: CONFIGURACION_EDITADO_EXITO,
  payload: configuracion,
});

const configuracionEditarError = (estado) => ({
  type: CONFIGURACION_EDITADO_ERROR,
  payload: estado,
});
