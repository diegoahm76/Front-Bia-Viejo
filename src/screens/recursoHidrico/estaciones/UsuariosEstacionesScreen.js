import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerUsuarioEditarAction,
  obtenerUsuariosAction,
  obtenerUsusarioEliminarAction,
} from "../../../actions/estacionActions";
import NuevoUsuarioModal from "../../../components/NuevoUsuarioModal";
import EliminarUsuarioModal from "../../../components/EliminarUsuarioModal";
import EditarUsuarioModal from "../../../components/EditarUsuarioModal";

const UsuariosEstacionesScreen = () => {
  const dispatch = useDispatch();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActive] = useState(false);
  const [isModalEliminarActive, setIsModalEliminarActive] = useState(false);

  useEffect(() => {
    dispatch(obtenerUsuariosAction());
  }, []);

  const { usuarios } = useSelector((state) => state.estaciones);

  const columnDefs = [
    { headerName: "Usuario", field: "t005nombre", minWidth: 140 },
    {
      headerName: "Estación",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Número", field: "t005numero", minWidth: 140 },
    {
      headerName: "Identificación",
      field: "t005Identificacion",
      minWidth: 140,
    },
    {
      headerName: "Acciones",
      field: "acciones",
      minWidth: 140,
      cellRendererFramework: (params) => (
        <div className="d-flex gap-1">
          <button
            className="btn btn-sm btn-outline-warning "
            type="button"
            onClick={() => {
              dispatch(obtenerUsuarioEditarAction(params.data));
              setIsModalEditarActive(!isModalEditarActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            onClick={() => {
              dispatch(obtenerUsusarioEliminarAction(params.data));
              setIsModalEliminarActive(!isModalActive);
            }}
          >
            <img src={IconoEliminar} alt="eliminar" />
          </button>
        </div>
      ),
    },
  ];

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
        <h3 className="mt-2 mb-0 text-center mb-4">
          Administrador de usuarios
        </h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <div className="row">
            <div className="row"></div>
            <div>
              <button
                className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
                onClick={() => setIsModalActive(!isModalActive)}
              >
                Nueva
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
