import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import {
  EDITAR_NIVEL_ORGANIZACIONAL,
  EDITAR_NIVEL_ORGANIZACIONAL_OBTENER,
  EDITAR_NIVEL_ORGANIZACIONAL_EXITO,
  EDITAR_NIVEL_ORGANIZACIONAL_ERROR,
  EDITAR_UNIDAD_ORGANIZACIONAL,
  EDITAR_UNIDAD_ORGANIZACIONAL_OBTENER,
  EDITAR_UNIDAD_ORGANIZACIONAL_EXITO,
  EDITAR_UNIDAD_ORGANIZACIONAL_ERROR,
  AGREGAR_NIVEL_ORGANIZACIONAL,
  AGREGAR_NIVEL_ORGANIZACIONAL_ERROR,
  AGREGAR_NIVEL_ORGANIZACIONAL_EXITO,
  AGREGAR_UNIDAD_ORGANIZACIONAL,
  AGREGAR_UNIDAD_ORGANIZACIONAL_ERROR,
  AGREGAR_UNIDAD_ORGANIZACIONAL_EXITO,
  ELIMINAR_NIVEL_ORGANIZACIONAL,
  ELIMINAR_NIVEL_ORGANIZACIONAL_ERROR,
  ELIMINAR_NIVEL_ORGANIZACIONAL_EXITO,
  ELIMINAR_UNIDAD_ORGANIZACIONAL,
  ELIMINAR_UNIDAD_ORGANIZACIONAL_ERROR,
  ELIMINAR_UNIDAD_ORGANIZACIONAL_EXITO,
  DESCARGAR_NIVEL_ORGANIZACIONAL,
  DESCARGAR_NIVEL_ORGANIZACIONAL_ERROR,
  DESCARGAR_NIVEL_ORGANIZACIONAL_EXITO,
  DESCARGAR_UNIDAD_ORGANIZACIONAL,
  DESCARGAR_UNIDAD_ORGANIZACIONAL_ERROR,
  DESCARGAR_UNIDAD_ORGANIZACIONAL_EXITO,
} from "../types/edicionOrganigramaTypes";

export const agregarNivelAction = (id_organigrama) => {
  return async (dispatch) => {
    dispatch(agregarNivel());

    try {
      const { data: createNivel } = await clienteAxios.patch(
        `/almacen/organigrama/niveles/update/${id_organigrama}/`
      );
      dispatch(agregarNivelExito());
      Swal.fire("Se ha agregado un nuevo nivel organizacional");
     
    } catch (error) {
      console.log(error);
      dispatch(agregarNivelError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
    }
  };
};

const agregarNivel = () => ({
  type: AGREGAR_NIVEL_ORGANIZACIONAL,
});

const agregarNivelError = (estado) => ({
  type: AGREGAR_NIVEL_ORGANIZACIONAL_ERROR,
  payload: estado,
});

const agregarNivelExito = (nivel) => ({
  type: AGREGAR_NIVEL_ORGANIZACIONAL_EXITO,
  payload: nivel,
});
