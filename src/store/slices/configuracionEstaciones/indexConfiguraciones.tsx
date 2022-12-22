import { createSlice } from "@reduxjs/toolkit";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

export interface IConfiguracionEstaciones {
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
const initialState: IConfiguracionEstaciones = {
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
  t003fechaMod: "2022-12-02T21:58:46.255Z",
  t003userMod: "string",
  objectid: 0,
  t001Estaciones: {
    objectid: 0,
    t001nombre: "string",
    t001coord1: 0,
    t001coord2: 0,
    t001fechaMod: "2022-12-02T21:58:46.255Z",
    t001userMod: "string",
  },
};

const configuracionEstaciones = createSlice({
  name: "configuracion",
  initialState,
  reducers: {
    obtenerConfiguracionesAction: (state, action) => {
      state.idConfiguracion = action.payload.idConfiguracion

    },
  },
});
export const { obtenerConfiguracionesAction } =
  configuracionEstaciones.actions;
export default configuracionEstaciones.reducer;

export const obtenerConfiguracion = async (dispatch) => {
   await clienteEstaciones.get(
    "Configuraciones"
  ).then(()=>{
    dispatch(obtenerConfiguracionesAction) 
  });
};
