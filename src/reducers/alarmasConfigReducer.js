import {
  COMENZAR_DESCARGA_ALARMAS_CONFIG,
  DESCARGA_ALARMAS_CONFIG_COMPLETADO,
  DESCARGA_ALARMAS_CONFIG_ERROR,
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
    case COMENZAR_DESCARGA_ALARMAS_CONFIG:
    case DESCARGA_ALARMAS_CONFIG_ERROR:
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

    default:
      return state;
  }
};
