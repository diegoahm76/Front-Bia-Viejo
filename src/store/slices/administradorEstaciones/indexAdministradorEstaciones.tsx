import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

export interface IEstacion {
  objectid: number;
  t001nombre: string;
  t001coord1: number;
  t001coord2: number;
  t001fechaMod: string;
  t001userMod: string;
}


const administradorEstacionesSlice = createSlice({
  name: "AdministradorEstaciones",
  initialState: [] as IEstacion[],
  reducers: {
    crearEstacionAction: (state, action) => { },
    obtenerEstacionAction: (state, action) => {
      state.push(action.payload)
    },
    eliminarEstacionAction: (state, action) => { },
    editarEstacionAction: (state, action) => { },
  },
});

export const obtenerEstacion = async (dispatch) => {
  const { data: dataGetEstaciones } = await clienteEstaciones.get("Estaciones");
  //console.log("dataGetEstaciones", dataGetEstaciones);
  const formatFechaEstaciones = dataGetEstaciones.map((estacion) => ({
    ...estacion,
    t001fechaMod: formatISO(new Date(estacion.t001fechaMod), {
      representation: "date",
    }),
  }));
  dispatch(obtenerEstacionAction(formatFechaEstaciones));
};

export const eliminarEstacion = async (dispatch, id) => {
  await clienteEstaciones.delete(`Estaciones/${id}`);
  dispatch(eliminarEstacionAction(id));
};

export const editarEstacion = async (dispatch, estacion) => {
  await clienteEstaciones.put("Estaciones", estacion);

  estacion.t001fechaMod = formatISO(new Date(estacion.t001fechaMod), {
    representation: "date",
  });

  dispatch(editarEstacionAction(estacion));
};

export const crearEstacion = async (dispatch, estacion: IEstacion) => {
  await clienteEstaciones.post("estaciones", estacion);

  //console.log("Creacion de estacion", dataCreate);
  estacion.t001fechaMod = formatISO(new Date(estacion.t001fechaMod), {
    representation: "date",
  });
  crearEstacionAction(estacion);
};

export const {
  obtenerEstacionAction,
  eliminarEstacionAction,
  editarEstacionAction,
  crearEstacionAction,
} = administradorEstacionesSlice.actions;
export default administradorEstacionesSlice.reducer;
