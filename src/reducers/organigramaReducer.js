import {
  //Organigrama
  AGREGAR_ORGANIGRAMA,
  AGREGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA,
  DESCARGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA_EXITO,
  EDITAR_ORGANIGRAMA_OBTENER,
  ELIMINAR_ORGANIGRAMA,
  ELIMINAR_ORGANIGRAMA_ERROR,
  ELIMINAR_ORGANIGRAMA_EXITO,
  FINALIZAR_ORGANIGRAMA,
  FINALIZAR_ORGANIGRAMA_ERROR,
  //Niveles
  OBTENER_NIVELES_ORGANIGRAMA_OBTENER,
  OBTENER_NIVELES_ORGANIGRAMA_ERROR,
  AGREGAR_NIVEL_ORGANIZACIONAL,
  AGREGAR_NIVEL_ORGANIZACIONAL_ERROR,
  AGREGAR_NIVEL_ORGANIZACIONAL_EXITO,
  //Unidades
  OBTENER_UNIDADES_ORGANIGRAMA_OBTENER,
  OBTENER_UNIDADES_ORGANIGRAMA_ERROR,
} from "../types/organigramaTypes";

const initialState = {
  organigrama: [],
  loading: false,
  error: null,
  organigramaEliminar: null,
  organigramaEditar: null,
  nivelesOrganigrama: []
};

export const organigramaReducer = (state = initialState, action) => {
  switch (action.type) {
    case AGREGAR_ORGANIGRAMA:
    case DESCARGAR_ORGANIGRAMA:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_ORGANIGRAMA_ERROR:
    case DESCARGAR_ORGANIGRAMA_ERROR:
    case ELIMINAR_ORGANIGRAMA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        organigramaEliminar: null,
      };
    case DESCARGAR_ORGANIGRAMA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        organigrama: action.payload,
      };

    case ELIMINAR_ORGANIGRAMA:
      return {
        ...state,
        organigramaEliminar: action.payload,
      };

    case ELIMINAR_ORGANIGRAMA_EXITO:
      return {
        ...state,
        organigrama: state.organigrama.filter(
          (organigrama) =>
            organigrama.id_organigrama !== state.organigramaEliminar
        ),
        organigramaEliminar: null,
      };

    case EDITAR_ORGANIGRAMA_OBTENER:
      return {
        ...state,
        organigramaEditar: action.payload,
        nivelesOrganigrama: []
      };
    case OBTENER_NIVELES_ORGANIGRAMA_OBTENER:
      return {
        ...state,
        nivelesOrganigrama: action.payload
      };
    case OBTENER_NIVELES_ORGANIGRAMA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        nivelesOrganigrama: [],
      };
    case
      OBTENER_UNIDADES_ORGANIGRAMA_OBTENER:
      return {
        ...state,
        unidadesOrganigrama: action.payload
      };
    case
      OBTENER_UNIDADES_ORGANIGRAMA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        unidadesOrganigrama: [],
      };
    case FINALIZAR_ORGANIGRAMA:
      return {
        ...state,
      };
    case FINALIZAR_ORGANIGRAMA_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
