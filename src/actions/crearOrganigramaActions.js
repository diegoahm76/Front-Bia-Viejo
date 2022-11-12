import {
    AGREGAR_ORGANIGRAMA,
    AGREGAR_ORGANIGRAMA_ERROR,
    AGREGAR_ORGANIGRAMA_EXITO,
    DESCARGAR_ORGANIGRAMA,
    DESCARGAR_ORGANIGRAMA_ERROR,
    DESCARGAR_ORGANIGRAMA_EXITO,
    ELIMINAR_OBTENER_ORGANIGRAMA,
    ELIMINAR_ORGANIGRAMA,
    ELIMINAR_ORGANIGRAMA_ERROR,
    ELIMINAR_ORGANIGRAMA_EXITO,
    EDITAR_ORGANIGRAMA,
    EDITAR_ORGANIGRAMA_ERROR,
    EDITAR_ORGANIGRAMA_EXITO,
    EDITAR_ORGANIGRAMA_OBTENER,
} from "../types/crearOrganigramasTypes";
import clienteAxios from '../config/clienteAxios';
import Swal from "sweetalert2";


export const obtenerOrganigramaAction = () => {
    return async (dispatch) => {
        dispatch(descargarOrganigrama(true))

        try {
            const { data: dataGetOrganigrama } = await clienteAxios.get("/almacen/organigrama/get/");
            dispatch(descargarOrganigramaExito(dataGetOrganigrama));
        } catch (error) {
            console.log(error);
            dispatch(descargarOrganigramaError(true));
        }
    }
}

const descargarOrganigrama = (estado) => ({
    type: DESCARGAR_ORGANIGRAMA,
    payload: estado,
  });

const descargarOrganigramaExito = (estado) => ({
    type: DESCARGAR_ORGANIGRAMA_EXITO,
    payload: estado,
})

const descargarOrganigramaError = (estado) => ({
    type: DESCARGAR_ORGANIGRAMA_ERROR,
    payload: estado,
})





export const crearNuevoOrganigramaAction = (organigrama) => {
    return async (dispatch) => {
        dispatch(agregarOrganigrama());

        try{
            await clienteAxios.post("Organigrama", organigrama);
            dispatch(obtenerOrganigramaAction())
            dispatch(agregarOrganigramaExito(organigrama));

            Swal.fire("Correcto", "El usuario se agrego correctamente", "success");
        }   catch (error){
            console.log(error)

            dispatch(agregarOrganigramaError(true));

            Swal.fire({
                icon: "error",
                title: "hubo un error",
                text: error.response.data,
            })
        }
    }
}

const agregarOrganigrama = () => ({
    type: AGREGAR_ORGANIGRAMA,
});

const agregarOrganigramaExito = (organigrama) => ({
    type: AGREGAR_ORGANIGRAMA_EXITO,
    payload: organigrama,
});


const agregarOrganigramaError = (organigrama) => ({
    type: AGREGAR_ORGANIGRAMA_ERROR,
    payload: organigrama,
});





export const obtenerOrganigramaEliminarAction = (organigrama) => {
    return (dispatch) => {
        dispatch(ObtenerOrganigramaEliminar(organigrama));
    };
};

const ObtenerOrganigramaEliminar = (organigrama) => ({
    type: ELIMINAR_OBTENER_ORGANIGRAMA,
    payload: organigrama,
});



// export const obtenerOrganigramaEliminarAction = (organigrama) => {
//     return (dispatch) => {
//         dispatch(obtenerOrganigramaEliminar(organigrama));
//     }
// }

// const obtenerOrganigramaEliminar = (organigrama) => ({
//     type: 
// })


export const eliminarOrganigramaAction = (id) => {
    return async (dispatch) => {
        dispatch(comenzarEliminarOrganigrama());

        try {
            await clienteAxios.delete(`Usuarios/${id}`);
            dispatch(organigramaEliminadoExito())
            Swal.fire(
                "Correcto",
                "El organigrama ha sido eliminado correctamente",
                "success",
            );
        } catch (error){
            console.log(error);
            dispatch(organigramaEliminarError(true));
        }
    };
};

const comenzarEliminarOrganigrama = () => ({
    type: ELIMINAR_ORGANIGRAMA,
});

const organigramaEliminadoExito = () => ({
    type: ELIMINAR_ORGANIGRAMA_EXITO,
});

const organigramaEliminarError = (organigrama) => ({
    type: ELIMINAR_ORGANIGRAMA_ERROR,
    payload: organigrama,
})
