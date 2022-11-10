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
import ExportExcelFile from "../../../components/ExportExcelFile";
import { obtenerBodegasAction } from "../../../actions/bodegaActions";


const AdministradorBodegasScreen = () => {
    const dispatch = useDispatch();
    const [isModalActive, setIsModalActive] = useState(false);
    const [isModalEditarActive, setIsModalEditarActivate] = useState(false);
  
    useEffect(() => {
      const getBodegas = async () => dispatch(obtenerBodegasAction());
      getBodegas();
    }, []);
  
    const { bodega } = useSelector((state) => state.bodega);
  
  
    const columnDefs = [
      { headerName: "Id bodega", field: "id_bodega", minWidth: 140 },
      { headerName: "Nombre bodega", field: "nombre", minWidth: 140 },
      { headerName: "Responsable", field: "id_responsable", minWidth: 140 },
      { headerName: "Dirección", field: "direccion", minWidth: 140 },
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
                dispatch(obtenerBodegasAction(params.data));
                setIsModalEditarActivate(!isModalActive);
              }}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
            <button
              className="btn btn-sm btn-tablas btn-outline-danger"
              type="button"
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
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <h3 className="mt-2 mb-0">Administrador de bodegas</h3>
            <Subtitle title="Informacion de general" mt={3} mb={3} />
  
            <div className="multisteps-form__content">
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-3 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={bodega}
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

export default AdministradorBodegasScreen