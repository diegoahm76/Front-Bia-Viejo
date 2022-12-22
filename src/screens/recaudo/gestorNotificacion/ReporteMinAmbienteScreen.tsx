import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

export const ReporteMinAmbienteScreen = () => {
  const columnReporte = [
    { headerName: "Nombre", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Fecha inicio",
      field: "FechaIni",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Resolución",
      field: "resolucion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Periodo de con",
      field: "periodo",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Tipos", field: "tipos", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Clase de medición",
      field: "classMedi",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Tipo de ", field: "tipode", minWidth: 150, maxWidth: 200 },
    { headerName: "Nombre", field: "nI", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Ubicación",
      field: "ubicacion",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Factor", field: "factor", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Tarifa de la tasa",
      field: "tarifa",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Valor re", field: "valor", minWidth: 150, maxWidth: 200 },
  ];

  const columnInversion = [
    { headerName: "Tipo de Proyecto", field: "Proyecto", minWidth: 150, maxWidth: 700 },
    {
      headerName: "Valor",
      field: "valor",
      minWidth: 150,
      maxWidth: 200,
    },
   
  ];
  const [rowDataReporte] = useState([
    {
      ID: "0001",
      FechaIni: "21-03-2021",
      resolucion: "",
      periodo: "20-02-2022",
      tipos: "Casas Armadas",
      classMedi: "Armando Casas",
      tipode: "800965123-5",
      nI: "45036951",
      ubicacion: "calle 3 # 45-65",
      factor: "3506324566",
      tarifa: "REC-154621-A",
      valor: "",
    },
  ]);

  const [rowDataInversion] = useState([
    {
      Proyecto: "Cuencas con POMCA: Protección-Recuperación y Monitoreo del recurso",
      valor: "$0",
     
    },
    {
      Proyecto:"Elaboración de POMCAS",
      valor:"$90000"
    },
    {
      Proyecto:"Oras cuencas: Protección. Recuperación y Monitoreo del recurso",
      valor:"$50000"
    },
    {
      Proyecto:"Implementación de la tosa por utilización de agua y monitoreo",
      valor:"$0"
    },
    {
      Proyecto:"Adquisición de predios para conservación y establecimiento",
      valor:"$30000"
    },
    {
      Proyecto:"Protección y conservación de zonas de recargo y acuiferos",
      valor:"$30000"
    },
    {
      Proyecto:"Esquemas de pago por servicios ambientales",
      valor:"$120000"
    },
    {
      Proyecto:"Conservación de paramos",
      valor:"$80000"
    },
    {
      Proyecto:"OTROS",
      valor:"$2000000"
    }
  ]);

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

  const {
    register,
    setError,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [reporteTUA, setReporteTUA] = useState({});

  const opcReporteTUA = [
    { label: "TUA", value: "TUA" },
    { label: "Inversión", value: "inver" },
    { label: "Graficos", value: "graf" },
    { label: "Analisis", value: "analisis" },
  ];

const [anio, setAnio] = useState({});
const opcAnios =[
  {label:"2022",value:2022},
  {label:"2021",value:2021},
  {label:"2020",value:2020},
]

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
         // onSubmit=""
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Reporte para el Ministerio del medio ambiente - TUA
          </h3>
          <div className="row align-items-end">
            <div className="col-6 col-sm-3 text-terciary"><label className="text-terciary">Autoridad ambiental <br/> encargada :</label> 
            <h6>Cormacarena</h6> </div>
            <div className="col-6 col-sm-3 text-terciary">
              <label className="text-terciary">Año Reportado</label>
              <Controller
                name="anio"
              // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      {label:"2022",value:2022},
                      {label:"2021",value:2021},
                      {label:"2020",value:2020},
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />



            </div>
            <div className="col-6 col-sm-3">
              <label className="form-control ms-0 text-terciary">Opciones : </label>
              <Controller
                name="anio"
              // control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={[
                      { label: "TUA", value: "TUA" },
    { label: "Inversión", value: "inver" },
    { label: "Graficos", value: "graf" },
    { label: "Analisis", value: "analisis" },
                    ]}
                    placeholder="Seleccionar"
                  />
                )}
              />
            </div>
          </div>

          {reporteTUA === "TUA" ? (
            <div className="row mt-3">
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnReporte}
                    rowData={rowDataReporte}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {reporteTUA === "inver" ? (
            <div className="row mt-5">
              <label className="text-terciary">Inversiones realizadas Recursos de la tasa por utilización de agua</label>
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnInversion}
                    rowData={rowDataInversion}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
              <div className="col-12 col-sm-3 d-flex justify-content-end gap-2 mt-4">
              <label className="mt-3 text-terciary">Inversión Total</label>
              <input
                        className="form-control border rounded-pill px-3 border-terciary "
                        type="float"
                        disabled={true}
                        placeholder="$2400000"
                        {...register("total")}
                      />
            </div>

            </div>
          ) : (
            ""
          )}
          {reporteTUA === "graf" ? (
            <div className="row mt-3">
              <h1>aqui van las graficas</h1>
            </div>
          ) : (
            ""
          )}

          {reporteTUA === "analisis" ? (
            <div className="row mt-3">
              <div id="myGrid" className="ag-theme-alpine ">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnReporte}
                    rowData={rowDataReporte}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
             
            </div>
            
            


          ) : (
            ""
          )}

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-primary text-capitalize border rounded-pill px-3"
            >
              Enviar Reporte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
