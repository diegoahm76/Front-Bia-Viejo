import React, { useRef, useState } from "react";

import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function ProduccionPropiaScreen() {
  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };
  const [dataRowFilter, setDataRowFilter] = useState();
  const [selecOpciones, setSelecOpciones] = useState({
    vivero:"",
});
 
  const grdRef = useRef(); // Optional - for accessing Grid's API

  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero : data.vivero,
    });
  };

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
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Nombre científico",
      field: "nombreCientifico",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Viveros",
      field: "viveros",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      wrapText: true,
    },
    {
      headerName: "Producción < 30",
      field: "produccion",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "red", backgroundColor: "yellow" };
        }
        return null;
      },
    },

    {
      headerName: "Disponible en vivero > 30",
      field: "disponibleVivero",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "white", backgroundColor: "green" };
        }
        return null;
      },
    },
    {
      headerName: "Mortalidad",
      field: "mortalidad",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
      cellStyle: (params) => {
        if (params.value > 0) {
          return { color: "white", backgroundColor: "red" };
        }
        return null;
      },
    },
    {
      headerName: "Total",
      field: "total",
      width: 100,
      minWidth: 70,
      maxWidth: 200,
    },
    {
      headerName: "Editar",
      field: "editar",
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary mx-auto my-1 d-flex btn-sm text-xxs text-capitalize"
            onClick={() => actionButton(params)}
          >
            Editar
          </button>
        </div>
      ),
    },
  ];

  const rowData = [
    {nombreComun: "Mata Raton", nombreCientifico: "Quiebraroedor", viveros: 9876543210, produccion: 550, disponibleVivero: 300, mortalidad: 500, total: 350,},
    {nombreComun: "Rahul", nombreCientifico: "Raul", viveros: 9876543210, produccion: 501, disponibleVivero: 0, mortalidad: 500, total: 501,},
    {nombreComun: "Duranta", nombreCientifico: "Amarillea", viveros: 9876543210, produccion: 10, disponibleVivero: 300, mortalidad: 0, total: 300,},
    {nombreComun: "Mango", nombreCientifico: "Biche", viveros: 9876543210, produccion: 320, disponibleVivero: 300, mortalidad: 500, total: 1100,},
    {nombreComun: "Palma Africana", nombreCientifico: "Aceitepalm", viveros: 9876543210, produccion: 1111, disponibleVivero: 2017, mortalidad: 500, total: 1100,},
    {nombreComun: "Rahul", nombreCientifico: "Perez", viveros: 9876543210, produccion: 1, disponibleVivero: 1, mortalidad: 2, total: 1100,},
    {nombreComun: "Ixora", nombreCientifico: "Frondosa", viveros: 9876543210, produccion: 230, disponibleVivero: 300, mortalidad: 500, total: 1100,},
    {nombreComun: "Mata Raton", nombreCientifico: "Quiebraroedor", viveros: 9876543210, produccion: 550, disponibleVivero: 300, mortalidad: 500, total: 350,},
    {nombreComun: "Rahul", nombreCientifico: "Raul", viveros: 9876543210, produccion: 501, disponibleVivero: 0, mortalidad: 500, total: 501,},
    {nombreComun: "Duranta", nombreCientifico: "Amarillea", viveros: 9876543210, produccion: 10, disponibleVivero: 300, mortalidad: 0, total: 300,},
    {nombreComun: "Mango", nombreCientifico: "Biche", viveros: 9876543210, produccion: 320, disponibleVivero: 300, mortalidad: 500, total: 1100,},
    {nombreComun: "Palma Africana", nombreCientifico: "Aceitepalm", viveros: 9876543210, produccion: 1111, disponibleVivero: 2017, mortalidad: 500, total: 1100,},
    {nombreComun: "Rahul", nombreCientifico: "Perez", viveros: 9876543210, produccion: 1, disponibleVivero: 1, mortalidad: 2, total: 1100,},
    {nombreComun: "Ixora", nombreCientifico: "Frondosa", viveros: 9876543210, produccion: 230, disponibleVivero: 300, mortalidad: 500, total: 1100,},
        
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

     <div className="min-vh-100">
      <div className="row">
        <div className="col col-lg-10 col-md-10 col-12 mx-auto">
          <h3 className="text-center my-4">Producción Propia</h3>
        </div>
      </div>
      <div className="card col-lg-10 col-md-10 col-12 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="multisteps-form__form" id="configForm">
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <div className="my-3">
              <h5 className="font-weight-bolder border-radius-xl my-2">
                Produccion propia por vivero
              </h5>
            </div>
            
    
            <div className="row d-flex align-items-center">
              <div className="col col-sm-3 text-xxs align-content-end align-items-end">
              <label>Seleccione vivero </label>
              <label className="text-danger">*</label>
              <Controller
                  name="vivero"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
              <Select 
                      {...field}
                      
                      options={options}
                      placeholder="Seleccione vivero"
                    />
                    )}
                    />
                    {errors.vivero && (
              <small className="text-danger">Este campo es obligatorio *</small>
              )}

              </div>
              <div className="col d-flex align-items-end">
              <button type="submit" title= "Send" form= "configForm" Value="buscar" className="btn btn-primary btn-sm text-xxs text-capitalize mt-5">
                  Buscar
                </button>
              </div>
              <div className="col col-6 mx-auto d-flex justify-content-center flex-column align-items-center">
                <label>Crear producto nuevo</label>
                <button className="btn btn-secondary mx-auto btn-sm text-xxs text-capitalize">
                  Crear
                </button>
              </div>
            </div>
            

            {selecOpciones.vivero && (

           <div>
            <div className="row mt-4">
              <div className="col mx-auto d-flex justify-content-end align-items-end">
                <span className="d-flex justify-content-end">
                  <label className="ms-3 my-auto">Producción &#60; 30: &#32;</label>
                  <input className="text-start input small border border-0 w-5" type="text" id="name" name="name" disabled="true" value="500" ></input>
                  <label className="ms-3 my-auto">Disponible en vivero &#62; 30: &#32;</label>
                  <input className="text-start input small border border-0 w-5" type="text" id="name" name="name" disabled="true" value="1200" ></input>
                  <label className="ms-3 my-auto">Mortalidad: &#32;</label>
                  <input className="text-start input small border border-0 w-5" type="text" id="name" name="name" disabled="true" value="1100" ></input>
                  <label className="ms-3 my-auto">Total: &#32;</label>
                  <input className="text-start input small border border-0 w-5" type="text" id="name" name="name" disabled="true" value="1050" ></input>
                </span>
              </div>
            </div>

            <div id="myGrid" className="ag-theme-alpine mt-4">
            <div className="ag-theme-alpine my-1" style={{ height: "500px" }}>
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                debounceVerticalScrollbar={true}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
            </div>
            
            <div class="d-grid gap-2 d-flex justify-content-end  mt-3">
            {" "}
            {/*  BOTONES DE ABAJO  */}
            <button
              className="btn bg-gradient-danger mb-0 btn-sm text-xxs"
              type="submit"
              title="Send"
              form="configForm"
            >
              Salir
            </button>
          </div>

            </div>
            )}

            </div>
        </form>
      </div>
    </div>
  );
}

export default ProduccionPropiaScreen;