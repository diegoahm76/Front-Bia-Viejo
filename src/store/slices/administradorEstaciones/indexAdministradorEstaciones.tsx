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
export interface IEstacionGeneric {
  estacionEditar: IEstacion,
  estaciones: IEstacion[]
}

const initialState: IEstacionGeneric = {
  estacionEditar: {
    objectid: 0,
    t001coord1: 0,
    t001coord2: 0,
    t001fechaMod: "",
    t001nombre: "",
    t001userMod: "",
  },
  estaciones: [
    {
      objectid: 0,
      t001coord1: 0,
      t001coord2: 0,
      t001fechaMod: "",
      t001nombre: "",
      t001userMod: ""
    }
  ]
}

const administradorEstacionesSlice = createSlice({
  name: "AdministradorEstaciones",
  initialState,
  reducers: {
    crearEstacionAction: (state, action) => { },
    obtenerEstacionAction: (state, action) => {
      // state.estaciones.pop();
      state.estaciones.push(action.payload)
    },
    setEstacionEditar: (state, action) => {
      state.estacionEditar.objectid = action.payload.objectid
      state.estacionEditar.t001coord1 = action.payload.t001coord1
      state.estacionEditar.t001coord2 = action.payload.t001coord2
      state.estacionEditar.t001fechaMod = action.payload.t001fechaMod
      state.estacionEditar.t001nombre = action.payload.t001nombre
      state.estacionEditar.t001userMod = action.payload.t001userMod
    },
    eliminarEstacionAction: (state, action) => { },
    editarEstacionAction: (state, action) => { },
  },
});

export const obtenerEstacion = async (dispatch) => {
  await clienteEstaciones.get("Estaciones").then((res) => {
    const formatFechaEstaciones = res.data.map((estacion) => ({
      ...estacion,
      t001fechaMod: formatISO(new Date(estacion.t001fechaMod), {
        representation: "date",
      }),
    }));
    dispatch(obtenerEstacionAction(formatFechaEstaciones));
  });
  //console.log("dataGetEstaciones", dataGetEstaciones);
};

export const eliminarEstacion = async (dispatch, id) => {
  await clienteEstaciones.delete(`Estaciones/${id}`);
  dispatch(eliminarEstacionAction(id));
};

// setea la estacion a editar
export const setEstacionEditarModelo = async (dispatch, estacion) => {
  dispatch(setEstacionEditar(estacion));
};

// Edita la estacion 
export const editarEstacion = async (dispatch, estacion) => {
  await clienteEstaciones.put("Estaciones", estacion);

  estacion.t001fechaMod = formatISO(new Date(estacion.t001fechaMod), {
    representation: "date",
  });
}

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
  setEstacionEditar
} = administradorEstacionesSlice.actions;
export default administradorEstacionesSlice.reducer;
