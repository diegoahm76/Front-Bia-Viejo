import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import axios from "axios";

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
    crearEstacionAction: (state, action) => {
      state.Usuarios.push(action.payload);
    },

    setUsuarioEditar: (state, action) => {
      state.UsuarioEditar = action.payload
    },
    eliminarEstacionAction: (state, action) => {
      state.Usuarios = state.Usuarios.filter((estacion) => estacion.objectid !== action.payload)
    },
    editarEstacionAction: (state, action) => {
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
  crearEstacionAction,
  setUsuarioEditar,
  eliminarEstacionAction,
  editarEstacionAction
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
  await clienteEstaciones.delete(`U/${id}`).then((res) => {
    dispatch(eliminarEstacionAction(id));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario eliminada correctamente",
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
