import React, { useMemo, useRef, useState,} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import Subtitle from '../../../components/Subtitle'

const EtapasDeMaterialVegetalScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    lote: "",
    etapa: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      lote: data.lote,
      etapa: data.etapa,
    });
  };

  const valores1 = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const valores2 = [
    { label: "Cama de germinación", value: "cdg" },
    { label: "Era de producción", value: "edp" },
    { label: "Disponible para distribución", value: "dpd" },
  ];

  let gridApi;

  const columnDefs = [
    {
      headerName: "Nombre Comun",
      field: "Nombre Comun",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre Cientifico",
      field: "Nombre Cientifico",
      minWidth: 150,
      maxWidth: 200,
    },
    { headerName: "Cantidad", field: "Cantidad", minWidth: 150, maxWidth: 200 },
    {
      headerName: "Cantidad en cuarentena",
      field: "Cantidad en cuarentena",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de siembra",
      field: "Fecha de siembra",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Cantidad: 130,
      "Cantidad en cuarentena": 100,
      "Fecha de siembra": "28/02/2022",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Cantidad: 140,
      "Cantidad en cuarentena": 200,
      "Fecha de siembra": "01/07/2022",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Cantidad: 70,
      "Cantidad en cuarentena": 500,
      "Fecha de siembra": "14/05/2022",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Cantidad: 90,
      "Cantidad en cuarentena": 190,
      "Fecha de siembra": "03/08/2022",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Cantidad: 130,
      "Cantidad en cuarentena": 100,
      "Fecha de siembra": "28/02/2022",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Cantidad: 140,
      "Cantidad en cuarentena": 200,
      "Fecha de siembra": "01/07/2022",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Cantidad: 70,
      "Cantidad en cuarentena": 500,
      "Fecha de siembra": "14/05/2022",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Cantidad: 90,
      "Cantidad en cuarentena": 190,
      "Fecha de siembra": "03/08/2022",
    },
  ];

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

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
      <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
        

        <form
          className="row"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
          Consultar etapa y estado de Material Vegetal
        </h3>
        <Subtitle title="Parametros de busqueda"/>

         
            <div className="row">
              <div className="col-12 col-md-3 ms-3">
                <label className="text-terciary form-control ms-0">Lote de siembra: </label>
                <Controller
                  name="lote"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={valores1}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.lote && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3">
                <label className="text-terciary form-control ms-0">
                  Seleccionar etapa de la planta:{" "}
                </label>
                <Controller
                  name="etapa"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={valores2}
                      placeholder="Seleccionar"
                    />
                  )}
                />
                {errors.etapa && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3">
                <button
                  className="mt-5 btn btn-primary text-capitalize "
                  type="submit"
                >
                  Buscar
                </button>
              </div>
            </div>
         

          

          {selecOpciones.lote && selecOpciones.etapa ? (
            <div>
              <div div id="myGrid" className="ag-theme-alpine mt-4">
                <div className="ag-theme-alpine" style={{ height: "400px" }}>
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>

              {/* <div class="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Editar estado
                </button>
              </div> */}

              <div class="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-danger mb-0"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Salir
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
export default EtapasDeMaterialVegetalScreen;
