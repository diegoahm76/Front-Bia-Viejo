import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconoEditar from "../../../assets/iconosEstaciones/edit-svgrepo-com.svg";
import {
  obtenerConfiguracionEditarAction,
  obtenerConfiguracionesAction,
} from "../../../actions/configuracionesEstacionesActions";
import EditarConfiguracionModal from "../../../components/EditarConfiguracionModal";
import Subtitle from "../../../components/Subtitle";

// const defaultValuesResetConfiguration = {
//   t003frecuencia: "",
//   t003temperaturaAmbienteMax: "",
//   t003temperaturaAmbienteMin: "",
//   t003humedadAmbienteMax: "",
//   t003humedadAmbienteMin: "",
//   t003presionBarometricaMax: "",
//   t003presionBarometricaMin: "",
//   t003velocidadVientoMax: "",
//   t003velocidadVientoMin: "",
//   t003direccionVientoMax: "",
//   t003direccionVientoMin: "",
//   t003precipitacionMax: "",
//   t003precipitacionMin: "",
//   t003luminocidadMax: "",
//   t003luminocidadMin: "",
//   t003nivelAguaMax: "",
//   t003nivelAguaMin: "",
//   t003velocidadAguaMax: "",
//   t003velocidadAguaMin: "",
// };

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

const ConfiguracionesScreen = () => {
  const dispatch = useDispatch();
  const [isModalEditarActive, setIsModalEditarActivate] = useState(false);

  useEffect(() => {
    const getConfiguraciones = async () =>
      dispatch(obtenerConfiguracionesAction());
    getConfiguraciones();
  }, []);

  const { configuraciones } = useSelector(
    (state) => state.configuracionesEstaciones
  );

  const columnDefs = [
    {
      headerName: "Estacion",
      field: "t001Estaciones.t001nombre",
      minWidth: 140,
    },
    { headerName: "Frecuencia", field: "t003frecuencia", minWidth: 140 },
    {
      headerName: "Temperatura Max",
      field: "t003temperaturaAmbienteMax",
      minWidth: 140,
    },
    {
      headerName: "Temperatura Min",
      field: "t003temperaturaAmbienteMin",
      minWidth: 140,
    },
    {
      headerName: "Humedad Max",
      field: "t003humedadAmbienteMax",
      minWidth: 140,
    },
    {
      headerName: "Humedad Min",
      field: "t003humedadAmbienteMin",
      minWidth: 140,
    },
    {
      headerName: "Presión Barométrica Max",
      field: "t003presionBarometricaMax",
      minWidth: 140,
    },
    {
      headerName: "Presión Barométrica Min",
      field: "t003presionBarometricaMin",
      minWidth: 140,
    },
    {
      headerName: "Velicidad Viento Max",
      field: "t003velocidadVientoMax",
      minWidth: 140,
    },
    {
      headerName: "Velocidad Viento Min",
      field: "t003velocidadVientoMin",
      minWidth: 140,
    },
    {
      headerName: "Dirección Viento Max",
      field: "t003direccionVientoMax",
      minWidth: 140,
    },
    {
      headerName: "Dirección Viento Min",
      field: "t003direccionVientoMin",
      minWidth: 140,
    },
    {
      headerName: "Precipitación Max",
      field: "t003precipitacionMax",
      minWidth: 140,
    },
    {
      headerName: "Precipitación Min",
      field: "t003precipitacionMin",
      minWidth: 140,
    },
    {
      headerName: "Luminosidad Max",
      field: "t003luminocidadMax",
      minWidth: 140,
    },
    {
      headerName: "Luminosidad Min",
      field: "t003luminocidadMin",
      minWidth: 140,
    },
    { headerName: "Nivel Agua Max", field: "t003nivelAguaMax", minWidth: 140 },
    { headerName: "Nivel Agua Min", field: "t003nivelAguaMin", minWidth: 140 },
    {
      headerName: "Velocidad Agua Max",
      field: "t003velocidadAguaMax",
      minWidth: 140,
    },
    {
      headerName: "Velocidad Agua Min",
      field: "t003velocidadAguaMin",
      minWidth: 140,
    },
    { headerName: "Modificado", field: "t003fechaMod", minWidth: 140 },
    { headerName: "Usuario", field: "t003userMod", minWidth: 140 },
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
              onClick={() => {
                dispatch(obtenerConfiguracionEditarAction(params.data));
                setIsModalEditarActivate(!isModalEditarActive);
              }}
            >
              <img src={IconoEditar} alt="editar" />
            </button>
          </div>
        </div>
      ),
      minWidth: 120,
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h3 className="mt-3 ms-3 mb-3 fw-light text-terciary">Configuracion de estaciones</h3>
          <Subtitle title={"Informacion general"} mt={0} mb={3} />
          <form className="row">
            <div className="multisteps-form__content">
              <div
                className="ag-theme-alpine mt-auto mb-8 px-4"
                style={{ height: "470px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={configuraciones}
                  defaultColDef={defaultColDef}
                ></AgGridReact>
              </div>
            </div>
          </form>
        </div>
      </div>
      <EditarConfiguracionModal
        setIsModalActive={setIsModalEditarActivate}
        isModalActive={isModalEditarActive}
      />
    </div>
  );
};

export default ConfiguracionesScreen;
