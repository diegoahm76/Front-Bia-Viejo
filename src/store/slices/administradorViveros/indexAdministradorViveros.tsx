import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import Swal from  "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteBack from "../../../config/clienteBack";

export interface IViveroInfo{
    vivero:[],
        nombre:string,
        cod_municipio:string,
        direccion:string,
        area_mt2:number,
        area_propagacion_mt2:number,
        tiene_area_produccion:boolean,
        tiene_areas_pep_sustrato:boolean,
        tiene_area_embolsado:boolean,
        cod_tipo_vivero:string,
        fecha_inicio_viverista_actual:string,
        cod_origen_recursos_vivero:string,
        fecha_inicio_cuarentena:string,
        id_viverista_actual:number,
        id_persona_crea:number,
};

const initialStateVivero: IViveroInfo={
    vivero:[],
        nombre:"",
        cod_municipio:"",
        direccion:"",
        area_mt2:0,
        area_propagacion_mt2:0,
        tiene_area_produccion:false,
        tiene_areas_pep_sustrato:false,
        tiene_area_embolsado:false,
        cod_tipo_vivero:"",
        fecha_inicio_viverista_actual:"",
        cod_origen_recursos_vivero:"",
        fecha_inicio_cuarentena:"",
        id_viverista_actual:0,
        id_persona_crea:0,
};

const viveroForm = createSlice({
    name: "viveroForm",
    initialState:initialStateVivero,
    reducers:{
        getVivero: (state,action) => {
            state.vivero=action.payload;
    },
    // crearViveroAction:(state,action)=>{
    //     state.vivero.push(action.payload);
    // },
    // editarViveroAction:(state, action)=>{
    //     state.vivero.map((viveroA,action))=>{
    //         if (viveroA.id_vivero===action.payload-id_vivero){
    //             state.vivero[index]=action.payload;
    //         }
    //     }
    // },
    // obtenerViveroAction: (state, action)=>{
    //     state.vivero
    // }

         }
})

