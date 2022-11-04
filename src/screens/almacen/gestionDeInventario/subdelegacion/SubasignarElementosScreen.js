import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import BusquedaDePersonalModal from "../../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../../components/MarcaDeAgua1";
import Subtitle from "../../../../components/Subtitle"


const SubasignarElementosScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);
  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
    nombreArticulo: "",
  });

  const { register, control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      dependencia: data.dependencia?.value,
      tipoDocumento: data.tipoDocumento?.value,
      grupo: data.grupo?.value,
      numeroCedula: data.numeroCedula,
      codigoArticulo: data.codigoArticulo,
      nombreArticulo: data.nombreArticulo,
    });
  };

  const optionsPersona1 = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];

  const optionsPersona2 = [
    { label: "Cedula de ciudadania", value: "CC" },
    { label: "Tarjeta de identidad", value: "TI" },
    { label: "desplazado", value: "DZ" },
    { label: "Others", value: "OT" },
  ];


  const defaultColDef = {
    sortable: true,
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

  let gridApi;
  const rowData = [
    {
      CO: 160036,
      NE: "Computador",
      ID: "000013",
      MR: "Lenovo",
      SL: "nd7nyrb",
      SUB: "",
    },
    {
      CO: 160036,
      NE: "Computador",
      ID: "Accer",
      MR: "g3ub3h",
      SL: "00022",
      SUB: "",
    },
    {
      CO: 160036,
      NE: "Computador",
      ID: "Accer",
      MR: "g3ub3h",
      SL: "00022",
      SUB: "",
    },
    {
      CO: 160036,
      NE: "Computador",
      ID: "Accer",
      MR: "g3ub3h",
      SL: "00022",
      SUB: "",
    },
    {
      CO: 160036,
      NE: "Computador",
      ID: "Accer",
      MR: "g3ub3h",
      SL: "00022",
      SUB: "",
    },
  ];
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Nombre", field: "NE", minWidth: 150 },
    { headerName: "ID único", field: "ID", minWidth: 150 },
    { headerName: "Marca", field: "MR", minWidth: 150 },
    { headerName: "Serial", field: "SL", minWidth: 150 },
    {
      headerName: "Sub Asignar",
      field: "SUB",
      minWidth: 150,
      cellRendererFramework: (params) => (
        <div className="form-check form-switch d-flex align-items-center mt-3">
          <input className="form-check" type="checkbox" id="rememberMe" />
        </div>
      ),
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Subasignar Elementos
            </h3>
            
            <MarcaDeAgua1>
            <Subtitle title="Responsable" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de documento{" "} <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoResponsable"
                    control={control} rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsPersona1}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Número de documento:
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="Numero de documento"
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre:
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="Gina Rodríguez"
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>
              <Subtitle title="Operario" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de documento{" "} <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoOperario"
                    control={control} rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsPersona2}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label>
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Numero de documento"
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label>
                    Nombre:
                  </label>
                  <input
                    disabled
                    type="text"
                    placeholder="Pepito Perez"
                    className="form-control border border-terciary rounded-pill px-3"
                  />
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn-min-width border rounded-pill mt-2 px-3 btn bg-gradient-primary"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>

              <div className="row my-3">
                <div
                  className="ag-theme-alpine mt-auto mb-4 px-4"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                  type="button"
                  title="Send"
                >
                  Limpiar
                </button>
                <button
                  className="border rounded-pill px-3 btn bg-gradient-primary mb-3 text-capitalize"
                  type="submit"
                  title="Send"
                >
                  Guardar
                </button>
                <button
                  className="border rounded-pill px-3 btn bg-gradient-danger mb-3 text-capitalize"
                  type="button"
                  title="Send"
                >
                  Salir
                </button>
              </div>
            </MarcaDeAgua1>
          </form>
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />

          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    </div>
  );
};
export default SubasignarElementosScreen;
