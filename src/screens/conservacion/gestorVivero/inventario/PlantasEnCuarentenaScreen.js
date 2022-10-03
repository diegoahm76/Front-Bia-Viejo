import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";

const PlantasEnCuarentenaScreen = () => {
  const [selectedVivero, setSelectedVivero] = useState();
  const opcvivero = [
    { label: "Villavicencio", value: "VI" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "San Juan de Arama", value: "SJ" },
    { label: "Puerto Rico", value: "PR" },
    { label: "La Macarena", value: "LM" },
    { label: "Mapiripan", value: "MA" },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    setSelectedVivero(data.options.value);
  };

  const [rowData] = useState([
    {
      nombre: "Yopo",
      descripcion: " ",
      vivero: "",
      "fecha ingreso": "",
      produccion: "",
      disponible: "",
      total: "",
    },
    {
      nombre: "Pomaroso",
      descripcion: " ",
      vivero: "",
      "fecha ingreso": "",
      produccion: "",
      disponible: "",
      total: "",
    },
    {
      nombre: "Flor amarillo",
      descripcion: " ",
      vivero: "",
      "fecha ingreso": "",
      produccion: "",
      disponible: "",
      total: "",
    },
    {
      nombre: "Flor morado",
      descripcion: " ",
      vivero: "",
      "fecha ingreso": "",
      produccion: "",
      disponible: "",
      total: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Nombre", field: "nombre", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Descripción",
      field: "descripcion",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Vivero", field: "vivero", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Fecha ingreso",
      field: "fecha ingreso",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Producción",
      field: "produccion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Disponible",
      field: "disponible",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Total", field: "total", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Acción",
      field: "accion",
      cellRendererFramework: (params) => (
        <div>
          <button class="btn btn-2 btn-primary text-capitalize" type="button">
            Editar
          </button>
        </div>
      ),
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
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
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Material vegetal en cuarentena
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="mt-4 row">
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Selecione Vivero: </label>
                <Controller
                  name="options"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={opcvivero}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.options && (
                  <p className=" form-control ms-0 text-danger">
                    Este campo es obligatorio
                  </p>
                )}
              </div>

              <div className="col-12 col-sm-6 ">
                <button
                  className="mt-5 btn btn-primary text-capitalize "
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selectedVivero ? (
              <div>
                <div className="d-flex mt-4 px-4 justify-content-end">
                  <div>
                    <label type="number"> Material Vegetal Disponible</label>
                  </div>
                  
                </div>

                <div id="myGrid" className="ag-theme-alpine ">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>
              </div>
            ) : ("")}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantasEnCuarentenaScreen

