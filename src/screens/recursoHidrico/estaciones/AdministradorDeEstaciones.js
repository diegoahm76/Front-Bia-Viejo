import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import NuevaEstacionModal from "../../../components/NuevaEstacionModal";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarEstacionAction,
  obtenerEstacionEditarAction,
  obtenerEstacionesAction,
} from "../../../actions/estacionActions";
import Swal from "sweetalert2";
import EditarEstacionModal from "../../../components/EditarEstacionModal";
import Subtitle from "../../../components/Subtitle";

const AdministradorDeEstaciones = () => {
  const dispatch = useDispatch();
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalEditarActive, setIsModalEditarActivate] = useState(false);

  useEffect(() => {
    const getEstaciones = async () => dispatch(obtenerEstacionesAction());
    getEstaciones();
  }, []);

  const { estaciones } = useSelector((state) => state.estaciones);
  const columnDefs = [
    { headerName: "OBJECTID", field: "objectid", minWidth: 140 },
    { headerName: "Estación", field: "t001nombre", minWidth: 140 },
    { headerName: "Coordenada 1", field: "t001coord1", minWidth: 140 },
    { headerName: "Coordenada 2", field: "t001coord2", minWidth: 140 },
    { headerName: "Modificado", field: "t001fechaMod", minWidth: 140 },
    { headerName: "Usuario", field: "t001userMod", minWidth: 140 },
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
              dispatch(obtenerEstacionEditarAction(params.data));
              setIsModalEditarActivate(!isModalActive);
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => confirmarEliminarEstacion(params.data.objectid)}
          >
            <img src={IconoEliminar} alt="eliminar" />
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
        dispatch(eliminarEstacionAction(id));
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
          <h3 className="mt-2 mb-0">
            Administrador estaciones meteorologicas
          </h3>
          <Subtitle title="Informacion de general" mt={3} />
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
                  rowData={estaciones}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
          </div>
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
