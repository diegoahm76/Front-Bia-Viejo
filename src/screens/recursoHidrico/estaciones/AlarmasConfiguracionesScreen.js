import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerAlarmaConfigEditAction,
  obternerAlarmasConfigAction,
} from "../../../actions/alarmasConfigActions";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import AlarmasConfigModal from "../../../components/AlarmasConfigModal";
import Subtitle from "../../../components/Subtitle";

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

const AlarmasConfiguracionesScreen = () => {
  const { alarmasConfig } = useSelector((state) => state.alarmasConfig);
  const [isModalActive, setIsModalActive] = useState(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const columnDefs = [
    {
      headerName: "Estación",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Periodo", field: "t007periodo", minWidth: 100 },
    { headerName: "Base", field: "t007periodoBase", minWidth: 140 },
    { headerName: "Tolerancia", field: "t007tolerancia", minWidth: 140 },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-tablas btn-outline-warning "
              type="button"
              title="Send"
              onClick={() => editarAction(params.data.objectid)}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
          </div>
          {/* <div>
                <button
                  className="btn btn-sm btn-tablas btn-outline-danger"
                  type="button"
                  title="Send"
                  onClick={() =>
                    dispatch(eliminarAlarmaAction(params.data.idAlarma))
                  }
                >
                  <img src={IconoEliminar} alt="eliminar" />
                </button>
              </div> */}
        </div>
      ),
      minWidth: 150,
    },
  ];

  const editarAction = (objectid) => {
    setIsModalActive(true);
    dispatch(obtenerAlarmaConfigEditAction(objectid, reset));
  };

  useEffect(() => {
    dispatch(obternerAlarmasConfigAction());
  }, []);

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">
            Alarmas Configuraciones
          </h3>
          <Subtitle title={"Informacion general"} mt={0} mb={3} />

          <div>
            <div
              className="ag-theme-alpine mt-auto mb-8 px-4"
              style={{ height: "470px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={alarmasConfig}
                defaultColDef={defaultColDef}
              ></AgGridReact>
            </div>
          </div>
        </div>
        <AlarmasConfigModal
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
          handleSubmit={handleSubmit}
          register={register}
          control={control}
          reset={reset}
          errors={errors}
          watch={watch}
        />
      </div>
    </div>
  );
};
export default AlarmasConfiguracionesScreen;
