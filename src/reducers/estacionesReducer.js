import {
  AGREGAR_ESTACION,
  AGREGAR_ESTACION_ERROR,
  AGREGAR_ESTACION_EXITO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_ESTACIONES,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_ESTACIONES_ERROR,
  DESCARGA_ESTACIONES_EXITO,
  DESCARGA_USUARIOS_ERROR,
  DESCARGA_USUARIOS_EXITO,
  ESTACION_EDITADO_ERROR,
  ESTACION_EDITADO_EXITO,
  ESTACION_ELIMINADO_ERROR,
  ESTACION_ELIMINADO_EXITO,
  OBTENER_ESTACION_EDITAR,
  OBTENER_ESTACION_ELIMINAR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_ERROR,
  USUARIO_ELIMINADO_EXITO,
} from "../types/estacionesTypes";

const initialState = {
  estaciones: [],
  usuarios: [],
  error: null,
  loading: false,
  estacionEliminar: null,
  estacionEditar: null,
  usuarioEliminar: null,
};

export const estacionesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMENZAR_DESCARGA_ESTACIONES:
    case COMENZAR_DESCARGA_USUARIOS:
    case AGREGAR_ESTACION:
      return {
        ...state,
        loading: action.payload,
      };

    case AGREGAR_ESTACION_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estaciones: [...state.estaciones, action.payload],
      };

    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        usuarios: [...state.usuarios, action.payload],
      };

    case AGREGAR_ESTACION_ERROR:
    case AGREGAR_USUARIO_ERROR:
    case DESCARGA_ESTACIONES_ERROR:
    case DESCARGA_USUARIOS_ERROR:
    case ESTACION_ELIMINADO_ERROR:
    case USUARIO_ELIMINADO_ERROR:
    case ESTACION_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        estacionEliminar: null,
        estacionEditar: null,
      };

    case DESCARGA_ESTACIONES_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estaciones: action.payload,
      };

    case DESCARGA_USUARIOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        usuarios: action.payload,
      };

    case OBTENER_ESTACION_ELIMINAR:
      return {
        ...state,
        estacionEliminar: action.payload,
      };

    case ESTACION_ELIMINADO_EXITO:
      return {
        ...state,
        estaciones: state.estaciones.filter(
          (estacion) => estacion.objectid !== state.estacionEliminar
        ),
        estacionEliminar: null,
      };

    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usuarioEliminar: action.payload,
      };

    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario.idUsuario !== state.usuarioEliminar.idUsuario
        ),
        usuarioEliminar: null,
      };

    case OBTENER_ESTACION_EDITAR:
      return {
        ...state,
        estacionEditar: action.payload,
      };

    case ESTACION_EDITADO_EXITO:
      return {
        ...state,
        estacionEditar: null,
        estaciones: state.estaciones.map((estacion) =>
          estacion.objectid === action.payload.objectid
            ? (estacion = action.payload)
            : estacion
        ),
      };

    default:
      return state;
  }
};
