import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";

export const InformacionDeudaScreen = () => {
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

  const columnCartera = [
    {
      headerName: "Nombre de usuario",
      field: "user",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "NIT/CC", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Concepto de la obligación",
      field: "obli",
      minWidth: 150,
      maxWidth: 200,
    },

    {
      headerName: "Proceso de la obligación",
      field: "process",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Numero de la obligación",
      field: "nprocess",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Medio de pago",
      field: "mediopag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de pago",
      field: "fechapag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor pagado",
      field: "valuepag",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Abono",
      field: "abono",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Pago total",
      field: "total",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const { control: control, handleSubmit: handleSubmitInformacion } = useForm();

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          // onSubmit={()}
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Información de la deuda
          </h3>
          <Subtitle
            title={"Inoformación de deuda de los usuarios ante la corporación"}
          />
          <div className="row mt-4 align-items-end">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">Concepto de la deuda</label>

              <Controller
                name="concepto"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "Todos los conceptos", value: "tc" },
                      { label: "Tasa retributiva", value: "TR" },
                      { label: "Multas y Sanciones", value: "MS" },
                      { label: "Tasa por uso de agua", value: "TUA" },
                      { label: "Tasa por aprovechamiento", value: "TA" },
                      { label: "Visitas tecnicas", value: "VT" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
            <div>
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnCartera}
                    rowData={""}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
