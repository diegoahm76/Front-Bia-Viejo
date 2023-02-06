import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteBack from "../../../config/clienteBack";
import {
  IViveroCreate,
  IViveroGeneric,
} from "../../../Interfaces/AdministradorViveros";

const initialState: IViveroGeneric = {
  viveroEditar: {
    id_vivero:0,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    area_mt2: 0,
    area_propagacion_mt2: 0,
    tiene_area_produccion: false,
    tiene_areas_pep_sustrato: false,
    tiene_area_embolsado: false,
    cod_tipo_vivero: "",
    fecha_inicio_viverista_actual: "",
    cod_origen_recursos_vivero: "",
    fecha_inicio_cuarentena: "",
    id_viverista_actual: 0,
    id_persona_crea: 0,
    ruta_archivo_creacion: '',
    fecha_creacion:"",
    en_funcionamiento:false,
    fecha_ultima_apertura:"",
    justificacion_apertura:"",
    fecha_cierre_actual:"",
    justificacion_cierre:"",
    justificacion_cuarentena:"",
    activo:false,
    item_ya_usado:false,
    id_persona_abre:0,
    id_persona_cierra:0,
    id_persona_cuarentea:0,
    vivero_en_cuarentena:false,
  },
  vivero: [],
};

const viveroSlice = createSlice({
  name: "AdministradorViveros",
  initialState,
  reducers: {
    crearViveroAction: (state, action) => {
      state.vivero.push(action.payload);
    },
    obtenerViveroAction: (state, action) => {
      state.vivero = action.payload;
    },
    eliminarViveroAction: (state, action) => {
      state.vivero = state.vivero.filter(
        (alarm) => alarm.id_vivero !== action.payload
      );
    },
    editarViveroAction: (state, action) => {},
    seleccionarViveroAction: (state, action) => {
      state.viveroEditar = action.payload;
    },
  },
});

export const obtenerVivero =async (dispatch,id_vivero) => {
    await clienteAxios.get(`conservacion/viveros/get-by-id/${id_vivero}/`).then(()=>{
        dispatch(obtenerViveroAction(id_vivero));
    });
};

export const eliminarVivero = async (dispatch, id_vivero) => {
    await clienteAxios.delete(`conservacion/viveros/delete/${id_vivero}/`).then(()=>{
        dispatch(eliminarViveroAction(id_vivero));
        Swal.fire("El vivero se elimino correctamente","success");
    });
};

export const editarVivero = async (dispatch, id_vivero, vivero)=>{
    await clienteAxios.put(`conservacion/viveros/update/${id_vivero}`,vivero).then((response:any)=>{
        if(response.data.success){
            Swal.fire("El vivero se edito correctamente","success");
        }else{
            Swal.fire({
                position: "center",
          icon: "error",
          title: "Algo pasó, intente de nuevo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        
                }    );
        }
        dispatch(editarViveroAction(vivero));
    })
    .catch((error)=>{
        Swal.fire({
            position: "center",
          icon: "error",
          title: error.response.data.detail,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
    });
};

export const seleccionarVivero = async(dispatch, vivero)=>{
    dispatch(seleccionarViveroAction(vivero));
};

export const{
    crearViveroAction,
    obtenerViveroAction,
    eliminarViveroAction,
    editarViveroAction,
    seleccionarViveroAction,
} = viveroSlice.actions;

export default viveroSlice.reducer;