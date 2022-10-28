import {
  AGREGAR_ALARMA_COMPLETADO,
  AGREGAR_ALARMA_ERROR,
  CAMBIAR_MODO,
  COMENZAR_DESCARGA_ALARMAS,
  DESCARGA_ALARMAS_COMPLETADO,
  EDITAR_ALARMA_COMPLETADO,
  EDITAR_ALARMA_ERROR,
  ELIMINAR_ALARMA_COMPLETADO,
  ELIMINAR_ALARMA_ERROR,
  OBTENER_ALARMA_EDIT_COMPLETADO,
  OBTENER_ALARMA_EDIT_ERROR,
  PETICION_AGREGAR_ALARMA,
  PETICION_EDITAR_ALARMA,
  PETICION_ELIMINAR_ALARMA,
  PETICION_OBTENER_ALARMA_EDIT,
} from "../types/alarmasTypes";

const initialState = {
  alarmas: [],
  error: null,
  loading: false,
  alarmaAction: null,
  dataEdit: null,
};

export const alarmasReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_ALARMAS:
    case PETICION_ELIMINAR_ALARMA:
    case PETICION_OBTENER_ALARMA_EDIT:
    case PETICION_AGREGAR_ALARMA:
    case PETICION_EDITAR_ALARMA:
    case ELIMINAR_ALARMA_COMPLETADO:
    case ELIMINAR_ALARMA_ERROR:
    case AGREGAR_ALARMA_ERROR:
    case AGREGAR_ALARMA_COMPLETADO:
    case EDITAR_ALARMA_COMPLETADO:
    case EDITAR_ALARMA_ERROR:
      return {
        ...state,
        loading: action.payload,
      };

    case CAMBIAR_MODO:
      return {
        ...state,
        alarmaAction: action.payload,
      };

    case OBTENER_ALARMA_EDIT_COMPLETADO:
      return {
        ...state,
        loading: false,
        dataEdit: action.payload,
      };

    case OBTENER_ALARMA_EDIT_ERROR:
      return {
        ...state,
        loading: action.payload,
        dataEdit: null,
      };

    case DESCARGA_ALARMAS_COMPLETADO:
      return {
        ...state,
        alarmas: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
