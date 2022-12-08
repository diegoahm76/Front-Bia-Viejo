import { createSlice } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

export interface IConfiguracionEstacion {
  idConfiguracion: number;
  t003frecuencia: number;
  t003temperaturaAmbienteMax: number;
  t003temperaturaAmbienteMin: number;
  t003humedadAmbienteMax: number;
  t003humedadAmbienteMin: number;
  t003presionBarometricaMax: number;
  t003presionBarometricaMin: number;
  t003velocidadVientoMax: number;
  t003velocidadVientoMin: number;
  t003direccionVientoMax: number;
  t003direccionVientoMin: number;
  t003precipitacionMax: number;
  t003precipitacionMin: number;
  t003luminocidadMax: number;
  t003luminocidadMin: number;
  t003nivelAguaMax: number;
  t003nivelAguaMin: number;
  t003velocidadAguaMax: number;
  t003velocidadAguaMin: number;
  t003fechaMod: string;
  t003userMod: string;
  objectid: number;
  t001Estaciones: {
    objectid: number;
    t001nombre: string;
    t001coord1: number;
    t001coord2: number;
    t001fechaMod: string;
    t001userMod: string;
  };
}
export interface IConfiguracionEstacionGeneric {
  estacionConfiguracionEditar: IConfiguracionEstacion;
  configuracion: IConfiguracionEstacion[];
}

const initialState: IConfiguracionEstacionGeneric = {
  configuracion: [
    {
      idConfiguracion: 0,
      t003frecuencia: 0,
      t003temperaturaAmbienteMax: 0,
      t003temperaturaAmbienteMin: 0,
      t003humedadAmbienteMax: 0,
      t003humedadAmbienteMin: 0,
      t003presionBarometricaMax: 0,
      t003presionBarometricaMin: 0,
      t003velocidadVientoMax: 0,
      t003velocidadVientoMin: 0,
      t003direccionVientoMax: 0,
      t003direccionVientoMin: 0,
      t003precipitacionMax: 0,
      t003precipitacionMin: 0,
      t003luminocidadMax: 0,
      t003luminocidadMin: 0,
      t003nivelAguaMax: 0,
      t003nivelAguaMin: 0,
      t003velocidadAguaMax: 0,
      t003velocidadAguaMin: 0,
      t003fechaMod: "",
      t003userMod: "",
      objectid: 0,
      t001Estaciones: {
        objectid: 0,
        t001nombre: "",
        t001coord1: 0,
        t001coord2: 0,
        t001fechaMod: "",
        t001userMod: "",
      },
    },
  ],
  estacionConfiguracionEditar: {
    idConfiguracion: 0,
    t003frecuencia: 0,
    t003temperaturaAmbienteMax: 0,
    t003temperaturaAmbienteMin: 0,
    t003humedadAmbienteMax: 0,
    t003humedadAmbienteMin: 0,
    t003presionBarometricaMax: 0,
    t003presionBarometricaMin: 0,
    t003velocidadVientoMax: 0,
    t003velocidadVientoMin: 0,
    t003direccionVientoMax: 0,
    t003direccionVientoMin: 0,
    t003precipitacionMax: 0,
    t003precipitacionMin: 0,
    t003luminocidadMax: 0,
    t003luminocidadMin: 0,
    t003nivelAguaMax: 0,
    t003nivelAguaMin: 0,
    t003velocidadAguaMax: 0,
    t003velocidadAguaMin: 0,
    t003fechaMod: "",
    t003userMod: "",
    objectid: 0,
    t001Estaciones: {
      objectid: 0,
      t001nombre: "",
      t001coord1: 0,
      t001coord2: 0,
      t001fechaMod: "",
      t001userMod: "",
    },
  },
};
const configuracionEstacionesSlice = createSlice({
  name: "configuracionEstaciones",
  initialState,
  reducers: {
    obtenerConfiguracionEstacionesAction: (state, action) => {
      // state.estaciones.pop();
      state.configuracion = action.payload;
    },
    configuracionEstacionesEditarAction: (state, action) => {},
    setConfiguracionEstacionEditar: (state, action) => {
      state.estacionConfiguracionEditar = action.payload;
    },
  },
});

export const obtenerConguracionEstaciones = async (dispatch) => {
  const { data: getConfiguraciones } = await clienteEstaciones.get(
    "Configuraciones"
  );
  console.log("Configuraciones", getConfiguraciones);

  const formatFechaConfiguraciones = getConfiguraciones.map(
    (configuracion) => ({
      ...configuracion,
      t003fechaMod: formatISO(new Date(configuracion.t003fechaMod), {
        representation: "date",
      }),
    })
  );
  dispatch(obtenerConfiguracionEstacionesAction(formatFechaConfiguraciones));
  //console.log("dataGetEstaciones", dataGetEstaciones);
};

export const editarConfiguracionEstaciones = async (
  dispatch,
  configuracion
) => {
  await clienteEstaciones.put("Configuraciones", configuracion);

  configuracion.t003fechaMod = formatISO(new Date(configuracion.t003fechaMod), {
    representation: "date",
  });
  dispatch(configuracionEstacionesEditarAction(configuracion));
};

export const setConfifuracionEstacionEditarModelo = async (
  dispatch,
  estacion
) => {
  dispatch(setConfiguracionEstacionEditar(estacion));
};

export const {
  obtenerConfiguracionEstacionesAction,
  configuracionEstacionesEditarAction,
  setConfiguracionEstacionEditar,
} = configuracionEstacionesSlice.actions;
export default configuracionEstacionesSlice.reducer;
