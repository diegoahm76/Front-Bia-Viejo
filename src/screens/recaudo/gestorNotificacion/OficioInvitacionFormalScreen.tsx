import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { useState } from 'react';

export const OficioInvitacionFormalScreen = () => {

   

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
  
    const columnReporte = [
        { headerName: "Factura N°", field: "ID", minWidth: 150, maxWidth: 200 },
        {  headerName: "Fecha de facturacion", field: "FechaFact", minWidth: 150, maxWidth: 200},
        {  headerName: "Periodo de Facturacion",field: "perFac",minWidth: 150,maxWidth: 200, },
        { headerName: "Fecha limite de pago", field: "fLimite", minWidth: 150, maxWidth: 200 },
        {  headerName: "Nombre del titular",  field: "ntitular",minWidth: 150,maxWidth: 200,},
        {   headerName: "Nombre del representante legal", field: "nrepresentante", minWidth: 150, maxWidth: 200, },
        {     headerName: "NIT",  field: "nit",  minWidth: 150,  maxWidth: 200,  },
          { headerName: "Numero de identificacion", field: "nI", minWidth: 150, maxWidth: 200,  },
      {    headerName: "Direccion",  field: "direccion",   minWidth: 150,  maxWidth: 200,  },
          {     headerName: "Telefono",  field:"telefono",  minWidth: 150,  maxWidth: 200,   },
          {    headerName: "Expediente",   field: "exped",  minWidth: 150,  maxWidth: 200,  },
          {    headerName: "Nombre de la fuente", field: "nFuente", minWidth: 150, maxWidth: 200,  },
          {    headerName: "Tipo de uso", field: "tUSo",  minWidth: 150, maxWidth: 200,  },
          {    headerName: "Predio y municipio",  field: "predmun",  minWidth: 150,  maxWidth: 200,  },
          {   headerName: "Valor total", field: "vTotal",  minWidth: 150,  maxWidth: 200,  },
          {    headerName: "Interes moratorio",  field: "intmora",  minWidth: 150,  maxWidth: 200,  },
          {    headerName: "Dias en mora",  field: "dMora",  minWidth: 150,  maxWidth: 200,  },
        {
          headerName: "Acción",
          field: "accion",
          cellRendererFramework: (params) => (
            <div>
              <button
                className="btn btn-2 btn-primary text-capitalize border rounded-pill px-3"
                type="button"
              >
                generar
              </button>
            </div>
          ),  minWidth: 150,maxWidth: 200,
        },
      ];

      const [rowDataOficio] = useState([
        {
          ID: "0001",
          FechaFact: "21-03-2021",
          perFac: "",
          fLimite: "20-02-2022",
          nTitular:"Casas Armadas",
          nrepresentante:"Armando Casas",
          nit:"800965123-5",
          nI:"45036951",
          direccion:"calle 3 # 45-65",
          telefono:"3506324566",
          exped:"REC-154621-A",
          nFuente:"",
          tUso:"suelos",
          predmun:"Villavicencio",
          vTotal:"$156.264.000",
          intmora:"$21.456.000",
          dMora:"335"
        },
      ]);

    const onGridReady = (params) => {
      gridApi = params.api;
    };
  

  return (

    <div className="row min-vh-100">
    <div className="col-lg-12 col-md-10 col-12 mx-auto">
      <form
        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
        data-animation="FadeIn"
       // onSubmit=""
        id="configForm"
      >
   
          <h3 className="mt-3 ms-3 mb-0 text-start fw-light mb-4">Oficio de invitacion formal</h3>
    <div className='row'>
        <div>
        <div id="myGrid" className="ag-theme-alpine ">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
                    >
        <AgGridReact
                        columnDefs={columnReporte}
                        rowData={rowDataOficio}
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
  )
}
