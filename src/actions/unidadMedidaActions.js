import clienteAxios from "../config/clienteAxios";
import {
  AGREGAR_UNIDADMEDIDA,
  AGREGAR_UNIDADMEDIDA_EXITO,
  AGREGAR_UNIDADMEDIDA_ERROR,
  COMENZAR_DESCARGA_UNIDADMEDIDA,
  DESCARGA_UNIDADMEDIDA_EXITO,
  DESCARGA_UNIDADMEDIDA_ERROR,
  OBTENER_UNIDADMEDIDA_ELIMINAR,
  ELIMINAR_UNIDADMEDIDA_EXITO,
  ELIMINAR_UNIDADMEDIDA_ERROR,
} from "../../src/types/unidadMedidaTypes";
import Swal from "sweetalert2";

export const crearNuevaUnidadMedidaAction = ({
  unidadMedidaCreate,
  fetchData,
}) => {
  return async (dispatch) => {
    dispatch(agregarUnidadMedida());
    try {
      const { data } = await clienteAxios.post(
        "almacen/unidades-medida/create/",
        unidadMedidaCreate
      );
      dispatch(agregarUnidadMedidaExito(unidadMedidaCreate));
      fetchData();

      Swal.fire({
        target: document.getElementById("modal-unidad-medida"),
        title: "Correcto",
        text: "La unidad de medida se agrego correctamente",
        icon: "success",
      });
    } catch (error) {
      dispatch(agregarUnidadMedidaError(true));
      Swal.fire({
        target: document.getElementById("modal-unidad-medida"),
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
      console.log("datos que trae", { dataGetUnidadMedida });
      dispatch(descargarUnidadMedidaExito(dataGetUnidadMedida));
    } catch (error) {
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

export const eliminarUnidadMedidaAction = (id_unidad_medida) => {
  return async (dispatch) => {
    dispatch(obtenerUnidadMedidaEliminar(id_unidad_medida));

    try {
      await clienteAxios.delete(
        `almacen/unidades-medida/delete/${id_unidad_medida}`
      );
      dispatch(unidadMedidaEliminadaExito());

      Swal.fire({
        target: document.getElementById("modal-unidad-medida"),
        title: "Correcto",
        text: "La Unidad de Medida se Elimino correctamente",
        icon: "success",
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      dispatch(unidadMedidaEliminarError(true));
    }
  };
};

const obtenerUnidadMedidaEliminar = (id_unidad_medida) => ({
  type: OBTENER_UNIDADMEDIDA_ELIMINAR,
  payload: id_unidad_medida,
});
const unidadMedidaEliminadaExito = () => ({
  type: ELIMINAR_UNIDADMEDIDA_EXITO,
});

const unidadMedidaEliminarError = (estado) => ({
  type: ELIMINAR_UNIDADMEDIDA_ERROR,
  payload: estado,
});
