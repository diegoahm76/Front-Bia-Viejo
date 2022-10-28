import {
  CAMBIAR_MODO,
  EDITAR_ALARMA_COMPLETADO,
  EDITAR_ALARMA_ERROR,
  PETICION_EDITAR_ALARMA,
  PETICION_OBTENER_ALARMA_EDIT,
} from "../types/alarmasTypes";
import { DESCARGA_ESTACIONES_ERROR } from "../types/estacionesTypes";
import {
  AGREGAR_NOTIFICACION_COMPLETADO,
  AGREGAR_NOTIFICACION_ERROR,
  COMENZAR_DESCARGA_NOTIFICACIONES,
  DESCARGA_NOTIFICACIONES_EXITO,
  ELIMINAR_NOTIFICACION_COMPLETADO,
  ELIMINAR_NOTIFICACION_ERROR,
  OBTENER_NOTIFICACION_EDIT_COMPLETADO,
  OBTENER_NOTIFICACION_EDIT_ERROR,
  PETICION_AGREGAR_NOTIFICACION,
  PETICION_ELIMINAR_NOTIFICACION,
} from "../types/notificacionesTypes";

const initialState = {
  notificaciones: [],
  error: null,
  loading: false,
  notificacionAction: null,
  dataEdit: null,
};

export const notificacionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_NOTIFICACIONES:
    case DESCARGA_ESTACIONES_ERROR:
    case PETICION_ELIMINAR_NOTIFICACION:
    case PETICION_AGREGAR_NOTIFICACION:
    case PETICION_OBTENER_ALARMA_EDIT:
    case PETICION_EDITAR_ALARMA:
    case OBTENER_NOTIFICACION_EDIT_ERROR:
    case ELIMINAR_NOTIFICACION_COMPLETADO:
    case AGREGAR_NOTIFICACION_COMPLETADO:
    case EDITAR_ALARMA_COMPLETADO:
    case ELIMINAR_NOTIFICACION_ERROR:
    case AGREGAR_NOTIFICACION_ERROR:
    case EDITAR_ALARMA_ERROR:
      return {
        ...state,
        loading: action.payload,
      };

    case DESCARGA_NOTIFICACIONES_EXITO:
      return {
        ...state,
        loading: false,
        notificaciones: action.payload,
      };

    case OBTENER_NOTIFICACION_EDIT_COMPLETADO:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      };

    case CAMBIAR_MODO:
      return {
        ...state,
        notificacionAction: action.payload,
      };

    default:
      return state;
  }
};
