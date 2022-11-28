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
export const agregarOrganigramaAction = (organigrama) => {
  return async (dispatch) => {
    dispatch(agregarOrganigrama());
    try {
      const { data: dataCreateOrganimgrama } = await clienteAxios.post("almacen/organigrama/create/", organigrama);
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

//Editar Organigrama
export const editarOrganigramaObtenerAction = (organigrama) => {
  return (dispatch) => {
    dispatch(editarOrganigramaObtener(organigrama));
  };
};

const editarOrganigramaObtener = (organigrama) => ({
  type: EDITAR_ORGANIGRAMA_OBTENER,
  payload: organigrama
});

//Finalizar Organigrama
export const finalizarOrganigramaAction = (id_organigrama) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.put(`almacen/organigrama/finalizar/${id_organigrama}/`);
      dispatch(finalizarOrganigrama());
      // {
      //   "success": true,
      //     "detail": "Se Finalizo el organigrama correctamente"
      // }
      Swal.fire(`${data.success === true ? 'Correcto' : 'Incorrecto'}`, data.detail, `info`);
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
export const obtenerNivelesAction = (idPk) => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.get(
        `almacen/organigrama/niveles/get-list/?pk=${idPk}`
      );
      dispatch(obtenerNiveles(data.Nivel));
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
      const { data } = await clienteAxios.put(`/almacen/organigrama/niveles/update/${id_organigrama}/`, nuevoNivel);
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

// UNIDADES

//Obtener Unidades
export const obtenerUnidadesAction = () => {
  return async (dispatch) => {
    try {
      const { data } = await clienteAxios.get('almacen/organigrama/unidades/get-list/');
      dispatch(obtenerUnidades(data.Unidades));
    } catch (error) {
      console.log(error);
      dispatch(obtenerUnidadesError(true));
    }
  };
};

const obtenerUnidades = (unidadesOrganigrama) => ({
  type: OBTENER_UNIDADES_ORGANIGRAMA_OBTENER,
  payload: unidadesOrganigrama
});

const obtenerUnidadesError = (error) => ({
  type: OBTENER_UNIDADES_ORGANIGRAMA_ERROR,
  payload: error
});
