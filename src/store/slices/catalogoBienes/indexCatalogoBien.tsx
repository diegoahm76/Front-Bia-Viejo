import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IBienGet, IBienes } from "../../../Interfaces/Bienes";

import clienteAxios from "../../../config/clienteAxios";
import clienteBack from "../../../config/clienteBack";

export const initialStateBien: IBienGet = {
  bien: [],
  dataEdit: {
    edit: false,
    id_bien_padre: 0,
    nivel_jerarquico: 0,
  },
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
    id_bien_padre: null,
  },
};

const bienForm = createSlice({
  name: "bien",
  initialState: initialStateBien,
  reducers: {
    obtenerBienes: (state, action) => {
      state.bien = action.payload;
    },
    crearBienAction: (state, action) => {
      state.bien.push(action.payload);
      console.log(action.payload);
    },
    editarBienAction: (state, action) => {
      state.bien.map((bienA, index) => {
        if (bienA.id_bien === action.payload.id_bien) {
          state.bien[index] = action.payload;
        }
      });
    },
    seleccionarBienModelCrete: (state, action) => {
      state.bienSeleccionado = action.payload;
      state.dataEdit = {
        nivel_jerarquico: action.payload.nivel_jerarquico + 1,
        id_bien_padre: action.payload?.id_bien,
        edit: false
      };
    },
    seleccionarBienModelEdit: (state, action) => {
      state.bienSeleccionado = action.payload;
      state.dataEdit = {
        nivel_jerarquico: action.payload.nivel_jerarquico,
        id_bien_padre: action.payload?.id_bien,
        edit: true
      };
    },
    obtenerBienAction: (state, action) => {
      state.bienSeleccionado = action.payload;
    },
    eliminarBienAction: (state, action) => {
      state.bien = state.bien.filter(b => b.id_bien !== action.payload)
    },
  },
});

export const {
  obtenerBienes,
  seleccionarBienModelCrete,
  seleccionarBienModelEdit,
  editarBienAction,
  crearBienAction,
  obtenerBienAction,
  eliminarBienAction,
} = bienForm.actions;
export default bienForm.reducer;

export const obtenerTodosBienes = async (dispatch) => {
  await clienteBack
    .get("almacen/bienes/catalogo-bienes/get-list")
    .then((bienes) => {
      dispatch(obtenerBienes(bienes.data.data));
    })
    .catch(() => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo pasó, intente de nuevo",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

export const crearBien = async (dispatch, dataBien) => {

  await clienteBack
    .put("almacen/bienes/catalogo-bienes/create/", dataBien)
    .then((res) => {
      //falta la llamada del servicio
      dispatch(crearBienAction(dataBien));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Articulo agreado correctamente",
        showConfirmButton: false,
        timer: 2000,
      })
    }).catch((err) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.response.data.detail,
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });;
};

export const obtenerBien = async (dispatch, nodo) => {
  await clienteBack
    .get(`almacen/bienes/catalogo-bienes/get/${nodo.id_bien}`) //la peticion se llma delete pero es get
    .then((response) => {
      dispatch(obtenerBienAction(response.data));
    })
    .catch((error) => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error intentelo de nuevo por favor",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

export const eliminarBien = async (dispatch, nodo) => {

  await clienteBack
    .delete(`almacen/bienes/catalogo-bienes/delete/${nodo.data.id_nodo}`)
    .then(() => {
      dispatch(eliminarBienAction(nodo.data.id_nodo))
      console.log(nodo);
      Swal.fire("Correcto", "La Carpeta se elimino correctamente", "success");
    })
    .catch(() => {
      console.log(nodo);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ha ocurrido un error intentelo de nuevo por favor",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
    });
};

export const seleccionarBienEdit = (dispatch, bien) => {
  dispatch(seleccionarBienModelEdit(bien));
};
export const seleccionarBienCreate = (dispatch, bien) => {
  const data = { ...bien };
  data.id_bien_padre = data.id_bien === 0 ? 0 : data.id_bien;
  data.nivel_jerarquico = data.nivel_jerarquico + 1;
  data.id_bien = null;
  dispatch(seleccionarBienModelCrete(data));
};

export const editarBien = async (dispatch, dataEdit) => {
  const dataModel = construirModelo(dataEdit);
  await clienteBack
    .put("almacen/bienes/catalogo-bienes/create/", dataModel)
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
