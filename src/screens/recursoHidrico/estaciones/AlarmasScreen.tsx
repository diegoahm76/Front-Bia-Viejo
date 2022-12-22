import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  cambiarModoAction,
  eliminarAlarmaAction,
  obtenerAlarmaEditAction,
  obternerAlarmasAction,
} from "../../../actions/alarmasActions";
import IconoEditarBia from "../../../assets/iconosBotones/editar.svg";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import AlarmasModal from "../../../components/AlarmasModal";
import Subtitle from "../../../components/Subtitle";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { obtenerTodasAlarmas, seleccionarAlarma } from "../../../store/slices/alarmas/indexAlarma";
import { IAlarmasEdit } from "../../../Interfaces/Alarmas";

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
  const [isModalActive, setIsModalActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useAppDispatch();

  const alarmas = useAppSelector((state) => state.alarma.alarma);
  const loading = useAppSelector((state) => state.loading.loading);
  useEffect(() => {
    obtenerTodasAlarmas(dispatch);
  }, []);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const columnDefs = [
    {
      headerName: "Estación",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Rango", field: "t006rango", minWidth: 100 },
    { headerName: "Mensaje Alarma", field: "t006mensajeUp", minWidth: 240 },
    {
      headerName: "Mensaje No Alarma",
      field: "t006mensajeDown",
      minWidth: 220,
    },
    { headerName: "Periodo", field: "t006periodo", minWidth: 120 },
    { headerName: "Base", field: "t006periodoBase", minWidth: 120 },
    { headerName: "Tolerancia", field: "t006tolerancia", minWidth: 120 },
    {
      headerName: "Periodo Desconexion",
      field: "t006periodoDesconexion",
      minWidth: 140,
    },
    {
      headerName: "Acciones",
      field: "accion",
      cellRendererFramework: (params) => (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <div>
            <button
              className="btn btn-sm btn-tablas "
              type="button"
              onClick={() => editarAction(params.data)}
            >
              <img src={IconoEditarBia} alt="editar" title="Editar" />
            </button>
          </div>
        </div>
      ),
      minWidth: 150,
    },
  ];

  const handleCrearAlarma = () => {
    setIsModalActive(true);
    setIsEdit(false);
  };

  const editarAction = (data) => {
    seleccionarAlarma(dispatch, data);
    setIsEdit(true);
    setIsModalActive(true);

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
              <div>
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
              </div>
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
            setValue={setValue}
            isModalActive={isModalActive}
            isEdit={isEdit}
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
