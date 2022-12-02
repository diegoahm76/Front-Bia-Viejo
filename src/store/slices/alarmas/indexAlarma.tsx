import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { IAlarmas } from "../../../Interfaces/Alarmas";

const initialState: IAlarmas[] = [{
    idAlarma: 1,
    objectId: 1,
    t001Estaciones: {
        objectid: 0,
        t001coord1: 0,
        t001coord2: 0,
        t001fechaMod: "",
        t001nombre: "",
        t001userMod: ""
    },
    t006color: "",
    t006limite: 2,
    t006nombre: ""
}];

const alarmaModal = createSlice({
    name: "alarma",
    initialState,
    reducers: {
        obtenerAlarmas: (state, action) => {
            state.push(action.payload);
        },
        crearAlarmaAction: (state, action) => {
            // REVISAR
            // state.alarmas.push(action.payload);
        },
        editarAlarmaAction: (state, action) => {

        },
        obtenerAlarmaByIdAction: (state, action) => {

        }
    }
})


export const { obtenerAlarmas, crearAlarmaAction, editarAlarmaAction, obtenerAlarmaByIdAction } = alarmaModal.actions;
export default alarmaModal.reducer
