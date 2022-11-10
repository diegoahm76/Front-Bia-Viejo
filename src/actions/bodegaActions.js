import React from "react";
import clienteAxios from "../config/clienteAxios";
import {
  AGREGAR_BODEGA,
  AGREGAR_BODEGA_EXITO,
  AGREGAR_BODEGA_ERROR,
  COMENZAR_DESCARGA_BODEGAS,
  DESCARGA_BODEGAS_EXITO,
  DESCARGA_BODEGAS_ERROR,
  ELIMINAR_BODEGA,
  ELIMINAR_BODEGA_EXITO,
  ELIMINAR_BODEGA_ERROR,

} from "../../src/types/bodegasTypes";
import Swal from "sweetalert2";
import { formatISO } from "date-fns";


export const crearNuevaBodegaAction = (bodega) => { 
    console.log("hola")
  return async (dispatch) => {
    dispatch(agregarBodega());

    try {
      const {data} = await clienteAxios.post("almacen/bodega/create/", bodega);
        console.log(data + 
            "ghj")
      dispatch(agregarBodegaExito(bodega));

      Swal.fire("Correcto", "La bodega se agrego correctamente", "success");
    } catch (error) {
      console.log(error);

      dispatch(agregarBodegaError(true));

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
};

const agregarBodega = () => ({
  type: AGREGAR_BODEGA,
});

const agregarBodegaExito = (bodega) => ({
  type: AGREGAR_BODEGA_EXITO,
  payload: bodega,
});

const agregarBodegaError = (estado) => ({
  type: AGREGAR_BODEGA_ERROR,
  payload: estado,
});

export const obtenerBodegasAction = () => {
    return async (dispatch) => {
      dispatch(descargarBodega(true));
  
      try {
        const { data: dataGetBodegas } = await clienteAxios.get(
          "almacen/bodega/get-list/"
        );
        dispatch(descargarBodegaExito(dataGetBodegas));
      } catch (error) {
        console.log(error);
        dispatch(descargarBodegaError(true));
      }
    };
  };
  
  const descargarBodega = (estado) => ({
    type: COMENZAR_DESCARGA_BODEGAS,
    payload: estado,
  });
  
  const descargarBodegaExito = (bodega) => ({
    type:  DESCARGA_BODEGAS_EXITO,
    payload: bodega,
  });
  
  const descargarBodegaError = (estado) => ({
    type: DESCARGA_BODEGAS_ERROR,
    payload: estado,
  });