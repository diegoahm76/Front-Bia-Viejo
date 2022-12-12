import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

const initialState = {
    alarmasConfig: [],
    error: null,
    loading: false,
    alarmaConfigAction: null,
    dataEdit: null,
};
const alarmasConfig = createSlice({
    name: "alarmasConfig",
    initialState,
    reducers: {
        crearAlarmaAction: (state, action) => {
            // REVISAR
            // state.alarmas.push(action.payload);
        },
        editarAlarmasConfigAction: (state, action) => {
            // REVISAR UPDATE
        },
        obtenerAlarmaEditAction: (state, action) => {
            state.dataEdit = action.payload.dataEdit;
        }
    }
})

export default alarmasConfig.reducer;
export const { editarAlarmasConfigAction } = alarmasConfig.actions;


export const editarAlarmasConfig = async (dispatch, dataEdit) => {
    await clienteEstaciones.put("AlarmasConfiguraciones", dataEdit).then(() => {
        dispatch(editarAlarmasConfigAction(dataEdit));
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Alarma actualizada correctamente",
            showConfirmButton: false,
            timer: 2000,
        });
    });
}