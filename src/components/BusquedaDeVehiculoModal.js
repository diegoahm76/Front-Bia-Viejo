import Modal from "react-modal";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import MarcaDeAgua1 from "./MarcaDeAgua1";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
};

const optionsTipoDocumento = [
  { label: "C.C", value: "CC" },
  { label: "T.I", value: "TI" },
];

Modal.setAppElement("#root");

const BusquedaDeVehiculoModal = ({ isModalActive, setIsModalActive }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const handleOpenAgregarVehiculo = () => {
    setIsModalActive(true);
  };

  const handleCloseAgregarVehiculo = () => {
    setIsModalActive(false);
  };
  const onSubmit = (data) => {};

  const [rowBuscarVehiculo] = useState([
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
    {
      numero: " ",
      placa: " ",
      marca: "",
      linea: "",
      pasajeros: "",
      platon: "",
    },
  ]);

  const columnBuscarVehiculo = [
    { headerName: "No.", field: "numero", minWidth: 150 },
    { headerName: "Placa", field: "placa", minWidth: 150 },
    { headerName: "Marca", field: "marca", minWidth: 150 },
    {
      headerName: "linea",
      field: "linea",
      minWidth: 150,
    },
    { headerName: "Capacidad pasajeros", field: "pasajeros", minWidth: 150 },
    { headerName: "Platon", field: "platon", minWidth: 150 },
  ];

  let gridApi;

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <Modal
      isOpen={isModalActive}
      //onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={300}
    >
      <div className="row min-vh-100 ">
        <div className="col-12 mx-auto">
          <h3 className="mt-3 mb-0 text-center mb-0">Busqueda de vehículos</h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <MarcaDeAgua1>
              <div className="row">
                <div className="col-12">
                  <div className="form-check mx-auto">
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    >
                      {" "}
                      Cumplen requerimientos
                    </label>
                    <input
                      className="form-check-input mx-2"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label
                      className="form-check-label mx-2"
                      htmlFor="flexCheckDefault"
                    >
                      {" "}
                      Ordenar mas apropiado
                    </label>
                    <input
                      className="form-check-input mx-2"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </div>
                <div
                  className="ag-theme-alpine mt-4 mb-4"
                  style={{ height: "300px" }}
                >
                  <AgGridReact
                    columnDefs={columnBuscarVehiculo}
                    rowData={rowBuscarVehiculo}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="submit"
                    onClick={handleCloseAgregarVehiculo}
                    title="Send"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn bg-light text-white text-capitalize"
                    type="button"
                    onClick={handleCloseAgregarVehiculo}
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </MarcaDeAgua1>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusquedaDeVehiculoModal;
