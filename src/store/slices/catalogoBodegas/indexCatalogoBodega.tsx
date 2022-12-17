import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { IBienes } from "../../../Interfaces/Bienes";



const bienes = createSlice({
    name: "alarma",
    initialState:[] as IBienes[],
    reducers: {
        obtenerBienes: (state, action) => {
            state.push(action.payload);
        },
        crearBienAction: (state, action) => {
            // REVISAR
            // state.alarmas.push(action.payload);
        },
        editarBienAction: (state, action) => {

        },
        obtenerBienByIdAction: (state, action) => {

        }
    }
})


export const { obtenerBienes, crearBienAction, editarBienAction, obtenerBienByIdAction } = bienes.actions;
export default bienes.reducer

export const crearBien = async (dispatch, dataBien) => {
}
export const obtenerBienEdit = async (dispatch, objectid: string) => {
   
}

export const editarBien = async (dispatch, dataEdit) => {
   
}

export const obtenerTodosBienes = async (dispatch) => {
   
}