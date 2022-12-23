import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Subtitle from "../../../components/Subtitle";
import ModalLocal from "../../../components/ModalLocal";
import { Controller, useForm } from "react-hook-form";


export const InformeBDMEScreen = () => {
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
      headerName: "Tipo de renta",
      field: "TR",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Contribuyente",
      field: "contri",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "NIT/CC", field: "ID", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Numero de Expediente",
      field: "fechafac",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de inicio",
      field: "fechain",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de pago",
      field: "fechapag",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Interes", field: "interes", minWidth: 150, maxWidth: 200 },
    { headerName: "Capital", field: "cap", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Dias de mora",
      field: "diasmora",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Estado de cobro",
      field: "status",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const [informeBDME, setInformeBDME] = useState(false);

  const handleOpenModalInformeBDME = () => {
    setInformeBDME(true);
  };

  const handleCloseModalInformeBDME = () => {
    setInformeBDME(false);
  };

  const { control: control, handleSubmit: handleSubmitInformeBDME } = useForm();


  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
        //  onSubmit=""
          id="configForm"
        >
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">
            Informe BDME
          </h3>
          <Subtitle title={"Deudores que aplican para el informe"} />
          <div className="row mt-4 align-items-end">
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Cantidad de deudores:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="float"
                  placeholder="Cantidad de usuarios"
                  disabled
                />
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Cantidad facilidades:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="float"
                  placeholder="Cartera"
                  //disabled="true"
//como se deja un input deshabilitado con tsx


/>
              </label>
            </div>
            <div className="col-6 col-sm-3">
              <label className="text-terciary">
                Periodo:{" "}
                <input
                  className="form-control border rounded-pill px-3 mt-1 border border-terciary"
                  type="float"
                  placeholder="Concepto de deuda"
                 
                />
                
              </label>
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
            <div className="col-6 col-sm-3 mt-2">
                    <button
                      type="button"
                      className="btn text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                      title="Generar Reporte"
                      onClick={handleOpenModalInformeBDME}
                    >
                      <i className="fa-solid fa-flag fs-3"></i>
                    </button>
                  </div>
          </div>
          <ModalLocal localState={informeBDME}>
<h3>Informe BDME</h3>

<div className="py-5">
<label>Este espacio es para el informe que se genera
</label>

</div>
<div className="row">
                   <div> <button
                      type="button"
                      className="btn text-capitalize border rounded-pill  btn-min-width"
                      onClick={handleCloseModalInformeBDME}
                      title="Volver"
                    >
                      <i className="fa-solid fa-angles-left fs-3"></i>
                    </button>

                   <button
                      type="button"
                      className="btn text-capitalize border rounded-pill  btn-min-width ms-2"
                    
                      title="Descargar Informe"
                    >
                 <i className="fa-regular fa-file-pdf fs-3"></i>
                    </button>
                     <button
                      type="button"
                      className="btn text-capitalize border rounded-pill  btn-min-width ms-2"
        
                      title="Editar Informe"
                    >
                <i className="fa-regular fa-pen-to-square fs-3"></i>
                    </button>
                        </div>                
                  </div>
          </ModalLocal>
        </form>
      </div>
    </div>
  );
};
