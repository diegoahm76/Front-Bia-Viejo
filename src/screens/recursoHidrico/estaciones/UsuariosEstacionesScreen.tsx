import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
// import {
//   obtenerUsuarioEditarAction,
//   obtenerUsuariosAction,
//   obtenerUsusarioEliminarAction,
// } from "../../../actions/estacionActions";
import NuevoUsuarioModal from "../../../components/NuevoUsuarioModal";
import { obtenerTodosUsuarios } from "../../../store/slices/usuarioEstaciones/indexUsuarioEstaciones";
import EliminarUsuarioModal from "../../../components/EliminarUsuarioModal";
import EditarUsuarioModal from "../../../components/EditarUsuarioModal";
import Subtitle from "../../../components/Subtitle";
import ExportExcelFile from "../../../components/ExportExcelFile";


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


const UsuariosEstacionesScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    obtenerTodosUsuarios(dispatch);
  });

  const usuarios = useAppSelector((state) => state.usuarioEstaciones);

  const columnDefs = [
    { headerName: "Parte Interesada", field: "t005nombre", minWidth: 140 },
    {
      headerName: "Estación",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Número", field: "t005numeroCelular", minWidth: 140 },
    {
      headerName: "Observaciones",
      field: "t005Observacion",
      minWidth: 140,
    },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-tablas btn-outline-warning "
            type="button"
            onClick={() => {
              // dispatch(obtenerUsuarioEditarAction(params.data));
              setIsModalEditarActive(!isModalEditarActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => {
              // dispatch(obtenerUsusarioEliminarAction(params.data));
              setIsModalEliminarActive(!isModalActive);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];



  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-2 mb-0">Partes Interesadas</h3>
          <Subtitle title="Informacion de general" mt={3} />
          <div className="row">
            <div className="row"></div>
            <div>
              <button
                className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
                onClick={() => setIsModalActive(!isModalActive)}
              >
                Nuevo
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
                  rowData={usuarios}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NuevoUsuarioModal
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />
      <EditarUsuarioModal
        setIsModalActive={setIsModalEditarActive}
        isModalActive={isModalEditarActive}
      />
      <EliminarUsuarioModal
        setIsModalActive={setIsModalEliminarActive}
        isModalActive={isModalEliminarActive}
      />
    </div>
  );
};
export default UsuariosEstacionesScreen;
