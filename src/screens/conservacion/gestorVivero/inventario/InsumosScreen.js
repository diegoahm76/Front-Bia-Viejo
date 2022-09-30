import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const InsumosScreen = () => {
  const [vivero, setVivero] = useState("");
  const { register, handleSubmit, control, formState:{errors}} = useForm();

  const onSubmit = (data) => {
    setVivero(data.seleccioneVivero.value);
  };

  const [rowData] = useState([
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
    {
      nombre: "plastico",
      descripcion: "plastico negro ",
      vivero: "puerto lopez",
      unidades: "rollos",
      entrega: "25",
      usado: "0",
      saldo: "25",
    },
  ]);

  const columnDefs = [
    { headerName: "Nombre insumos", field: "nombre", minWidth: 150 },
    { headerName: "Descripcion", field: "descripcion", minWidth: 150 },
    { headerName: "Vivero", field: "vivero", minWidth: 150 },
    { headerName: "Unidades", field: "unidades", minWidth: 150 },
    {
      headerName: "Cantidad entregada a Vivero",
      field: "entrega",
      minWidth: 150,
    },
    { headerName: "Usado", field: "usado", minWidth: 150 },
    { headerName: "Saldo", field: "saldo", minWidth: 150 },
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
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Insumos</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row">
              <div className="col-12 col-sm-6">
                <label className="form-control ms-0">Seleccione Vivero</label>
                <Controller
                  name="seleccioneVivero"
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
                {errors.seleccioneVivero &&(
                  <p className="text-danger">Este campo es obligatorio</p>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <button
                  type="submit"
                  className="mt-5 btn btn-primary flex-center text-capitalize"
                >
                  Buscar
                </button>
              </div>
            </div>
            {vivero ? (
              <div
                className="ag-theme-alpine mt-4 mb-4 px-4 "
                style={{ height: "500px" }}
              >
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
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

export default InsumosScreen;
