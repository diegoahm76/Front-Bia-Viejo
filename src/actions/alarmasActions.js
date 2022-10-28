import clienteEstaciones from "../config/clienteAxiosEstaciones";
import Swal from "sweetalert2";
import {
  AGREGAR_ALARMA_COMPLETADO,
  AGREGAR_ALARMA_ERROR,
  CAMBIAR_MODO,
  COMENZAR_DESCARGA_ALARMAS,
  DESCARGA_ALARMAS_COMPLETADO,
  DESCARGA_ALARMAS_ERROR,
  EDITAR_ALARMA_COMPLETADO,
  EDITAR_ALARMA_ERROR,
  ELIMINAR_ALARMA_COMPLETADO,
  ELIMINAR_ALARMA_ERROR,
  OBTENER_ALARMA_EDIT_COMPLETADO,
  OBTENER_ALARMA_EDIT_ERROR,
  PETICION_AGREGAR_ALARMA,
  PETICION_EDITAR_ALARMA,
  PETICION_ELIMINAR_ALARMA,
  PETICION_OBTENER_ALARMA_EDIT,
} from "../types/alarmasTypes";

export const obternerAlarmasAction = () => async (dispatch) => {
  dispatch(descargarAlarmas(true));

  try {
    const { data } = await clienteEstaciones.get("Alarmas");
    dispatch(descargarAlarmasCompletado(data));
  } catch (err) {
    dispatch(descargaAlarmasError(true));
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const descargarAlarmas = (estado) => ({
  type: COMENZAR_DESCARGA_ALARMAS,
  payload: estado,
});

const descargaAlarmasError = (estado) => ({
  type: DESCARGA_ALARMAS_ERROR,
  payload: estado,
});

const descargarAlarmasCompletado = (alarmas) => ({
  type: DESCARGA_ALARMAS_COMPLETADO,
  payload: alarmas,
});

export const eliminarAlarmaAction = (idAlarma) => async (dispatch) => {
  dispatch(peticionEliminarAlarma(true));

  try {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una configuración que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await clienteEstaciones.delete(`Alarmas/${idAlarma}`);
        dispatch(eliminarAlarmaCompletado(false));
        dispatch(obternerAlarmasAction());
      } else {
        dispatch(eliminarAlarmaError(false));
      }
    });
  } catch (err) {
    dispatch(eliminarAlarmaError(false));
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Algo pasó, intente de nuevo",
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  }
};

const peticionEliminarAlarma = (estado) => ({
  type: PETICION_ELIMINAR_ALARMA,
  payload: estado,
});

const eliminarAlarmaCompletado = (estado) => ({
  type: ELIMINAR_ALARMA_COMPLETADO,
  payload: estado,
});

const eliminarAlarmaError = (estado) => ({
  type: ELIMINAR_ALARMA_ERROR,
  payload: estado,
});

export const cambiarModoAction = (dataAction) => async (dispatch) => {
  dispatch(cambiarModo(dataAction));
};

const cambiarModo = (dataAction) => ({
  type: CAMBIAR_MODO,
  payload: dataAction,
});

export const crearAlarmaAction = (dataAlarma) => async (dispatch) => {
  dispatch(peticionAgregarAlarma(true));

  try {
    await clienteEstaciones.post("Alarmas", dataAlarma);
    dispatch(agregarAlarmaCompletado(false));
    dispatch(obternerAlarmasAction());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Alarma agreada correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log(err);
    if (err.response?.data) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data,
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
    dispatch(agregarAlarmaError(false));
  }
};

const peticionAgregarAlarma = (estado) => ({
  type: PETICION_AGREGAR_ALARMA,
  payload: estado,
});

const agregarAlarmaCompletado = (estado) => ({
  type: AGREGAR_ALARMA_COMPLETADO,
  payload: estado,
});

const agregarAlarmaError = (estado) => ({
  type: AGREGAR_ALARMA_ERROR,
  payload: estado,
});

export const obtenerAlarmaEditAction =
  (objectid, reset) => async (dispatch) => {
    dispatch(peticionObtenerAlarmaEdit(true));
    dispatch(cambiarModoAction("editar"));

    try {
      const { data } = await clienteEstaciones.get(
        `Alarmas/OBJECTID/${objectid}`
      );
      reset(data[0]);
      dispatch(obtenerAlarmaEditCompletado(data[0]));
    } catch (err) {
      console.log(err);
      dispatch(obtenerAlarmaEditError(false));
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    }
  };

const peticionObtenerAlarmaEdit = (estado) => ({
  type: PETICION_OBTENER_ALARMA_EDIT,
  payload: estado,
});

const obtenerAlarmaEditCompletado = (dataEdit) => ({
  type: OBTENER_ALARMA_EDIT_COMPLETADO,
  payload: dataEdit,
});

const obtenerAlarmaEditError = (estado) => ({
  type: OBTENER_ALARMA_EDIT_ERROR,
  payload: estado,
});

export const editarAlarmaAction = (dataEdit) => async (dispatch) => {
  dispatch(peticionEditarAlarma(true));

  try {
    await clienteEstaciones.put("Alarmas", dataEdit);
    dispatch(editarAlarmaCompletado(false));
    dispatch(obternerAlarmasAction());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Alarma actualizada correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.log(err);
    dispatch(editarAlarmaError(false));
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

const peticionEditarAlarma = (estado) => ({
  type: PETICION_EDITAR_ALARMA,
  payload: estado,
});

const editarAlarmaCompletado = (estado) => ({
  type: EDITAR_ALARMA_COMPLETADO,
  payload: estado,
});

const editarAlarmaError = (estado) => ({
  type: EDITAR_ALARMA_ERROR,
  payload: estado,
});
