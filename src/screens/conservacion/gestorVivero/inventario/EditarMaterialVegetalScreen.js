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
              <div className="col col-sm-3 text-xxs align-content-end align-items-end">
              <label className="text-terciary">Seleccione vivero </label>
              <label className="text-danger">*</label>
                
              <Select {...register('vivero')}
                      defaultValue={selectedCategory}
                      onChange={setSelectedCategory}
                      options={options}
                      placeholder="Seleccione vivero"
                    />

              </div>
              <div className="col d-flex align-items-end">
              <button type="submit" Value="buscar" className="btn btn-primary btn-sm text-xxs text-capitalize mt-5">
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
                  <div className="mt-3 mb-2">
                    <label className="ms-3">
                      Cantidad de material vegetal disponible:
                    </label>
                    <input className="text-start input small border border-0 w-5" type="text" id="name" name="name" disabled="true" value="1200" ></input>
                  </div>
                  <div className="row">
                    <div className="col col-6">
                    <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Ingrese cantidad"
                      {...register("cantidadMaterialELiminar", { required: true })}
                    />
                    {errors.mortalidad?.type === "required" && (
                        <small className="text-danger">El campo es requerido*</small>
                      )}
                    <label className="ms-2">Cantidad de material a descontar por mortalidad:</label>
                  </div>
                </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col my-3 d-flex justify-content-end">
                  <span>
                    <button className="mx-2 btn btn-light btn-sm text-xxs text-capitalize">
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      value="guardar"
                      className="mx-2 btn btn-primary btn-sm text-xxs text-capitalize"
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