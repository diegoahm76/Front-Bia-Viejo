import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import axios from "axios";
import { formatISO } from "date-fns";

export interface IUsuarioEstaciones {
  idUsuario: number;
  objectid: number;
  t001Estaciones: IEstacionesInternal;
  t005identificacion: number;
  t005nombre: string;
  t005apellido: string;
  t005correo: string;
  t005numeroCelular: number;
  t005Observacion: string;
  t005fechaMod: string; 
}
export interface IEstacionGeneric {
  UsuarioEditar: IUsuarioEstaciones;
  Usuarios: IUsuarioEstaciones[];
}
interface IEstacionesInternal {
  objectid: number;
  t001nombre: string;
  t001coord1: number;
  t001coord2: number;
  t001fechaMod: string;
  t001userMod: string;
}
const initialState: IEstacionGeneric = {
  UsuarioEditar: {
    idUsuario: 1,
    objectid: 1,
    t001Estaciones: {
      objectid: 0,
      t001nombre: "",
      t001coord1: 0,
      t001coord2: 0,
      t001fechaMod: "",
      t001userMod: "",
    },
    t005identificacion: 0,
    t005nombre: "",
    t005apellido: "",
    t005correo: "",
    t005numeroCelular: 0,
    t005Observacion: "",
  t005fechaMod: "", 
  },
  Usuarios: [
    {
      idUsuario: 1,
      objectid: 1,
      t001Estaciones: {
        objectid: 0,
        t001nombre: "",
        t001coord1: 0,
        t001coord2: 0,
        t001fechaMod: "",
        t001userMod: "",
      },
      t005identificacion: 0,
      t005nombre: "",
      t005apellido: "",
      t005correo: "",
      t005numeroCelular: 0,
      t005Observacion: "",
      t005fechaMod:"",
    },
  ],
};

const usuarioEstaciones = createSlice({
  name: "usuarioEstaciones",
  initialState,
  reducers: {
    obtenerUsuarioEstaciones: (state, action) => {
      state.Usuarios = action.payload;
    },
    crearUsuarioAccion: (state, action) => {
      state.Usuarios.push(action.payload);
    },

    setUsuarioEditar: (state, action) => {
      state.UsuarioEditar = action.payload
    },
    eliminarUsuarioAction: (state, action) => {
      state.Usuarios = state.Usuarios.filter((estacion) => estacion.objectid !== action.payload)
    },
    editarUsuarioAction: (state, action) => {
      state.Usuarios.forEach((estacion, index) => {
        if (estacion.objectid === action.payload.objectid) {
          state.Usuarios[index] = action.payload;
        }
      });
    },
  },
});

export const {
  obtenerUsuarioEstaciones,
  crearUsuarioAccion,
  setUsuarioEditar,
  eliminarUsuarioAction,
  editarUsuarioAction
} = usuarioEstaciones.actions;
export default usuarioEstaciones.reducer;

export const obtenerTodosUsuarios = async (dispatch) => {
  await clienteEstaciones
    .get("Usuarios")
    .then((usuarioEstaciones) => {
      dispatch(obtenerUsuarioEstaciones(usuarioEstaciones.data));
    })
    .catch(() => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};
export const obtenerNombreEstacion = async (dispatch, estacion) => {
  await clienteEstaciones
    .get(`Estaciones/${estacion}`)
    .then((estacion) => {
      dispatch(obtenerUsuarioEstaciones(estacion.data));
    })
};
export const eliminarEstacion = async (dispatch, id) => {
  await clienteEstaciones.delete(`Usuarios/${id}`).then((res) => {
    dispatch(eliminarUsuarioAction(id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario eliminado correctamente",
      showConfirmButton: false,
      timer: 2000,
    });
  }).catch((error) => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: `Algo pasó, intente de nuevo, ${error.response.data} `,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    });
  });
};
export const crearUsuario = async (dispatch, usuario: IUsuarioEstaciones) => {
  await clienteEstaciones
    .post("Usuarios", usuario)
    .then(() => {
      dispatch(crearUsuarioAccion(usuario));
      Swal.fire("Correcto", "El usuario se agrego correctamente", "success");
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    });
};

// setea la estacion a editar
export const setEstacionEditarModelo = async (dispatch, usuario) => {
  dispatch(setUsuarioEditar(usuario));
};

// Edita la el usuario
export const EditarUsuario = async (dispatch, usuario) => {
  await clienteEstaciones.put("Usuarios", usuario).then(() => {
    usuario.t001fechaMod = formatISO(new Date(usuario.t001fechaMod), {
      representation: "date",
    });
    dispatch(editarUsuarioAction(usuario));
    Swal.fire("Correcto", "El usuario se actualizó", "success");
  });
};