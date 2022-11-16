import {
  AGREGAR_ORGANIGRAMA,
  AGREGAR_ORGANIGRAMA_ERROR,
  AGREGAR_ORGANIGRAMA_EXITO,
  DESCARGAR_ORGANIGRAMA,
  DESCARGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA_EXITO,
  EDITAR_ORGANIGRAMA,
  EDITAR_ORGANIGRAMA_ERROR,
  EDITAR_ORGANIGRAMA_EXITO,
  EDITAR_ORGANIGRAMA_OBTENER,
  ELIMINAR_ORGANIGRAMA,
  ELIMINAR_ORGANIGRAMA_ERROR,
  ELIMINAR_ORGANIGRAMA_EXITO,
} from "../types/crearOrganigramaTypes";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

export const obtenerOrganigramaAction = () => {
  return async (dispatch) => {
    dispatch(descargarOrganigrama(true));

    try {
      const { data: dataGetOrganigrama } = await clienteAxios.get(
        "almacen/organigrama/get/"
      );
      //console.log("dataGetOrganigrama", dataGetOrganigrama.Organigramas);

      dispatch(descargarOrganigramaExito(dataGetOrganigrama.Organigramas));
    } catch (error) {
      console.log(error);
      dispatch(descargarOrganigramaError(true));
    }
  };
};

const descargarOrganigrama = (estado) => ({
  type: DESCARGAR_ORGANIGRAMA,
  payload: estado,
});

const descargarOrganigramaExito = (organigrama) => ({
  type: DESCARGAR_ORGANIGRAMA_EXITO,
  payload: organigrama,
});

const descargarOrganigramaError = (estado) => ({
  type: DESCARGAR_ORGANIGRAMA_ERROR,
  payload: estado,
});

export const agregarOrganigramaAction = (organigrama) => {
  return async (dispatch) => {
    dispatch(agregarOrganigrama());

    try {
      const {data: dataCreateOrganimgrama } = await clienteAxios.post("almacen/organigrama/create/", organigrama);
      console.log("dataCreate", dataCreateOrganimgrama);
      dispatch(obtenerOrganigramaAction())
      Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarOrganigramaError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
    }
  };
};

const agregarOrganigrama = () => ({
  type: AGREGAR_ORGANIGRAMA,
});

const agregarOrganigramaError = (estado) => ({
  type: AGREGAR_ORGANIGRAMA_ERROR,
  payload: estado,
});

export const editarOrganigramaObtenerAction = (organigrama) => {
  return (dispatch) => {
    dispatch(editarOrganigramaObtener(organigrama));
  };
};

const editarOrganigramaObtener = (organigrama) => ({
  type: EDITAR_ORGANIGRAMA_OBTENER,
  payload: organigrama,
});

export const eliminarOrganigramaAction = (id_organigrama) => {
  return async (dispatch) => {
    dispatch(obtenerOrganigramaEliminar());

    try {
      await clienteAxios.delete(`Organigrama/${id_organigrama}`);
      dispatch(organigramaEliminadaExito());
      Swal.fire(
        "Correcto",
        "El organigrama se elimino correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(organigramaEliminarError(true));
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: error.response.data,
      });
    }
  };
};

const obtenerOrganigramaEliminar = () => ({
  type: ELIMINAR_ORGANIGRAMA,
});

const organigramaEliminadaExito = () => ({
  type: ELIMINAR_ORGANIGRAMA_EXITO,
});

const organigramaEliminarError = (estado) => ({
  type: ELIMINAR_ORGANIGRAMA_ERROR,
  payload: estado,
});


