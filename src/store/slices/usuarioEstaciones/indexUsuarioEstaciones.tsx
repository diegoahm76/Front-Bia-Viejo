import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

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

interface IEstacionesInternal {
  objectid: number;
  t001nombre: string;
  t001coord1: number;
  t001coord2: number;
  t001fechaMod: string;
  t001userMod: string;
}

const initialState: IUsuarioEstaciones[] = [
  {
    idUsuario: 1,
    objectid: 1,
    t001Estaciones: {
      objectid: 0,
      t001nombre: "GUayuriba",
      t001coord1: 0,
      t001coord2: 0,
      t001fechaMod: "",
      t001userMod: "",
    },
    t005identificacion: 1076670521,
    t005nombre: "Alejandro",
    t005apellido:"Sastoque",
    t005correo: "sastoque42@gmail.com",
    t005numeroCelular: 3107505784,
    t005Observacion: "",
  },
];

const usuarioEstaciones = createSlice({
  name: "usuarioEstaciones",
  initialState,
  reducers: {
    obtenerUsuarioEstaciones: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { obtenerUsuarioEstaciones } = usuarioEstaciones.actions;
export default usuarioEstaciones.reducer;

export const obtenerTodosUsuarios = async (dispatch) => {
  await clienteEstaciones
    .get("Usuarios")
    .then((usuarioEstaciones) => {
      dispatch(obtenerUsuarioEstaciones(usuarioEstaciones));
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
