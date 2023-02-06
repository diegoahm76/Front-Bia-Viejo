import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import Subtitle from "../../../components/Subtitle";
import Select from 'react-select';

export const DespachosEntrantesScreen = () => {
  const [datosFilasAgregar] = useState([
    {
      codigo: 1313512,
      nombre: "Yopo",
      origen: "resarcimiento",
      Doc: "13523dsf1333",
      cantent: 600,
      observacion: "-.-",
      cantrest: 2600,
    },
  ]);

  const columnasMaterialDisponible = [
    { headerName: "Código Bien Despachado", field: "codigo" },
    { headerName: "Nombre del Bien", field: "nombre" },
    { headerName: "Origen del Bien", field: "origen" },
    { headerName: "Número de Documento", field: "Doc" },
    { headerName: "Cantidad Entrante", field: "cantent" },
    { headerName: "Observación de Distribución", field: "observacion" },
    { headerName: "Cantidad Restante", field: "cantrest", color: "red" },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: false,
    flex: 1,
    filter: true,
    floatingFilter: false,
    suppressMovable: true,
  };
  const onGridReady = (params) => {
    gridApi = params.api;
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            //</div>onSubmit={handleSubmit(submitVivero)}
          >
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Despacho de bienes a viveros
            </h3>

            <div className="row d-flex align-items-end mt-2 mx-2">
              <div className="col-12 col-md-3 mb-3">
                <label className="text-terciary">Número de despacho:</label>
                <input
                  type="number"
                  disabled
                  className="form-control border border-terciary rounded-pill px-3"
                  placeholder="Número de despacho"
                />
              </div>
            </div>

            <Subtitle title="Items recibidos" mt={3} mb={2} />
            <div id="myGrid" className="ag-theme-alpine ">
              <div className="ag-theme-alpine" style={{ height: "250px" }}>
                <AgGridReact
                  columnDefs={columnasMaterialDisponible}
                  rowData={datosFilasAgregar}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>

            <Subtitle title="Items a distribuir" mt={3} mb={2} />
            <div className="col">
              <div className="row">
                <div className="col-6 col-md-3 mb-3">
                  <label>Bien Seleccionado: </label>
                </div>
              </div>
              <div className="row">
                <div className="col">  
                <label >Nombre: </label>
                <input className="form-control border border-terciary rounded-pill px-3"></input>
                 </div>
                 <div className="col">  
                <label >Código: </label>
                <input className="form-control border border-terciary rounded-pill px-3"></input>
                 </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-6 col-md-3">
                  <label>Vivero Seleccionado: </label>
                </div>
              </div>
              <div className="col ">
              <div className="row align-items-end">
                <div className="col">  
                <label className="text-terciary">
                  Vivero:<span className="text-danger">*</span>
                </label>

                <Select
                 // options={municipiosOptions}
                  placeholder="Selecciona municipio"
                 // value={createModel.municipio}
                 // onChange={changeSelectMuni}
                  required={true}
                />
                 </div>
                 <div className="col">  
                <label >Cantidad: </label>
                <input className="form-control border border-terciary rounded-pill px-3"></input>
                 </div>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
