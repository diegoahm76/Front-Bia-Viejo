import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Subtitle from "../../../../components/Subtitle";

const PropagacionScreen = () => {
  const [vivero, setVivero] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setVivero(data.SeleccioneVivero.value);
  };

  const [rowData] = useState([
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "Villavicencio",
      lote_siembra: "12",
      cantidad: "152",
      cantidad_sembrada: "120",
      total: "272",
    },
    {
      nombre: "Pomarroso",
      especie: " ",
      vivero: "Villavicencio",
      lote_siembra: "11",
      cantidad: "50",
      cantidad_sembrada: "15",
      total: "65",
    },
    
  ]);

  const columnDefs = [
    { headerName: "Nombre Comun", field: "nombre", minWidth: 150 },
    { headerName: "Nombre Cientifico", field: "especie", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    {
      headerName: "# de lote de siembra",
      field: "lote_siembra",
      minWidth: 150,
    },
    { headerName: "Cantidad Kg", field: "cantidad", minWidth: 150 },
    {
      headerName: "Cantidad sembrada Kg",
      field: "cantidad_sembrada",
      minWidth: 150,
    },
    { headerName: "Total", field: "total", minWidth: 150 },
  ];
  const optionsSeleccioneVivero = [
    { label: "Villavicencio", value: "V" },
    { label: "Puerto Lopez", value: "PL" },
    { label: "Mapiripan", value: "M" },
    { label: "La Macarena", value: "LM" },
    { label: "San Juan de Arama", value: "SJA" },
    { label: "Puerto Rico", value: "PR" },
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
    <div className="row min-vh-100 ">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
      
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >  <h3 className="mt-3 mb-0 mb-3 fw-light  text-terciary">Inventario de vivero</h3>
        <Subtitle title={"Material para Propagación"}/>
          <div className="multisteps-form__content">
            <div className="row mt-3 align-items-end">
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Seleccione Vivero</label>
                <Controller
                  name="SeleccioneVivero"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={optionsSeleccioneVivero}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                {errors.SeleccioneVivero && (
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <button
                  type="submit"
                  className=" btn text-capitalize"
                >
                  <i class="fa-solid fa-magnifying-glass fs-3"></i>
                </button>
              </div>
            </div>
            {vivero ? (
              <div>
                <div className="d-flex mt-4 px-4 justify-content-end">
                  <div>
                    <label type="number"> Total en vivero |</label>
                  </div>
                  <div>
                    <label type="number" align="right">
                      {" "}
                      Cant KG 20 |
                    </label>
                  </div>
                  <div>
                    <label type="number">Sembrada Kg 22 |</label>
                  </div>
                  <div>
                    <label type="number">Total 23</label>
                  </div>
                </div>

                <div
                  className="ag-theme-alpine mt-2 mb-4 px-4 "
                  style={{ height: "500px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    type="button"
                    className="mt-4 btn flex-center text-capitalize"
                  >
                    <i class="fa-regular fa-plus fs-3"></i>
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropagacionScreen;
