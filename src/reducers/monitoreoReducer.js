import {
  COMENZAR_DESCARGA_MONITOREO,
  COMENZAR_EDICION_MONITOREO,
  DESCARGA_MONITOREO_ERROR,
  DESCARGA_MONITOREO_EXITO,
  MONITOREO_EDITADO_ERROR,
  MONITOREO_EDITADO_EXITO,
} from "../types/monitoreoTypes";

const initialState = {
  monitoreo: [],
  loading: false,
  error: null,
};

export const monitoreoReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_MONITOREO:
      return {
        ...state,
        loading: action.payload,
      };

    case DESCARGA_MONITOREO_EXITO:
      return {
        ...state,
        monitoreo: action.payload,
        loading: false,
        error: null,
      };

    case MONITOREO_EDITADO_ERROR:
    case DESCARGA_MONITOREO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case MONITOREO_EDITADO_EXITO:
      return {
        ...state,
        loading: false,
        monitoreo: [action.payload]
      }

    default:
      return state;
  }
};
