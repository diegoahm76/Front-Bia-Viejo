import { createSlice } from "@reduxjs/toolkit";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

export interface IMonitoreo {
  idMonitoreo: number;
  t008tiempoMonitoreo: number;
}

const initialState: IMonitoreo = {
  idMonitoreo: 0,
  t008tiempoMonitoreo: 0,
};

const monitoreoSlice = createSlice({
  name: "monitoreo",
  initialState,
  reducers: {
    obtenerMonitoreoAction: (state, action) => {
      
    },
  },
});

export const obtenerMonitoreo = async (dispatch) => {
  await clienteEstaciones.get("Monitoreo").then(()=>{
    dispatch(obtenerMonitoreoAction)
  });
};

export const { obtenerMonitoreoAction } = monitoreoSlice.actions;
export default monitoreoSlice.reducer;
