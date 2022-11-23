import {
    AGREGAR_MARCA,
    AGREGAR_MARCA_EXITO,
    AGREGAR_MARCA_ERROR,
  
    COMENZAR_DESCARGA_MARCA,
    DESCARGA_MARCA_EXITO,
    DESCARGA_MARCA_ERROR,
  
    OBTENER_MARCA_ELIMINAR,
    ELIMINAR_MARCA_EXITO,
    ELIMINAR_MARCA_ERROR,
  } from "../../src/types/creacionMarcaTypes";
  
  const initialState = {
    bodega: [],
    error: null,
    loading: false,
    marcaEliminar: null,
    
  };
  export const marcaReducer = (state = initialState, action) => {
    switch (action.type) {
      case COMENZAR_DESCARGA_MARCA:
      case AGREGAR_MARCA:
        return {
          ...state,
          loading: action.payload,
        };
  
      case AGREGAR_MARCA_EXITO:
        return {
          ...state,
          loading: false,
          error: null,
          marca: [...state.marca, action.payload],
        };
  
      case DESCARGA_MARCA_EXITO:
        return {
          ...state,
          loading: false,
          error: null,
          marca: action.payload,
        };
  
      case ELIMINAR_MARCA_EXITO:
        return {
          ...state,
          marca: state.marca.filter(
            (marca) => marca.id_marca !== state.marca
          ),
          marcaEliminar: null,
        };
  
      case OBTENER_MARCA_ELIMINAR:
        return {
          ...state,
          marca: action.payload,
        };
  
      case ELIMINAR_MARCA_ERROR:
      case AGREGAR_MARCA_ERROR:
      case DESCARGA_MARCA_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  