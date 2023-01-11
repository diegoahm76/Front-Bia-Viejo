import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";

export const GestionarSolicitudMVScreen = () => {
  const [datosFilas] = useState([
    {
      nombre: "yopo",
      cantidad: 500,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
    {
      nombre: "pomarroso",
      cantidad: 600,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
    {
      nombre: "ceiba",
      cantidad: 1500,
      profesional: "Profesional Meta Verde",
      vivero: "Villavicencio",
      fechaSolicitud: Date,
    },
  ]);

  const columnasHeader = [
    { headerName: "Material", field: "nombre" },
    { headerName: "Cantidad", field: "cantidad" },
    { headerName: "Vivero", field: "vivero" },
    { headerName: "Profesional", field: "profesional" },
    { headerName: "Fecha solicitud", field: "fechaSolicitud" },
  ];
  let gridApi;
  const defaultColNom = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable:true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Gestion de solicitudes de material vegetal
        </h3>

        <div className="card mt-5">
          <div className="row mt-5 ms-5">
            <label>Solicitud numéro: 000960</label>
          </div>
          <div className="row mt-5 ms-5">
            <label>Documento relacionado: </label>
          </div>
          <div className="row mt-5 ms-5">
            <label>Listado de la solicitud: </label>
            <div
              className="ag-theme-alpine mt-1 mb-6 mb-2 px-5"
              style={{ height: "250px" }}
            >
              <AgGridReact
                columnDefs={columnasHeader}
                rowData={datosFilas}
                debounceVerticalScrollbar={true}
                rowSelection={"single"}
                defaultColDef={defaultColNom}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          <div className="row mt-5">
            <div
              style={{
                display: "flex",
                flexDirection: "row",

                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <button
                className="col btn btn-2 btn-danger ms-8 me-8  mb-5"
                type="button"
              >
                Rechazar
              </button>

              <button
                className="col btn btn-2 btn-secondary ms-8 me-8 mb-5 "
                type="button"
                onClick={() => {
                 // this.props.history.replace
                  (
                    "/dashboard/conservacion-distribucion-solicitudinfo"
                  );
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GestionarSolicitudMVScreen;