import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function EditarMaterialVegetalScreen() {
  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

  const { register, handleSubmit, watch, formState: { errors }, } = useForm();
  const onSubmit = (data) => {console.log(data);};

  const [selectedCategory, setSelectedCategory] = useState(null);
  const options = [
    { label: "Acacías", value: "AC" },
    { label: "Barranca de Upía", value: "BA" },
    { label: "Cabuyaro", value: "CA" },
    { label: "Castilla La Nueva", value: "CS" },
    { label: "Cubarral", value: "CU" },
    { label: "Cumaral", value: "CM" },
    { label: "El Calvario", value: "CL" },
  ];

  let gridApi;
  const columnDefs = [
    {
      headerName: "Nombre común",
      field: "nombreComun",
      minWidth: 70,
      wrapText: true,
    },
    {
      headerName: "Nombre científico",
      field: "nombreCientifico",
      minWidth: 70,
      wrapText: true,
    },
   
    {
      headerName: "Cantidad en el Vivero",
      field: "cantidadVivero",
     minWidth: 70,
     },
   
  ];

  const rowData = [
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
        cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 0,
    }, 
      {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
       cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 2,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
        cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 0,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
       cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 200,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 1,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
         cantidadVivero: 2,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Rahul",
      nombreCientifico: "Karen",
      cantidadVivero: 0,
      },
  ];
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Editar Material Vegetal</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="multisteps-form__form">
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="col-12 col-sm-12 border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
              <h5 className="font-weight-bolder my-2 text-light">
                Editar material vegetal por vivero
              </h5>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row d-flex align-items-center mb-3">
              <div className="col col-sm-3 align-content-end align-items-end">
              <label>Seleccione vivero </label>
              <span className="text-danger">*</span>
                
              <Select {...register('vivero')}
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                      placeholder="Seleccione vivero"
                    />

              </div>
              <div className="col d-flex align-items-end">
              <button type="submit" Value="buscar" className="btn btn-primary text-capitalize mt-5 border rounded-pill px-3">
                  Buscar
                </button>
              </div>
              </div>

            </form>

            <div className="ag-theme-alpine" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>

            <div>
                <div className="container-fluid">
                <div className="col-3 mb-3 my-4">
            <label>
              Cantidad de material vegetal disponible: 
              </label>
            <input
              type="text"
              className="form-control border rounded-pill px-3"
              disabled
              value={"1200"}
            />
            </div>
            <div className="col-3 mb-3">
            <label>
              Cantidad de material vegetal para descontar por mortalidad: <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control border rounded-pill px-3"
              {...register("cantidadMaterialEliminar", { required: true })}
            />
            {errors.cantidadMaterialEliminar && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
                </div>
              </div>

              <div className="row">
                <div className="col my-3 d-flex justify-content-end">
                  <span>
                    <button className="mx-2 btn btn-light text-capitalize border rounded-pill px-3">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      value="guardar"
                      className="mx-2 btn btn-primary text-capitalize border rounded-pill px-3"
                    >
                      Guardar
                      </button>
                  </span>
                </div>
              </div>
            </div>
        </form>
    </div>
    </div>
  );
}

export default EditarMaterialVegetalScreen;