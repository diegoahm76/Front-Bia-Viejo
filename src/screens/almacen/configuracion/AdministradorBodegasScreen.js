import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../../../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
import NuevaEstacionModal from "../../../components/NuevaEstacionModal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Subtitle from "../../../components/Subtitle";
import {
  obtenerBodegasAction,
  eliminarBodegaAction,
} from "../../../actions/bodegaActions";
import { useNavigate } from "react-router-dom";

const AdministradorBodegasScreen = () => {
  const dispatch = useDispatch();
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const getBodegas = async () => dispatch(obtenerBodegasAction());
    getBodegas();
  }, []);

  const navigate = useNavigate();
  const RegresarCreacion = () => {
    navigate("/dashboard/almacen/configuracion/creacionbodega");
  };
  const EditarBodega=()=>{
    navigate("/dashboard/almacen/configuracion/editar-bodegas")

  }

  const { bodega } = useSelector((state) => state.bodega);

  console.log("bodega", bodega)

  const confirmarEliminarBodega = (id_bodega) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una bodega que se elimina no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pasarlo al action
        dispatch(eliminarBodegaAction(id_bodega));
      }
    });
  };

  const columnDefs = [
    { headerName: "Id bodega", field: "id_bodega", minWidth: 140 },
    { headerName: "Nombre bodega", field: "nombre", minWidth: 140 },
    { headerName: "Responsable", field: "id_responsable.primer_nombre", minWidth: 140 },
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
            onClick={() => {EditarBodega()
              // dispatch(obtenerBodegasAction(params.data));
            }}
          >
            <img src={IconoEditar} alt="editar" />
          </button>
          <button
            className="btn btn-sm btn-tablas btn-outline-danger"
            type="button"
            onClick={() => confirmarEliminarBodega(params.data.id_bodega)}
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
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-secondary mx-2 text-capitalize"
              onClick={() => RegresarCreacion()}
            >
              Regresar
            </button>
          </div>
        </div>
      </div>

      <NuevaEstacionModal
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />
    </div>
  );
};

export default AdministradorBodegasScreen;