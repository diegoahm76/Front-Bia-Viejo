import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { IMarcas, IMarcaGet } from "../../../Interfaces/Marca";

import clienteAxios from "../../../config/clienteAxios";

const initialState: IMarcaGet = {
  marca: [],
  marcaSeleccionada: {
    id_marca: 0,
    nombre: "",
    item_ya_usado: false,
    activo: false,
  },
};

const marcaForm = createSlice({
  name: "marca",
  initialState,
  reducers: {
    obtenerMarcas: (state, action) => {
      state.marca = action.payload;
    },
    crearMarcaAction: (state, action) => {
      state.marca.push(action.payload);
    },
    editarMarcaAction: (state, action) => {
      state.marca.map((marcaA, index) => {
        if (marcaA.id_marca === action.payload.id_marca) {
          state.marca[index] = action.payload;
        }
      });
    },
    seleccionarMarcaModel: (state, action) => {
      state.marcaSeleccionada = action.payload;
    },
  },
});

export const {
  obtenerMarcas,
  crearMarcaAction,
  editarMarcaAction,
  seleccionarMarcaModel,
} = marcaForm.actions;
export default marcaForm.reducer;

export const crearMarca = async (dispatch, dataMarca) => {
  await clienteAxios
    .post("almacen/marcas/create", dataMarca)
    .then((res) => {
      //falta la llamada del servicio
      dispatch(crearMarcaAction(dataMarca));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Marca agreada correctamente",
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

export const seleccionarMarca = (dispatch, marca) => {
  //create
  dispatch(seleccionarMarcaModel(marca));
};
export const editarMarca = async (dispatch, dataEdit) => {
  const dataModel = construirModelo(dataEdit);
  await clienteAxios
    .put(`almacen/marcas/update/${dataEdit.id_marca}`, dataModel)
    .then(() => {
      //cambiar llamado de servicio
      dispatch(editarMarcaAction(dataModel));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Marca actualizada correctamente",
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

export const eliminarMarca = async (dispatch, id_marca) => {
    await clienteAxios.delete(`almacen/marcas/delete/${id_marca}`).then(() => {
      dispatch(editarMarcaAction(id_marca));
      Swal.fire("Correcto", "La Marca se elimino correctamente", "success");
    });
  };

const construirModelo = (data) => {
  return {
    marca: data.id_marca,
    nombre: data.nombre,
    activo: data.activo,
    item_ya_usado: data.item_ya_usado,
  };
};
