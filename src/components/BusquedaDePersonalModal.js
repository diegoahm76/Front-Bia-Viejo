import Modal from "react-modal";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import MarcaDeAgua1 from "./MarcaDeAgua1";
import Subtitle from "./Subtitle";

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

const BusquedaDePersonalModal = ({ isModalActive, setIsModalActive }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const [rowBuscar] = useState([
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
  ]);

  const columnBuscar = [
    { headerName: "Nombre", field: "nombre", minWidth: 150 },
    { headerName: "Tipo documento", field: "tipoDocumento", minWidth: 150 },
    { headerName: "Documento", field: "documento", minWidth: 150 },
    {
      headerName: "Dependecia",
      field: "dependencia",
      minWidth: 150,
    },
    { headerName: "Grupo", field: "grupo", minWidth: 150 },
  ];
  const optionsDependencia = [
    { label: "Dependencia 1", value: "D1" },
    { label: "Dependencia 2", value: "D2" },
    { label: "Dependencia 3", value: "D3" },
  ];

  const optionsGrupo = [
    { label: "Grupo 1", value: "G1" },
    { label: "Grupo 2", value: "G2" },
    { label: "Grupo 3", value: "G3" },
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
          <h3 className="text-center  fw-light mt-4 mb-2">Busqueda de personal</h3>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)} >
            <MarcaDeAgua1>
              <div className="row">

              <Subtitle title="Información de la persona" mb="3" />
                <div className="col-12 col-sm-6">
                  <label className="form-floating text-terciary  input-group input-group-dynamic ms-3">
                    Tipo de documento{" "}
                  </label>
                    <div className="col-12 ">
                      <Controller
                        name="tipoDocumento"
                        control={control}
                        defaultValue={optionsTipoDocumento[0]}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-3"
                            options={optionsTipoDocumento}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6 mt-2">
                <div>
                  <label className="ms-3 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    {...register("nombreCompleto")}
                  />
                </div>
              </div>
                <div className="col-12 col-sm-6">
                  <label className="form-floating text-terciary mt-2 input-group input-group-dynamic ms-2">
                    Dependecia{" "}
                  </label>
                    <div className="col-12">
                      <Controller
                        name="dependencia"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsDependencia}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-floating mt-2 text-terciary input-group input-group-dynamic ms-3">
                    Grupo{" "}
                  </label>
                    <div className="col-12">
                      <Controller
                        name="grupo"
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="mt-2"
                            options={optionsGrupo}
                            placeholder="Seleccionar"
                          />
                        )}
                      />
                    </div>
                </div>
                <div
                  className="ag-theme-alpine mt-4 mb-4"
                  style={{ height: "300px" }}
                >
                  <AgGridReact
                    columnDefs={columnBuscar}
                    rowData={rowBuscar}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize border rounded-pill px-3"
                    type="button"
                    onClick={() => setIsModalActive(false)}
                    title="Send"
                  >
                    Limpiar
                  </button>
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize border rounded-pill px-3"
                    type="button"
                    onClick={() => setIsModalActive(false)}
                    title="Send"
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn bg-light text-white text-capitalize border rounded-pill px-3"
                    type="button"
                    onClick={() => setIsModalActive(false)}
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

export default BusquedaDePersonalModal;
