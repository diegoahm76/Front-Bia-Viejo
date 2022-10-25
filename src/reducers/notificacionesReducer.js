import { DESCARGA_ESTACIONES_ERROR } from "../types/estacionesTypes";
import {
  COMENZAR_DESCARGA_NOTIFICACIONES,
  DESCARGA_NOTIFICACIONES_EXITO,
} from "../types/notificacionesTypes";

const initialState = {
  notificaciones: [],
  error: null,
  loading: false,
  notificacionEliminar: null,
  notificacionEditar: null,
};

export const notificacionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_NOTIFICACIONES:
    case DESCARGA_ESTACIONES_ERROR:
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

    

    default:
      return state;
  }
};
