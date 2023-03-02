import clienteEstaciones from "../config/clienteAxiosEstaciones";
import {
  AGREGAR_ESTACION,
  AGREGAR_ESTACION_ERROR,
  AGREGAR_ESTACION_EXITO,
  COMENZAR_DESCARGA_ESTACIONES,
  DESCARGA_ESTACIONES_ERROR,
  DESCARGA_ESTACIONES_EXITO,
  COMENZAR_EDICION_ESTACION,
  ESTACION_EDITADO_ERROR,
  ESTACION_EDITADO_EXITO,
  ESTACION_ELIMINADO_ERROR,
  ESTACION_ELIMINADO_EXITO,
  OBTENER_ESTACION_EDITAR,
  OBTENER_ESTACION_ELIMINAR,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_EXITO,
  DESCARGA_USUARIOS_ERROR,
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_EXITO,
  AGREGAR_USUARIO_ERROR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  COMENZAR_ELIMINAR_USUARIO,
  OBTENER_USUARIO_EDITAR,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITADO_EXITO,
} from "../types/estacionesTypes";
import Swal from "sweetalert2";
import { formatISO } from "date-fns";

export const obtenerEstacionesAction = () => {
  return async (dispatch) => {
    dispatch(descargarEstaciones(true));

    try {
      const { data: dataGetEstaciones } = await clienteEstaciones.get(
        "Estaciones"
      );
      //console.log("dataGetEstaciones", dataGetEstaciones);
      const formatFechaEstaciones = dataGetEstaciones.map((estacion) => ({
        ...estacion,
        t001fechaMod: formatISO(new Date(estacion.t001fechaMod), {
          representation: "date",
        }),
      }));
      dispatch(descargarEstacionesExito(formatFechaEstaciones));
    } catch (error) {
      console.log(error);
      dispatch(descargarEstacionesError(true));
    }
  };
};

const descargarEstaciones = (estado) => ({
  type: COMENZAR_DESCARGA_ESTACIONES,
  payload: estado,
});

const descargarEstacionesExito = (estaciones) => ({
  type: DESCARGA_ESTACIONES_EXITO,
  payload: estaciones,
});

const descargarEstacionesError = (estado) => ({
  type: DESCARGA_ESTACIONES_ERROR,
  payload: estado,
});

export const crearNuevaEstacionAction = (estacion) => {
  return async (dispatch) => {
    dispatch(agregarEstacion());

    try {
      await clienteEstaciones.post("estaciones", estacion);

      //console.log("Creacion de estacion", dataCreate);
      estacion.t001fechaMod = formatISO(new Date(estacion.t001fechaMod), {
        representation: "date",
      });

      dispatch(agregarEstacionExito(estacion));

      Swal.fire("Correcto", "La estación se agrego correctamente", "success");
    } catch (error) {
      console.log(error);

      dispatch(agregarEstacionError(true));

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
};

const agregarEstacion = () => ({
  type: AGREGAR_ESTACION,
});

const agregarEstacionExito = (estacion) => ({
  type: AGREGAR_ESTACION_EXITO,
  payload: estacion,
});

const agregarEstacionError = (estado) => ({
  type: AGREGAR_ESTACION_ERROR,
  payload: estado,
});

export const eliminarEstacionAction = (id) => {
  return async (dispatch) => {
    dispatch(obtenerEstacionEliminar(id));

    try {
      await clienteEstaciones.delete(`Estaciones/${id}`);
      dispatch(estacionEliminadaExito());
    } catch (error) {
      console.log(error);
      dispatch(estacionEliminarError(true));
    }
  };
};

const obtenerEstacionEliminar = (id) => ({
  type: OBTENER_ESTACION_ELIMINAR,
  payload: id,
});

const estacionEliminadaExito = () => ({
  type: ESTACION_ELIMINADO_EXITO,
});

const estacionEliminarError = (estado) => ({
  type: ESTACION_ELIMINADO_ERROR,
  payload: estado,
});

export const obtenerEstacionEditarAction = (estacion) => {
  return (dispatch) => {
    dispatch(obtenerEstacionEditar(estacion));
  };
};

const obtenerEstacionEditar = (estacion) => ({
  type: OBTENER_ESTACION_EDITAR,
  payload: estacion,
});

export const editarEstacionAction = (estacion) => {
  return async (dispatch) => {
    dispatch(editarEstacion());

    try {
      await clienteEstaciones.put("Estaciones", estacion);

      estacion.t001fechaMod = formatISO(new Date(estacion.t001fechaMod), {
        representation: "date",
      });

      dispatch(editarEstacionExito(estacion));
      Swal.fire(
        "Correcto",
        "La estación se actualizo correctamente",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(estacionEditadaError(true));
    }
  };
};

const editarEstacion = () => ({
  type: COMENZAR_EDICION_ESTACION,
});

const editarEstacionExito = (estacion) => ({
  type: ESTACION_EDITADO_EXITO,
  payload: estacion,
});

const estacionEditadaError = (estado) => ({
  type: ESTACION_EDITADO_ERROR,
  payload: estado,
});

//Usuarios
export const obtenerUsuariosAction = () => {
  return async (dispatch) => {
    dispatch(descargarUsuarios(true));

    try {
      const { data: dataGetUsuarios } = await clienteEstaciones.get("usuarios");
      dispatch(descargarUsuariosExito(dataGetUsuarios));
    } catch (error) {
      console.log(error);
      dispatch(descargarUsuariosError(true));
    }
  };
};
export const obtenerUsuariosActionGuayuriba = () => {
  const EstacionGuay = "Guayuriba";
  return async (dispatch) => {
    dispatch(descargarUsuarios(true));

    try {
      const { data: dataGetUsuarios } = await clienteEstaciones.get(
        "usuarios" + EstacionGuay
      );
      dispatch(descargarUsuariosExito(dataGetUsuarios));
    } catch (error) {
      console.log(error);
      dispatch(descargarUsuariosError(true));
    }
  };
};

const descargarUsuarios = (estado) => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: estado,
});

const descargarUsuariosExito = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITO,
  payload: usuarios,
});

const descargarUsuariosError = (estado) => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: estado,
});

export const crearNuevoUsuarioAction = (usuario) => {
  return async (dispatch) => {
    dispatch(agregarUsuario());

    try {
      await clienteEstaciones.post("Usuarios", usuario);
      dispatch(obtenerUsuariosAction());
      dispatch(agregarUsuarioExito(usuario));

      Swal.fire("Correcto", "El usuario se agrego correctamente", "success");
    } catch (error) {
      console.log(error);

      dispatch(agregarUsuarioError(true));

      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
};

const agregarUsuario = () => ({
  type: AGREGAR_USUARIO,
});

const agregarUsuarioExito = (usuario) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: usuario,
});

const agregarUsuarioError = (estado) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: estado,
});

export const obtenerUsusarioEliminarAction = (usuario) => {
  return (dispatch) => {
    dispatch(obtenerUsuarioEliminar(usuario));
  };
};

const obtenerUsuarioEliminar = (usuario) => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: usuario,
});

export const eliminarUsuarioAction = (id) => {
  return async (dispatch) => {
    dispatch(comenzarELiminarUsuario());

    try {
      await clienteEstaciones.delete(`Usuarios/${id}`);
      dispatch(usuarioEliminadoExito());
      Swal.fire("Correcto", "El usuario se elimino correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(usuarioEliminarError(true));
    }
  };
};

const comenzarELiminarUsuario = () => ({
  type: COMENZAR_ELIMINAR_USUARIO,
});

const usuarioEliminadoExito = () => ({
  type: USUARIO_ELIMINADO_EXITO,
});

const usuarioEliminarError = (estado) => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: estado,
});

export const obtenerUsuarioEditarAction = (usuario) => {
  return (dispatch) => {
    dispatch(obtenerUsuarioEditar(usuario));
  };
};

const obtenerUsuarioEditar = (usuario) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: usuario,
});

export const editarUsuarioAction = (usuario) => {
  return async (dispatch) => {
    dispatch(editarUsuario());

    try {
      await clienteEstaciones.put("Usuarios", usuario);
      dispatch(obtenerUsuariosAction());
      dispatch(editarUsuarioExito(usuario));
      Swal.fire("Correcto", "El usuario se actualizo correctamente", "success");
    } catch (error) {
      console.log(error);
      dispatch(usuarioEditadaError(true));
    }
  };
};

const editarUsuario = () => ({
  type: COMENZAR_EDICION_USUARIO,
});

const editarUsuarioExito = (usuario) => ({
  type: USUARIO_EDITADO_EXITO,
  payload: usuario,
});

const usuarioEditadaError = (estado) => ({
  type: ESTACION_EDITADO_ERROR,
  payload: estado,
});
