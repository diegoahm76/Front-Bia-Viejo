import {
    AGREGAR_MARCA,
    AGREGAR_MARCA_EXITO,
    AGREGAR_MARCA_ERROR,
  
    COMENZAR_DESCARGA_MARCA,
    DESCARGA_MARCA_EXITO,
    DESCARGA_MARCA_ERROR,
    
    OBTENER_MARCA_ELIMINAR,
    ELIMINAR_MARCA_EXITO,
    ELIMINAR_MARCA_ERROR,
  } from "../../src/types/creacionMarcaTypes";
  import clienteAxios from "../config/clienteAxios";
  import Swal from "sweetalert2";
  
  export const crearMarcaAction = (marca) => {
    return async (dispatch) => {
      dispatch(agregarMarca());
  
      try {
        const { data } = await clienteAxios.post("almacen/marcas/create/", marca);
        dispatch(agregarMarcaExito(marca));
  
        Swal.fire("Correcto", "La Marca se agrego correctamente", "success");
      } catch (error) {
        console.log(error);
  
        dispatch(agregarMarcaError(true));
  
        Swal.fire({
          icon: "error",
          title: "Hubo un error",
          text: "Hubo un error, intenta de nuevo",
        });
      }
    };
  };
  
  const agregarMarca = () => ({
    type: AGREGAR_MARCA,
  });
  
  const agregarMarcaExito = (marca) => ({
    type: AGREGAR_MARCA_EXITO,
    payload: marca,
  });
  
  const agregarMarcaError = (estado) => ({
    type: AGREGAR_MARCA_ERROR,
    payload: estado,
  });
  
  export const obtenerMarcaAction = () => {
    return async (dispatch) => {
      dispatch(descargarMarca(true));
  
      try {
        const { data: dataGetMarca } = await clienteAxios.get(
          "almacen/marcas/get-list/"
        );
        dispatch(descargarMarcaExito(dataGetMarca));
      } catch (error) {
        console.log(error);
        dispatch(descargarMarcaError(true));
      }
    };
  };
  
  const descargarMarca = (estado) => ({
    type: COMENZAR_DESCARGA_MARCA,
    payload: estado,
  });
  
  const descargarMarcaExito = (marca) => ({
    type: DESCARGA_MARCA_EXITO,
    payload: marca,
  });
  
  const descargarMarcaError = (estado) => ({
    type: DESCARGA_MARCA_ERROR,
    payload: estado,
  });
  
  export const eliminarMarcaAction = (id_marca) => {
    return async (dispatch) => {
      dispatch(obtenerMarcaEliminar(id_marca));
  
      try {
        await clienteAxios.delete(`almacen/marcas/delete/${id_marca}`);
        dispatch(marcaEliminadaExito());
        Swal.fire("Correcto", "La Marca se elimino correctamente", "success");
      } catch (error) {
        console.log(error);
        dispatch(marcaEliminarError(true));
      }
    };
  };
  
  const obtenerMarcaEliminar = (id_marca) => ({
    type: OBTENER_MARCA_ELIMINAR,
    payload: id_marca,
  });
  const marcaEliminadaExito = () => ({
    type: ELIMINAR_MARCA_EXITO,
  });
  
  const marcaEliminarError = (estado) => ({
    type: ELIMINAR_MARCA_ERROR,
    payload: estado,
  });
  