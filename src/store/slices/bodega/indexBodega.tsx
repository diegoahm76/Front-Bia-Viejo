import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
export interface IBodega {
  nombre: string;
  cod_municipio: string;
  direccion: string;
  id_responsable: number;
  es_principal: boolean;
}
const initialState: IBodega[] = [
  {
    nombre: "string",
    cod_municipio: "string",
    direccion: "string",
    id_responsable: 0,
    es_principal: true,
  },
];

const bodegaSlice = createSlice({
  name: "bodega",
  initialState,
  reducers: {
    crearBodegaAction: (state, action) => {

    },
    obtenerBodegaAction: (state, action) => {
      state.push(action.payload);
    },
    eliminarBodegaAction: (state, action) => {

    },
    editarBodegaAction1:(state, action)=>{

    },
  },
});

export const { crearBodegaAction, obtenerBodegaAction, eliminarBodegaAction, editarBodegaAction1 } =
  bodegaSlice.actions;
export default bodegaSlice.reducer;

export const crearBodega = async (dispatch, bodega: IBodega) => {
  await clienteAxios.post("almacen/bodega/create/", bodega).then(() => {
    dispatch(crearBodegaAction(bodega));
    Swal.fire("Correcto", "La bodega se agrego correctamente", "success");
  });
};

export const obtenerBodega = async (dispatch) => {
  await clienteAxios.get("almacen/bodega/get-list/").then((data) => {
    dispatch(obtenerBodegaAction(data));
  });
};

export const eliminarBodega = async (dispatch, id_bodega) => {
  await clienteAxios.delete(`almacen/bodega/delete/${id_bodega}`).then(() => {
    dispatch(eliminarBodegaAction(id_bodega));
    Swal.fire("Correcto", "La bodega se elimino correctamente", "success");
  });
};

export const editarBodega = async (dispatch, id_bodega) =>{
  await clienteAxios.put(`almacen/bodega/update/${id_bodega}`, id_bodega).then(()=>{
    dispatch(obtenerBodegaAction(id_bodega))
    dispatch(editarBodegaAction1(id_bodega));
  });
      

}




