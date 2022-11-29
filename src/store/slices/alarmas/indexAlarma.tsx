import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

const initialState = {
    alarmas: [],
    error: null,
    loading: false,
    alarmaAction: null,
    dataEdit: {
        objectid: 0
    },
};

const alarmaModal = createSlice({
    name: "alarma",
    initialState,
    reducers: {
        crearAlarmaAction: (state, action) => {
            // REVISAR
            // state.alarmas.push(action.payload);
        },
        editarAlarmaAction: (state, action) => {

        },
        obtenerAlarmaEditAction: (state, action) => {
            state.dataEdit = action.payload.dataEdit;
        }
    }
})


export const { crearAlarmaAction, editarAlarmaAction, obtenerAlarmaEditAction } = alarmaModal.actions;
export default alarmaModal.reducer
