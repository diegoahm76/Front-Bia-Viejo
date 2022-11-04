import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarModoAction,
  eliminarAlarmaAction,
  obtenerAlarmaEditAction,
  obternerAlarmasAction,
} from "../../../actions/alarmasActions";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import AlarmasModal from "../../../components/AlarmasModal";
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

const AlarmasScreen = () => {
  const { alarmas, loading } = useSelector((state) => state.alarmas);
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

  useEffect(() => {
    dispatch(obternerAlarmasAction());
  }, []);

  const columnDefs = [
    {
      headerName: "Estación",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Rango", field: "t006rango", minWidth: 100 },
    { headerName: "MensajeUp", field: "t006mensajeUp", minWidth: 240 },
    { headerName: "MensajeDown", field: "t006mensajeDown", minWidth: 240 },
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
        </div>
      ),
      minWidth: 150,
    },
  ];

  // const handleCrearAlarma = () => {
  //   setIsModalActive(true);
  //   dispatch(cambiarModoAction("crear"));
  // };

  const editarAction = (objectid) => {
    setIsModalActive(true);
    dispatch(obtenerAlarmaEditAction(objectid, reset));
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">Alarmas</h3>
          <Subtitle title={"Informacion general"} mt={0} mb={3} />
          <form className="row">
            <div className="multisteps-form__content">
              {/* <div>
                <button
                  type="button"
                  className="btn bg-gradient-primary text-capitalize d-block ms-auto mt-3 me-4"
                  disabled={loading}
                  onClick={() => handleCrearAlarma()}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Cargando...
                    </>
                  ) : (
                    "Crear alarma"
                  )}
                </button>
              </div> */}
              <div>
                <div
                  className="ag-theme-alpine mt-auto mb-8 px-4"
                  style={{ height: "470px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={alarmas}
                    defaultColDef={defaultColDef}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </form>
          <AlarmasModal
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
    </div>
  );
};

export default AlarmasScreen;
