import {
  COMENZAR_DESCARGA_ALARMAS_CONFIG,
  DESCARGA_ALARMAS_CONFIG_COMPLETADO,
  DESCARGA_ALARMAS_CONFIG_ERROR,
  PETICION_OBTENER_ALARMA_CONFIG_EDIT,
  OBTENER_ALARMA_CONFIG_EDIT_COMPLETADO,
  OBTENER_ALARMA_CONFIG_EDIT_ERROR,
  EDITAR_ALARMA_CONFIG_COMPLETADO,
  EDITAR_ALARMA_CONFIG_ERROR,
  PETICION_EDITAR_ALARMA_CONFIG,
} from "../types/alarmasConfigTypes";

const initialState = {
  alarmasConfig: [],
  error: null,
  loading: false,
  alarmaConfigAction: null,
  dataEdit: null,
};

export const alarmasConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case PETICION_OBTENER_ALARMA_CONFIG_EDIT:
    case PETICION_EDITAR_ALARMA_CONFIG:
    case COMENZAR_DESCARGA_ALARMAS_CONFIG:
    case OBTENER_ALARMA_CONFIG_EDIT_ERROR:
    case EDITAR_ALARMA_CONFIG_COMPLETADO:
    case DESCARGA_ALARMAS_CONFIG_ERROR:
    case EDITAR_ALARMA_CONFIG_ERROR:
      return {
        ...state,
        loading: action.payload,
      };

    case DESCARGA_ALARMAS_CONFIG_COMPLETADO:
      return {
        ...state,
        loading: false,
        alarmasConfig: action.payload,
      };

    case OBTENER_ALARMA_CONFIG_EDIT_COMPLETADO:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      };

    default:
      return state;
  }
};
