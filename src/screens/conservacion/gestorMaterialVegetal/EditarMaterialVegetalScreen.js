import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function EditarMaterialVegetalScreen() {
  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

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
      nombreComun: "yopo",
      nombreCientifico: "",
        cantidadVivero: 500,
      },
    {
      nombreComun: "pomarroso",
      nombreCientifico: "",
      cantidadVivero: 500,
      },
    {
      nombreComun: "Flor morado",
      nombreCientifico: "",
      cantidadVivero: 0,
    }, 
      {
      nombreComun: "Flor amarillo",
      nombreCientifico: "",
      cantidadVivero: 500,
      },
    {
      nombreComun: "ceiba",
      nombreCientifico: "",
       cantidadVivero: 500,
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="multisteps-form__form"
        >
          <div
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
          >
            <h3 className="mt-3 text-start mb-3 fw-light ms-3">
              Editar Material Vegetal
            </h3>
            <Subtitle title={"Editar material vegetal por vivero"} mt={3} />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row ms-1 d-flex align-items-center mb-3">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                <label className="text-terciary">Seleccione vivero</label>
                  <span className="text-danger">*</span>

                  <Select
                    {...register("vivero")}
                    defaultValue={selectedCategory}
                    onChange={setSelectedCategory}
                    options={options}
                    placeholder="Seleccione vivero"
                  />
                </div>
                <div className="col-12 col-md-3 d-flex align-items-end">
                  <button
                    type="submit"
                    Value="buscar"
                    className="btn text-capitalize mt-5 border rounded-pill px-3"
                    title=" Buscar"
                  >
                    <i class="fa-solid fa-magnifying-glass fs-3"></i>
                  </button>
                </div>
              </div>
            </form>

            <div className="ag-theme-alpine mx-3" style={{ height: "500px" }}>
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
                <label className="text-terciary">Cantidad de material vegetal disponible:</label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    disabled
                    value={"1200"}
                  />
                </div>
                <div className="col-12 col-md-3">
                <label className="text-terciary">
                    Cantidad de material vegetal para descontar por mortalidad:{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("cantidadMaterialEliminar", {
                      required: true,
                    })}
                  />
                  {errors.cantidadMaterialEliminar && (
                    <div className="col-12 col-md-3">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-flex justify-content-end flex-wrap mt-4">
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn flex-center text-capitalize border rounded-pill px-3"
                  >
                    <i class="fa-regular fa-floppy-disk fs-3"></i>
                  </button>
                </div>
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn flex-center text-capitalize border rounded-pill px-3"
                  >
                    <i class="fa-solid fa-x fs-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarMaterialVegetalScreen;
