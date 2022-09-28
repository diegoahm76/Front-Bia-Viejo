import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import ReactModal from "react-modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";

const options = [
  { label: "Todos", value: "All" },
  { label: "Villavicencio", value: "VLL" },
  { label: "Yopal", value: "YP" },
];

const dataPrueba = {
  VLL: {
    name: "La bella",
    location: "Villavicencio, cuarta división del ejercito",
    geoLocation: [
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
      {
        lat: `4"5'7.428"`,
        long: `4"5'7.428"`,
      },
    ],
    plantsQuantity: 12356,
    plantsQuantityForType: [
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 300,
      },
      {
        "Nombre Común": "Algarrobo",
        "Nombre Científico": "Himenea Courbaril",
        "Cantidad total": 200,
      },
      {
        "Nombre Común": "Bucaro",
        "Nombre Científico": "Erythrina fusca",
        "Cantidad total": 500,
      },
      {
        "Nombre Común": "Canafistol",
        "Nombre Científico": "Cassia grandis L.F.",
        "Cantidad total": 100,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 1234,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 1234,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 1234,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 1234,
      },
    ],
  },
  YP: {
    name: "Paz de ariporo",
    location: "Yopal, segunda division del ejercito",
    geoLocation: [
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
      {
        lat: `5"7'8.528"`,
        long: `5"7'8.528"`,
      },
    ],
    plantsQuantity: 12356,
    plantsQuantityForType: [
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 300,
      },
      {
        "Nombre Común": "Algarrobo",
        "Nombre Científico": "Himenea Courbaril",
        "Cantidad total": 200,
      },
      {
        "Nombre Común": "Bucaro",
        "Nombre Científico": "Erythrina fusca",
        "Cantidad total": 500,
      },
      {
        "Nombre Común": "Canafistol",
        "Nombre Científico": "Cassia grandis L.F.",
        "Cantidad total": 100,
      },
      {
        "Nombre Común": "Flor morado",
        "Nombre Científico": "Jacaranda sp",
        "Cantidad total": 1234,
      },
    ],
  },
};

const columnDefs = [
  { headerName: "Nombre Común", field: "Nombre Común" },
  { headerName: "Nombre Científico", field: "Nombre Científico" },
  { headerName: "Cantidad total", field: "Cantidad total" },
];

const defaultColDef = {
  sortable: true,
  editable: true,
  flex: 1,
  filter: true,
  wrapHeaderText: true,
  resizable: true,
  initialWidth: 200,
  suppressMovable: true,
};

const defaultColDef2 = {
  resizable: true,
  editable: true,
  sortable: true,
  flex: 1,
  initialWidth: 100,
  suppressMovable: true,
};

const columnDefs2 = [
  { headerName: "Latitud", field: "lat" },
  { headerName: "Longitud", field: "long" },
];

const onGridReady = (params) => {
  const gridApi = params.api;
  return gridApi;
};

const EditarViveroScreen = () => {
  const isModalActive = useSelector((state) => state.modal.isModalActive);
  const [currentSelectValue, setCurrentSelectValue] = useState(null);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Panel de control</h3>
        <div
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
        >
          <h5 className="font-weight-bolder mt-2">
            Seleccione el vivero para visualización de información
          </h5>
          <div className="row">
            <div className="col-4 mt-2">
              <Select
                options={options}
                onChange={(e) => setCurrentSelectValue(e.value)}
                placeholder="Seleccione"
              />
            </div>
          </div>
          {/* Renderizado condicional para el caso de Todos los datos */}
          {currentSelectValue !== "All" && (
            <>
              <label className="mt-5 fw-bold fs-6 d-block">
                Nombre del vivero:{" "}
                <span className="fw-normal">
                  {dataPrueba[currentSelectValue]?.name}
                </span>
              </label>
              <label className="mt-4 fw-bold fs-6 d-block">
                Ubicación del vivero:{" "}
                <span className="fw-normal">
                  {dataPrueba[currentSelectValue]?.location}
                </span>
              </label>
              <label className="text-center mt-4 fw-bold fs-6 d-block">
                Ubicación geográfica
              </label>
              {/* Aqui va la tabla de lat y long */}
              <div id="myGrid" className="ag-theme-alpine">
                <div
                  className="container ag-theme-alpine"
                  style={{ height: "177px", width: "300px" }}
                >
                  <AgGridReact
                    className="ag-theme-alpine"
                    animateRows="true"
                    columnDefs={columnDefs2}
                    defaultColDef={defaultColDef2}
                    rowData={dataPrueba[currentSelectValue]?.geoLocation}
                  />
                </div>
              </div>
            </>
          )}
          <label className="text-center mt-4 fw-bold fs-6 d-block">
            Numero total de plantas:{" "}
            <span className="fw-normal">
              {dataPrueba[currentSelectValue]?.plantsQuantity}
            </span>
          </label>
          <label className="text-center mt-4 fw-bold fs-6 d-block">
            Numero total de plantas por especie
          </label>
          {/* Aqui va la tabla de plantas por especie */}
          <div id="myGrid" className="ag-theme-alpine">
            <div className="ag-theme-alpine" style={{ height: "400px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={dataPrueba[currentSelectValue]?.plantsQuantityForType}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          <div className="d-flex">
            <button
              className="btn bg-gradient-primary mt-3 ms-auto"
              onClick={handleOpenModal}
            >
              Ver más información del vivero
            </button>
          </div>
          {/*Renderizado del modal*/}
          <ReactModal
            className="row max-vh-100 px-4"
            isOpen={isModalActive}
            parentSelector={() => document.getElementById("root")}
            style={{ overlay: { overflowY: "scroll", zIndex: "9999" } }}
          >
            <div className="col-lg-8 col-md-10 col-12 mx-auto bg-white">
              <h3 className="mt-3 mb-0 text-center mb-6">
                Informacion adicional del vivero
              </h3>
              <h5 className="font-weight-bolder mt-2">
                Instalaciones del vivero
              </h5>
              <div className="row">
                <div className="col-12 col-md-6 mt-2">
                  <label className="fw-bold">Tipo de vivero: </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>Mega vivero</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Medio de creación de vivero:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>Recursos propios de la corporación</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">Coordinador de vivero: </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>***********************</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">Viverista: </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>***********************</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">Area del vivero: </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>300 m2</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">Area de propagación: </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>300 m2</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Area de preparación de sustrato:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>20 m2</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Cantidad de areas de embolsado:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>20 m2</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Area de las eras de producción:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>200 m2</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Cantidad de bodegas en el vivero:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 ">
                  <label>3</label>
                </div>
                <div className="col-12 col-md-6">
                  <label className="fw-bold">
                    Documentación adjunta con el vivero:{" "}
                  </label>
                </div>
                <div className="col-12 col-md-6 row gap-2">
                  <div className="col-3 text-center">
                    <i className="fa-solid fa-file fs-3 d-block"></i>
                    <label className="d-block m-0">Contratos</label>
                  </div>
                  <div className="col-3 text-center">
                    <i className="fa-solid fa-file fs-3 d-block"></i>
                    <label className="d-block m-0">
                      Acta de recibimiento de vivero
                    </label>
                  </div>
                  <div className="col-3 text-center">
                    <i className="fa-solid fa-file fs-3 d-block"></i>
                    <label className="d-block m-0">Planos de vivero</label>
                  </div>
                </div>
              </div>
              <button className="btn bg-gradient-primary d-flex ms-auto mt-2">
                Descargar todos los documentos
              </button>
              <div className="d-flex justify-content-end">
                <button
                  className="btn bg-gradient-danger mt-3"
                  onClick={handleCloseModal}
                >
                  Cerrar modal
                </button>
              </div>
            </div>
          </ReactModal>
        </div>
      </div>
    </div>
  );
};
export default EditarViveroScreen;
