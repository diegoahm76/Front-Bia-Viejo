import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../../components/Subtitle";

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
      ncien: " ",
      vivero: "Villavicencio",
      "fecha ingreso": "15/05/2022",
      produccion: "150",
      disponible: "54",
      total: "204",
    },
    {
      nombre: "Pomaroso",
      ncien: " ",
      vivero: "Villavicencio",
      "fecha ingreso": "15/06/2022",
      produccion: "100",
      disponible: "200",
      total: "300",
    },
    {
      nombre: "Flor amarillo",
      ncien: " ",
      vivero: "Villavicencio",
      "fecha ingreso": "22/05/2022",
      produccion: "166",
      disponible: "34",
      total: "200",
    },
    {
      nombre: "Flor morado",
      ncien: " ",
      vivero: "Villavicencio",
      "fecha ingreso": "09/11/2022",
      produccion: "200",
      disponible: "0",
      total: "200",
    },
  ]);

  const columnDefs = [
    { headerName: "Nombre", field: "nombre", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Nombre Cientifico",
      field: "ncien",
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
          <button className="btn text-capitalize" type="button" title="Editar material">
          <i class="fa-regular fa-pen-to-square fs-3"></i>
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
      <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
        
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(submit)}
          id="configForm"
        >
<h3 className="mt-3 mb-0 text-start fw-light mb-3">
          Material vegetal en cuarentena
        </h3>

<Subtitle
title="Informacion de plantas en cuarentena"/>
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
                  className="mt-5 btn text-capitalize "
                  type="submit"
                  title="Buscar"
                >
                  <i class="fa-solid fa-magnifying-glass fs-3"></i>
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

