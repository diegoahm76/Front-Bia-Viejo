import clienteEstaciones from "../config/clienteAxiosEstaciones";
import {} from "../types/estacionesTypes";
import Swal from "sweetalert2";
import { formatISO } from "date-fns";
import {
  AGREGAR_NOTIFICACION_COMPLETADO,
  AGREGAR_NOTIFICACION_ERROR,
  COMENZAR_DESCARGA_NOTIFICACIONES,
  DESCARGA_NOTIFICACIONES_ERROR,
  DESCARGA_NOTIFICACIONES_EXITO,
  EDITAR_NOTIFICACION_COMPLETADO,
  EDITAR_NOTIFICACION_ERROR,
  ELIMINAR_NOTIFICACION_COMPLETADO,
  ELIMINAR_NOTIFICACION_ERROR,
  OBTENER_NOTIFICACION_EDIT_COMPLETADO,
  OBTENER_NOTIFICACION_EDIT_ERROR,
  PETICION_AGREGAR_NOTIFICACION,
  PETICION_EDITAR_NOTIFICACION,
  PETICION_ELIMINAR_NOTIFICACION,
  PETICION_OBTENER_NOTIFICACION_EDIT,
} from "../types/notificacionesTypes";
import { CAMBIAR_MODO } from "../types/alarmasTypes";

export const obtenerNotificacionesAction = () => async (dispatch) => {
  dispatch(descargarNotificaciones(true));

  try {
    const { data: dataGetNotificaciones } = await clienteEstaciones.get(
      "Notificaciones"
    );
    dispatch(descargarNotificacionExito(dataGetNotificaciones));
  } catch (error) {
    console.log(error);
    dispatch(descargarNotificacionesError(false));
  }
};

const descargarNotificaciones = (estado) => ({
  type: COMENZAR_DESCARGA_NOTIFICACIONES,
  payload: estado,
});

const descargarNotificacionExito = (notificaciones) => ({
  type: DESCARGA_NOTIFICACIONES_EXITO,
  payload: notificaciones,
});

const descargarNotificacionesError = (estado) => ({
  type: DESCARGA_NOTIFICACIONES_ERROR,
  payload: estado,
});

export const eliminarNotificacionAction =
  (idNotificacion) => async (dispatch) => {
    dispatch(peticionEliminarNotificacion(true));

    try {
      Swal.fire({
        title: "Estas seguro?",
        text: "Una notificación que se elimina no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, elminar!",
        cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await clienteEstaciones.delete(`Notificaciones/${idNotificacion}`);
          dispatch(eliminarNotificacionCompletado(false));
          dispatch(obtenerNotificacionesAction());
        } else {
          dispatch(eliminarNotificacionError(false));
        }
      });
    } catch (err) {
      dispatch(eliminarNotificacionError(false));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }
  };

const peticionEliminarNotificacion = (estado) => ({
  type: PETICION_ELIMINAR_NOTIFICACION,
  payload: estado,
});

const eliminarNotificacionCompletado = (estado) => ({
  type: ELIMINAR_NOTIFICACION_COMPLETADO,
  payload: estado,
});

const eliminarNotificacionError = (estado) => ({
  type: ELIMINAR_NOTIFICACION_ERROR,
  payload: estado,
});

export const cambiarModoAction = (dataAction) => async (dispatch) => {
  dispatch(cambiarModo(dataAction));
};

const cambiarModo = (dataAction) => ({
  type: CAMBIAR_MODO,
  payload: dataAction,
});

export const crearNotificacionAction =
  (dataNotificacion) => async (dispatch) => {
    dispatch(peticionAgregarNotificacion(true));

    try {
      console.log(dataNotificacion);
      await clienteEstaciones.post("Notificaciones", dataNotificacion);
      dispatch(agregarNotificacionCompletado(false));
      dispatch(obtenerNotificacionesAction());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Notificación agreada correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      console.log(err);
      if (err.response?.data) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Esta notificación ya existe",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo pasó, intente de nuevo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
      dispatch(agregarNotificacionError(false));
    }
  };

const peticionAgregarNotificacion = (estado) => ({
  type: PETICION_AGREGAR_NOTIFICACION,
  payload: estado,
});

const agregarNotificacionCompletado = (estado) => ({
  type: AGREGAR_NOTIFICACION_COMPLETADO,
  payload: estado,
});

const agregarNotificacionError = (estado) => ({
  type: AGREGAR_NOTIFICACION_ERROR,
  payload: estado,
});

export const obtenerNotificacionEditAction =
  (idNotificacion, reset) => async (dispatch) => {
    dispatch(peticionObtenerNotificacionEdit(true));
    dispatch(cambiarModoAction("editar"));

    try {
      const { data } = await clienteEstaciones.get("Notificaciones");
      const dataIdNotificacion = data.filter(
        (notificacion) => notificacion.idNotificacion === idNotificacion
      );
      console.log(dataIdNotificacion);
      reset(dataIdNotificacion[0]);
      dispatch(obtenerNotificacionEditCompletado(dataIdNotificacion[0]));
    } catch (err) {
      console.log(err);
      dispatch(obtenerNotificacionEditError(false));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }
  };

const peticionObtenerNotificacionEdit = (estado) => ({
  type: PETICION_OBTENER_NOTIFICACION_EDIT,
  payload: estado,
});

const obtenerNotificacionEditCompletado = (dataEdit) => ({
  type: OBTENER_NOTIFICACION_EDIT_COMPLETADO,
  payload: dataEdit,
});

const obtenerNotificacionEditError = (estado) => ({
  type: OBTENER_NOTIFICACION_EDIT_ERROR,
  payload: estado,
});

export const editarNotificacionAction = (dataEdit) => async (dispatch) => {
  dispatch(peticionEditarNotificacion(true));

  try {
    await clienteEstaciones.put("Notificaciones", dataEdit);
    dispatch(editarNotificacionCompletado(false));
    dispatch(obtenerNotificacionesAction());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Alarma actualizada correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log(err);
    dispatch(editarNotificacionError(false));
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
  dispatch(cambiarModoAction(null));
};

const peticionEditarNotificacion = (estado) => ({
  type: PETICION_EDITAR_NOTIFICACION,
  payload: estado,
});

const editarNotificacionCompletado = (estado) => ({
  type: EDITAR_NOTIFICACION_COMPLETADO,
  payload: estado,
});

const editarNotificacionError = (estado) => ({
  type: EDITAR_NOTIFICACION_ERROR,
  payload: estado,
});
