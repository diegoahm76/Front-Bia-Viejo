import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import IconoEliminarBia from "../../../assets/iconosBotones/eliminar.svg";
import IconoEditarBia from "../../../assets/iconosBotones/editar.svg";
import IconoNuevoBia from "../../../assets/iconosBotones/nuevo.svg";
import NuevaEstacionModal from "../../../components/NuevaEstacionModal";
import Swal from "sweetalert2";
import EditarEstacionModal from "../../../components/EditarEstacionModal";
import Subtitle from "../../../components/Subtitle";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import {
  obtenerEstacion,
  eliminarEstacion,
  setEstacionEditarModelo,
} from "../../../store/slices/administradorEstaciones/indexAdministradorEstaciones";
import clienteEstaciones from "../../../config/clienteAxiosEstaciones";
import { formatISO } from "date-fns";
// import ExportExcelFile from "../../../components/ExportExcelFile";
const AdministradorDeEstaciones = () => {
  const dispatch = useAppDispatch();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActivate] = useState(false);

  useEffect(() => {
    obtenerEstacion(dispatch);
    //callService();
  }, []);

  const estaciones = useAppSelector(
    (state) => state.administradorEstacionesSlice.estaciones
  );

  // const dataExcel = estaciones.map((estacion) => ({
  //   OBJECTID: estacion.objectid,
  //   Estación: estacion.t001nombre,
  //   "Coordenada 1": estacion.t001coord1,
  //   "Coordenada 2": estacion.t001coord2,
  //   Modificado: estacion.t001fechaMod,
  //   Usuario: estacion.t001userMod,
  // }));

  const columnDefs = [
    { headerName: "OBJECTID", field: "objectid", minWidth: 120 },
    { headerName: "Estación", field: "t001nombre", minWidth: 140 },
    { headerName: "Longitud", field: "t001coord1", minWidth: 140 },
    { headerName: "Latitud", field: "t001coord2", minWidth: 140 },
    { headerName: "Modificado", field: "t001fechaMod", minWidth: 130 },
    { headerName: "Usuario", field: "t001userMod", minWidth: 100 },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas"
            type="button"
            title="editar"
            onClick={() => {
              // dispatch(obtenerEstacionEditarAction(params.data));
              setEstacionEditarModelo(dispatch, params.data);
              setIsModalEditarActivate(!isModalActive);
            }}
          >
            <i className="fa-regular fa-pen-to-square fs-3"></i>
          </button>
          <button
            className="btn btn-sm btn-tablas"
            type="button"
            title="eliminar"
            onClick={() => confirmarEliminarEstacion(params.data.objectid)}
          >
            <i className="fa-regular fa-trash-can fs-3"></i>
          </button>
        </div>
      ),
    },
  ];

  const confirmarEliminarEstacion = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una estacion que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pasarlo al action
        // dispatch(administradorEstacionesSlice(id));
        eliminarEstacion(dispatch, id);
        obtenerEstacion(dispatch);
        Swal.fire(
          "Correcto",
          "La estación se elimino correctamente",
          "success"
        );
      }
    });
  };

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: false,
    suppressMovable: true,
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-2 mb-0">Estaciones</h3>
          <Subtitle title="Información general" mt={3} />
          <div className="row">
            <div className="row"></div>
            <div>
              {/* <ExportExcelFile estaciones={dataExcel} name="Estaciones" /> */}
              <button
                className="btn btn-image text-capitalize bg-white border boder-none d-block ms-auto mt-3"
                onClick={() => setIsModalActive(!isModalActive)}
              >
                <i className="fa-regular fa-plus fs-3"></i>
              </button>
            </div>
          </div>

          <div className="multisteps-form__content">
            <div>
              <div
                className="ag-theme-alpine mt-auto mb-3 px-4"
                style={{ height: "470px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={estaciones as any}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>

      <NuevaEstacionModal
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />
      <EditarEstacionModal
        setIsModalActive={setIsModalEditarActivate}
        isModalActive={isModalEditarActive}
      />
    </div>
  );
};
export default AdministradorDeEstaciones;
