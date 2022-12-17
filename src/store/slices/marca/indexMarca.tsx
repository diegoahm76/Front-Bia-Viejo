import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { IMarca, IMarcaModel } from "../../../Interfaces/marca";

const initialState: IMarca = {
    marcas: [],
    marcaSeleccionada: {
        activo: false,
        id_marca: 0,
        item_ya_usado: false,
        nombre: ""
    }
};


const marcaSlice = createSlice({
    name: "marca",
    initialState,
    reducers: {
        crearMarcaAction: (state, action) => {
            state.marcas.push(action.payload);
        },
        obtenerMarcasAction: (state, action) => {
            state.marcas = action.payload;
        },
        setMarcaSeleccionada: (state, action) => {
            state.marcaSeleccionada = action.payload
        },
        eliminarMarcaAction: (state, action) => {
            state.marcas = state.marcas.filter((marca) => marca.id_marca !== action.payload)
        },
        editarMarcaAction: (state, action) => {
            state.marcas.forEach((marca, index) => {
                if (marca.id_marca === action.payload.id_marca) {
                    state.marcas[index] = action.payload;
                }
            });
        },
    },
});

export const {
    crearMarcaAction,
    editarMarcaAction,
    eliminarMarcaAction,
    obtenerMarcasAction,
    setMarcaSeleccionada
} = marcaSlice.actions;
export default marcaSlice.reducer;

export const obtenerMarcasLista = async (dispatch) => {
    await clienteAxios.get("almacen/marcas/get-list/").then((res) => {
        dispatch(obtenerMarcasAction(res.data));
    });
    //console.log("dataGetEstaciones", dataGetEstaciones);
};

export const seleccionarMarca = (dispatch, marca) => {
    dispatch(setMarcaSeleccionada(marca));
  };

export const eliminarMarca = async (dispatch, id) => {
    const elementModalId = document.getElementById("modal-marca-id")!;
    await clienteAxios.delete(`almacen/marcas/delete/${id}`).then((res) => {
        dispatch(eliminarMarcaAction(id));
        Swal.fire({
            target: elementModalId,
            position: "center",
            icon: "success",
            title: "Marca eliminada correctamente",
            showConfirmButton: false,
            timer: 2000,
        });
    }).catch((error) => {
        Swal.fire({
            target: elementModalId,
            position: "center",
            icon: "error",
            title: `Algo pasó, intente de nuevo, ${error.response.data} `,
            showConfirmButton: true,
            confirmButtonText: "Aceptar",
        });
    });

};


// Edita la estacion
export const editarMarca = async (dispatch, estacion) => {
    // REVISAR ID MARCA
    await clienteAxios.put("almacen/marcas/update/", estacion).then(() => {
        dispatch(editarMarcaAction(estacion));
        Swal.fire("Correcto", "La Marca se actualizo correctamente", "success");
    });
};

export const crearMarca = async (marca) => {
    const elementModalId = document.getElementById("marcaModal")!;
    await clienteAxios.post("almacen/marcas/create/", marca).then(() => {
        // const elementModalId = document.getElementById("marcaModal")!;
        Swal.fire({
            target: elementModalId,
            position: "center",
            icon: "success",
            title: "Marca Creada correctamente",
            showConfirmButton: false,
            timer: 2000,
        });
    }).catch((error) => {
        Swal.fire({
            icon: "error",
            title: "Hubo un error",
            text: "Hubo un error, intenta de nuevo",
        });
    });
};
