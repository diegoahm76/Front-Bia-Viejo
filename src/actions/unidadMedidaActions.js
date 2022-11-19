import clienteAxios from "../config/clienteAxios";
import {
  AGREGAR_UNIDADMEDIDA,
  AGREGAR_UNIDADMEDIDA_EXITO,
  AGREGAR_UNIDADMEDIDA_ERROR,
  COMENZAR_DESCARGA_UNIDADMEDIDA,
  DESCARGA_UNIDADMEDIDA_EXITO,
  DESCARGA_UNIDADMEDIDA_ERROR,
} from "../../src/types/unidadMedidaTypes";
import Swal from "sweetalert2";

export const crearNuevaUnidadMedidaAction = (unidadMedida) => {
  return async (dispatch) => {
    dispatch(agregarUnidadMedida());
    try {
      const { data } = await clienteAxios.post(
        "almacen/unidades-medida/create/",
        unidadMedida
      );
      console.log(data + "ghj");
      dispatch(agregarUnidadMedidaExito(unidadMedida));
      Swal.fire(
        "Correcto",
        "La unidad de medida se agrego correctamente",
        "success"
      );
    } catch (error) {
        console.log(error)
      dispatch(agregarUnidadMedidaError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
};

const agregarUnidadMedida = () => ({
  type: AGREGAR_UNIDADMEDIDA,
});

const agregarUnidadMedidaExito = (unidadMedida) => ({
  type: AGREGAR_UNIDADMEDIDA_EXITO,
  payload: unidadMedida,
});

const agregarUnidadMedidaError = (estado) => ({
  type: AGREGAR_UNIDADMEDIDA_ERROR,
  payload: estado,
});

export const obtenerUnidadMedidaAction = () => {
    return async (dispatch) => {
      dispatch(descargarUnidadMedida(true));
  
      try {
        const { data: dataGetUnidadMedida } = await clienteAxios.get(
          "almacen/unidades-medida/get-list/"
        );
        console.log("datos que trae", {dataGetUnidadMedida})
        dispatch(descargarUnidadMedidaExito(dataGetUnidadMedida));
      } catch (error) {
        console.log(error);
        dispatch(descargarUnidadMedidaError(true));
      }
    };
  };
  
  const descargarUnidadMedida = (estado) => ({
    type: COMENZAR_DESCARGA_UNIDADMEDIDA,
    payload: estado,
  });
  
  const descargarUnidadMedidaExito = (unidadMedida) => ({
    type: DESCARGA_UNIDADMEDIDA_EXITO,
    payload: unidadMedida,
  });
  
  const descargarUnidadMedidaError = (estado) => ({
    type: DESCARGA_UNIDADMEDIDA_ERROR,
    payload: estado,
  });
