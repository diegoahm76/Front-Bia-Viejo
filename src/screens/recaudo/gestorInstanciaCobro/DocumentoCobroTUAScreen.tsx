import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Subtitle from "../../../components/Subtitle";

const DocumentoCobroTUAScreen = () => {
  const [informacion, setInformacion] = useState(false);

  const { 
    reset,
    register,
    handleSubmit,
    control,
     formState
     } = useForm();

  const onSubmit = () => {};

  let gridApi;
  const columnDefs = [
    {
      headerName: "No facturación",
      field: "No facturación",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de facturación",
      field: "Fecha de facturación",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Periodo de facturación",
      field: "Periodo de facturación",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha límite de pago",
      field: "Fecha límite de pago",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre del titular",
      field: "Nombre del titular",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre del representante legal",
      field: "Nombre del representante legal",
      minWidth: 150,
      maxWidth: 300,
    },
    {
      headerName: "Número de identificación tributaria O cédula de ciudadanía",
      field: "Número de identificación tributaria O cédula de ciudadanía",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Cédula de ciudadanía",
      field: "Cédula de ciudadanía",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Dirección",
      field: "Dirección",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Teléfono",
      field: "Teléfono",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Expediente",
      field: "Expediente",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "No de resolución",
      field: "No de resolución",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de resolución",
      field: "Fecha de resolución",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre de la fuente",
      field: "Nombre de la fuente",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Tipo de uso",
      field: "Tipo de uso",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Predio y municipio",
      field: "Predio y municipio",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Caudal concesionado",
      field: "Caudal concesionado",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Factor regional",
      field: "Factor regional",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Tarifa de la tasa",
      field: "Tarifa de la tasa",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Volumen de agua utilizado",
      field: "Volumen de agua utilizado",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Factor de costo de oportunidad",
      field: "Factor de costo de oportunidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Cálculo del monto a pagar",
      field: "Cálculo del monto a pagar",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor total",
      field: "Valor total",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Acciones",
      field: "Acciones",
      minWidth: 150,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div className="button-row justify-align-content-center col-12 col-sm-4 col-lg-4">
          <button
            className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary me-md-2"
            type="submit"
            title="Send"
            onClick={() => setInformacion(!informacion)}
          >
            Selecionar
          </button>
        </div>
      ),
    },
  ];
  const rowData = [
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
    {
      "No facturación": "123456",
      "Fecha de facturación": "10/01/2022",
      "Periodo de facturación": "Perido",
      "Fecha límite de pago": "12/10/2022",
      "Nombre del titular": "wilmer",
      "Nombre del representante legal": "Maria",
      "Número de identificación tributaria O cédula de ciudadanía": "1234567",
      "Cédula de ciudadanía": "1121957643",
      Dirección: "ca 36 # 21-24",
      Teléfono: "3207406489",
      Expediente: "1234455",
      "No de resolución": "123456",
      "Fecha de resolución": "10/12/1987",
      "Nombre de la fuente": "Nombre",
      "Tipo de uso": "uso",
      "Predio y municipio": "cumaral",
      "Caudal concesionado": "caudal",
      "Factor regional": "region",
      "Tarifa de la tasa": "tarifa",
      "Volumen de agua utilizado": "7 c3",
      "Factor de costo de oportunidad": "Oportunidad",
      "Cálculo del monto a pagar": "$ 2.300.400",
      "Valor total": "$5.000.000",
      Acciones: "",
    },
  ];
  const defaultColDef = {
    sortable: true,
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
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              Documento de cobro TUA
            </h3>
            <div id="myGrid" className="ag-theme-alpine my-3">
              <div className="ag-theme-alpine " style={{ height: "425px" }}>
                <AgGridReact
                  columnDefs={columnDefs}
                  rowData={rowData}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                ></AgGridReact>
              </div>
            </div>
            {informacion === true ? (
              <div>
                <Subtitle title={"Información de la búsqueda"} mt={5} />

                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre del titular
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="Wilmer"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Nombre representante legal
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="Maria"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">NIT/CC</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="123456789"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">CC</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="1121957645"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">Dirección</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="Ca 36 #21-24"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">Teléfono</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="3207406489"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">Expediente</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="12345678"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Número de resolución
                      </label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="12334567890"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">Fecha</label>
                      <input
                        className="border border-terciary form-control border rounded-pill px-3"
                        type="text"
                        disabled
                        value="10/10/2022"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary me-md-2 mt-3">
                    Generar documento de cobro
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default DocumentoCobroTUAScreen;
