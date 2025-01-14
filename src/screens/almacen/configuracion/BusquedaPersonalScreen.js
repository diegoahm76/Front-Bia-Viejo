import React from "react";
import { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const rowDataInicial = [
  {
    name: "Carlos",
    documento: "Cédula de Ciudadanía",
    number: 1,
    time: "9:00",
    numberFrecuency: 2,
    password: "********",
    dniNumber: 111111111,
    dependency: "Gestión Ambiental",
    groups: "Suelos",
  },
  {
    name: "Argenis",
    documento: "Cédula de Ciudadanía",
    number: 2,
    time: "9:00",
    numberFrecuency: 1,
    password: "********",
    dniNumber: 111111111,
    dependency: "Archivo",
    groups: "Aguas",
  },
  {
    name: "Ivan",
    documento: "Cédula de extranjería",
    number: 2,
    time: "9:00",
    numberFrecuency: 2,
    password: "********",
    dniNumber: 111111111,
    dependency: "Administración Financiera",
    groups: "Aire y Urbano",
  },
  {
    name: "Carlos",
    documento: "Pasaporte",
    number: 3,
    time: "9:00",
    numberFrecuency: 1,
    password: "********",
    dniNumber: 111111111,
    dependency: "Gestión Ambiental",
    groups: "Bióticos",
  },
  {
    name: "Luis",
    documento: "Pasaporte",
    number: 4,
    time: "9:00",
    numberFrecuency: 2,
    password: "********",
    dniNumber: 111111111,
    dependency: "Gestión Ambiental",
    groups: "Aguas",
  },
  {
    name: "Fernando",
    documento: "Cédula de Ciudadanía",
    number: 4,
    time: "9:00",
    numberFrecuency: 2,
    password: "********",
    dniNumber: 111111111,
    dependency: "Archivo",
    groups: "Bióticos",
  },
  {
    name: "Andrés",
    documento: "Cédula de Ciudadanía",
    number: 2,
    time: "9:00",
    numberFrecuency: 1,
    password: "********",
    dniNumber: 111111111,
    dependency: "Dirección",
    groups: "Dirección",
  },
  {
    name: "Ivan",
    documento: "Cédula de Ciudadanía",
    number: 1,
    time: "9:00",
    numberFrecuency: 1,
    password: "********",
    dniNumber: 111111111,
    dependency: "Administración Financiera",
    groups: "Aire y Urbano",
  },
];

const optionsDniDocuments = [
  { label: "Cédula de ciudadanía" },
  { label: "Cédula de extranjería" },
  { label: "Pasaporte" },
  { label: "NIT" },
];

const optionsDependencies = [
  { label: "Seleccionar" },
  { label: "Gestión Ambiental" },
  { label: "Administración Financiera" },
  { label: "Dirección" },
  { label: "Archivo" },
];

const optionsGroups = [
  { label: "Seleccionar" },
  { label: "Suelos" },
  { label: "Bióticos" },
  { label: "Aguas" },
];

const BusquedaPersonalScreen = () => {
  const [selectedDniDocuments, setSelectedDniDocuments] = useState(null);
  const [selectedDependencies, setSelectedDependencies] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState(null);
  const [rowData, setRowData] = useState(rowDataInicial);
  const { register, handleSubmit, control } = useForm();

  const columnDefs = [
    { headerName: "Nombre", field: "name" },

    { headerName: "Tipo de documento", field: "documento" },

    { headerName: "Número de documento", field: "dniNumber" },

    { headerName: "Dependencia", field: "dependency" },

    { headerName: "Grupos", field: "groups" },
  ];

  const handleSearch = () => {
    const dataFilter = rowDataInicial.filter((data) => {
      if (selectedDependencies === "Seleccionar") {
        return true;
      }
      if (selectedDependencies === data.dependency) {
        return true;
      }
      return false;
    });
    setRowData(dataFilter);
  };

  const submit = (data) => {};

  const defaultColDef = {
    sortable: true,
    flex: 1,
    wrapHeaderText: true,
    autoHeaderHeight: true,
    floatingFilter: false,
    resizable: true,
    width: 100,
  };

  let gridApi;
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6"> Búsqueda de Personal</h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row">
              <div className="col-12 col-md-4 mt-2">
                <div className="input-group input-group-dynamic">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    {" "}
                    Nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="multisteps-form__input form-control"
                    type="text"
                    {...register("name")}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4 mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  {" "}
                  Tipo de documento: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoDocumento"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-11 mx-1 mt-3"
                      defaultValue={selectedDniDocuments}
                      onChange={setSelectedDniDocuments}
                      options={optionsDniDocuments}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-4 mt-2">
                <div className="input-group input-group-dynamic">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    {" "}
                    Número de documento: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="multisteps-form__input form-control"
                    type="number"
                    {...register("numberDocument")}
                  />
                </div>
              </div>

              <div className="col-12 col-md-4 mt-5">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Dependencia: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="dependencies"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-11 mx-1 mt-3"
                      defaultValue={selectedDependencies}
                      onChange={(e) => setSelectedDependencies(e.label)}
                      options={optionsDependencies}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-4 mt-5">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Grupos: <span className="text-danger">*</span>
                </label>
                <Controller
                  name="dependencies"
                  control={control}
                  //rules={{
                  //required: true,
                  //}}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="col-11 mx-1 mt-3"
                      defaultValue={selectedGroups}
                      onChange={setSelectedGroups}
                      options={optionsGroups}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-4 d-flex justify-content-start my-4 ">
                <button
                  type="button"
                  className="btn btn-primary mt-6 text-capitalize"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>

            <div className="ag-theme-alpine mt-7" style={{ height: "400px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                pagination={true}
                paginationPageSize={8}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>

            <div className="d-flex justify-content-end mt-5">
              <button
                type="button"
                className="btn btn-primary mx-2 text-capitalize"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="btn btn-secondary mx-2 p-2 text-capitalize"
                title="Send"
                id="configForm"
              >
                Aceptar
              </button>
              <button
                type="button"
                className="btn btn-danger mx-2 text-capitalize"
              >
                Salir
              </button>
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

export default BusquedaPersonalScreen;
