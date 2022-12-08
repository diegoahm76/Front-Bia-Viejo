import {
  //Organigrama
  AGREGAR_ORGANIGRAMA,
  AGREGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA,
  DESCARGAR_ORGANIGRAMA_ERROR,
  DESCARGAR_ORGANIGRAMA_EXITO,
  SELECCIONAR_ORGANIGRAMA_OBTENER,
  ELIMINAR_ORGANIGRAMA,
  ELIMINAR_ORGANIGRAMA_ERROR,
  ELIMINAR_ORGANIGRAMA_EXITO,
  FINALIZAR_ORGANIGRAMA,
  FINALIZAR_ORGANIGRAMA_ERROR,
  //Niveles
  OBTENER_NIVELES_ORGANIGRAMA_OBTENER,
  OBTENER_NIVELES_ORGANIGRAMA_ERROR,
  ACTUALIZAR_NIVEL_ORGANIGRAMA,
  ACTUALIZAR_NIVEL_ORGANIGRAMA_ERROR,
  ACTUALIZAR_NIVEL_ORGANIGRAMA_EXITO,
  //Unidades
  OBTENER_UNIDADES_ORGANIGRAMA,
  OBTENER_UNIDADES_ORGANIGRAMA_ERROR,
  ACTUALIZAR_UNIDADES_ORGANIGRAMA,
  ACTUALIZAR_UNIDADES_ORGANIGRAMA_ERROR
} from "../types/organigramaTypes";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

//Obtener Organigrama
export const obtenerOrganigramaAction = () => {
  return async (dispatch) => {
    dispatch(descargarOrganigrama(true));
    try {
      const { data: dataGetOrganigrama } = await clienteAxios.get(
        "almacen/organigrama/get/"
      );
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

//Agregar Organigrama
export const agregarOrganigramaAction = (organigrama, navigate) => {
  return async (dispatch) => {
    dispatch(agregarOrganigrama());
    try {
      const { data } = await clienteAxios.post("almacen/organigrama/create/", organigrama);
      dispatch(obtenerOrganigramaAction())
      dispatch(seleccionarOrganigramaAction(data.detail));
      Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(agregarOrganigramaError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
      navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
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

//Eliminar Organigrama
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

//Seleccionar Organigrama
export const seleccionarOrganigramaAction = (organigrama) => {
  return (dispatch) => {
    dispatch(seleccionarOrganigramaObtener(organigrama));
  };
};

const seleccionarOrganigramaObtener = (organigrama) => ({
  type: SELECCIONAR_ORGANIGRAMA_OBTENER,
  payload: organigrama
});

//Editar Organigrama
export const editarOrganigramaAction = (organigrama, id) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.patch(`almacen/organigrama/update/${id}/`, organigrama);
      dispatch(obtenerOrganigramaAction());
      Swal.fire("Se ha editado el organigrama");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
    }
  };
};

//Finalizar Organigrama
export const finalizarOrganigramaAction = (id_organigrama, navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.put(`almacen/organigrama/finalizar/${id_organigrama}/`);
      dispatch(finalizarOrganigrama());
      Swal.fire({
        icon: "info",
        title: "Atención",
        text: data.detail,
      });
      navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
    } catch (error) {
      dispatch(finalizarOrganigramaError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
    }
  };
};

const finalizarOrganigrama = () => ({
  type: FINALIZAR_ORGANIGRAMA,
});

const finalizarOrganigramaError = (estado) => ({
  type: FINALIZAR_ORGANIGRAMA_ERROR,
  payload: estado,
});


//NIVELES

//Obtener Niveles
export const obtenerNivelesAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.get(`almacen/organigrama/niveles/get-by-organigrama/${id}/`);
      dispatch(obtenerNiveles(data.data));
    } catch (error) {
      console.log(error);
      dispatch(obtenerNivelesError(true));
    }
  };
};

const obtenerNiveles = (nivelesOrganigrama) => ({
  type: OBTENER_NIVELES_ORGANIGRAMA_OBTENER,
  payload: nivelesOrganigrama
});

const obtenerNivelesError = (error) => ({
  type: OBTENER_NIVELES_ORGANIGRAMA_ERROR,
  payload: error
});

export const actualizarNivelAction = (id_organigrama, nuevoNivel) => {
  return async (dispatch) => {
    dispatch(agregarNivel());
    try {
      const { data } = await clienteAxios.put(`almacen/organigrama/niveles/update/${id_organigrama}/`, nuevoNivel);
      dispatch(agregarNivelExito());
      dispatch(obtenerNivelesAction(id_organigrama));
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
  type: ACTUALIZAR_NIVEL_ORGANIGRAMA,
});

const agregarNivelError = (estado) => ({
  type: ACTUALIZAR_NIVEL_ORGANIGRAMA_ERROR,
  payload: estado,
});

const agregarNivelExito = (nivel) => ({
  type: ACTUALIZAR_NIVEL_ORGANIGRAMA_EXITO,
  payload: nivel,
});

// UNIDADES

//Obtener Unidades
export const obtenerUnidadesAction = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.get(`almacen/organigrama/unidades/get-by-organigrama/${id}/`);
      dispatch(obtenerUnidadesExito(data.data));
    } catch (error) {
      console.log(error);
      dispatch(obtenerUnidadesError(true));
    }
  };
};

const obtenerUnidadesExito = (unidadesOrganigrama) => ({
  type: OBTENER_UNIDADES_ORGANIGRAMA,
  payload: unidadesOrganigrama
});

const obtenerUnidadesError = (error) => ({
  type: OBTENER_UNIDADES_ORGANIGRAMA_ERROR,
  payload: error
});

//Actualizar Unidades
export const actualizarUnidadesAction = (id, newUnidades) => {
  console.log(id, newUnidades);
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.put(`almacen/organigrama/unidades/update/${id}/`, newUnidades);
      dispatch(obtenerUnidadesAction(id));
      Swal.fire("Se ha agregado un nuevo nivel organizacional");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: error?.response?.data?.detail,
      });
      dispatch(actualizarUnidadesError(true));
    }
  };
};

const actualizarUnidadesError = (error) => ({
  type: ACTUALIZAR_UNIDADES_ORGANIGRAMA_ERROR,
  payload: error
});