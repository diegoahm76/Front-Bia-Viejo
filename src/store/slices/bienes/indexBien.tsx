import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IBienGet, IBienes } from "../../../Interfaces/Bienes";

import clienteEstaciones from "../../../config/clienteAxiosEstaciones";

const initialState: IBienGet = {
  bien: [],
  bienSeleccionado: {
    id_bien: 0,
    codigo_bien: "",
    nro_elemento_bien: 0,
    nombre: "",
    cod_tipo_bien: "",
    cod_tipo_activo: "",
    nivel_jerarquico: 0,
    nombre_cientifico: "",
    descripcion: "",
    doc_identificador_nro: "",
    cod_metodo_valoracion: 0,
    cod_tipo_depreciacion: 0,
    cantidad_vida_util: 0,
    valor_residual: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    solicitable_vivero: false,
    tiene_hoja_vida: false,
    maneja_hoja_vida: false,
    visible_solicitudes: false,
    id_marca: 0,
    id_unidad_medida: 0,
    id_porcentaje_iva: 0,
    id_unidad_medida_vida_util: 0,
    id_bien_padre: 0,
  },
  dataEdit: {
    id_bien_padre: 0,
    edit: false,
    nivel_jerarquico:0,
  },
};

const bienForm = createSlice({
  name: "bien",
  initialState,
  reducers: {
    obtenerBienes: (state, action) => {
      state.bien = action.payload;
    },
    crearBienAction: (state, action) => {
      state.bien.push(action.payload);
    },
    editarBienAction: (state, action) => {
      state.bien.map((bienA, index) => {
        if (bienA.id_bien === action.payload.id_bien) {
          state.bien[index] = action.payload;
        }
      });
    },
    seleccionarBienModel: (state, action) => {
      state.bienSeleccionado = action.payload;
    },
    seleccionarBienModelCreate: (state, action) => {
      state.bienSeleccionado = action.payload;
      state.dataEdit.edit = false;
      state.dataEdit.id_bien_padre = action.payload.id_bien;
      state.dataEdit.nivel_jerarquico = action.payload.nivel_jerarquico;
    },
    seleccionarBienModelEdit: (state, action) => {
      state.bienSeleccionado = action.payload;
      state.dataEdit.edit = true;
      state.dataEdit.id_bien_padre = action.payload.id_bien_padre;
      state.dataEdit.nivel_jerarquico = action.payload.nivel_jerarquico;
    },
  },
});

export const {
  obtenerBienes,
  seleccionarBienModelCreate,
  seleccionarBienModelEdit,
  editarBienAction,
  crearBienAction,
} = bienForm.actions;
export default bienForm.reducer;

export const crearBien = async (dispatch, dataBien) => {
  await clienteEstaciones.post("catalogoBienes", dataBien).then((res) => {
    //falta la llamada del servicio
    dispatch(crearBienAction(dataBien));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Articulo agreado correctamente",
      showConfirmButton: false,
      timer: 2000,
    }).catch((err) => {
      if (err.response?.data) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err.response.data,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo pasó, intente de nuevo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
    });
  });
};

export const seleccionarBien = (dispatch, bien) => {
  if(bien.id_bien!==null)
  {
    //create
    dispatch(seleccionarBienModelCreate(bien));
  }else{
    //edit
    dispatch(seleccionarBienModelEdit(bien));
  }
};
export const editarBien = async (dispatch, dataEdit) => {
  const dataModel = construirModelo(dataEdit);
  await clienteEstaciones
    .put("CatalogoBien", dataModel)
    .then(() => {
      //cambiar llamado de servicio
      dispatch(editarBienAction(dataModel));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Articulo actualizado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Algo pasó, intente de nuevo, ${error.response.data} `,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

const construirModelo = (data) => {
  return {
    id_bien: data.id_bien,
    codigo_bien: data.codigo_bien,
    nro_elemento_bien: data.nro_elemento_bien,
    nombre: data.nombre,
    cod_tipo_bien: data.cod_tipo_bien,
    cod_tipo_activo: data.cod_tipo_activo,
    nivel_jerarquico: data.nivel_jerarquico,
    nombre_cientifico: data.nombre_cientifico,
    descripcion: data.descripcion,
    doc_identificador_nro: data.doc_identificador_nro,
    cod_metodo_valoracion: data.cod_metodo_valoracion,
    cod_tipo_depreciacion: data.cod_tipo_depreciacion,
    cantidad_vida_util: data.cantidad_vida_util,
    valor_residual: data.valor_residual,
    stock_minimo: data.stock_minimo,
    stock_maximo: data.stock_maximo,
    solicitable_vivero: data.solicitable_vivero,
    tiene_hoja_vida: data.tiene_hoja_vida,
    maneja_hoja_vida: data.maneja_hoja_vida,
    visible_solicitudes: data.visible_solicitudes,
    id_marca: data.id_marca,
    id_unidad_medida: data.id_unidad_medida,
    id_porcentaje_iva: data.id_porcentaje_iva,
    id_unidad_medida_vida_util: data.id_unidad_medida_vida_util,
    id_bien_padre: data.id_bien_padre,
  };
};