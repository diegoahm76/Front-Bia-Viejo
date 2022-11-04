import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller, appendErrors } from "react-hook-form";
import Subtitle from "../../../../components/Subtitle";

const DonacionesScreen = () => {
  const [selecVivero, setSelecVivero] = useState({
    viveros: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecVivero({
      viveros: data.viveros,
    });
  };

  const valores1 = [
    { label: "Mapirípan", value: "Map" },
    { label: "Villavicencio", value: "Vil" },
    { label: "La Macarena", value: "laM" },
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
    { headerName: "Viveros", field: "Viveros", minWidth: 150, maxWidth: 200 },
    { headerName: "Total", field: "Total", minWidth: 150, maxWidth: 200 },
  ];

  const rowData = [
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
    },
    {
      "Nombre Comun": "cola de zorra",
      "Nombre Cientifico": "Alopecurus myosuroides",
      Viveros: "Mapirípan",
      Total: "100",
    },
    {
      "Nombre Comun": "sabia",
      "Nombre Cientifico": "Amaranthus blitoides",
      Viveros: "Villavicencio",
      Total: "200",
    },
    {
      "Nombre Comun": "manzanilla loca",
      "Nombre Cientifico": "Anacyclus clavatus",
      Viveros: "Mapirípan",
      Total: "150",
    },
    {
      "Nombre Comun": "avena loca",
      "Nombre Cientifico": "Avena barbata",
      Viveros: "La Macarena",
      Total: "30",
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
              Inventario Donaciones
            </h3>
            <Subtitle title="Información del inventario" />

            <div className="row">
              <div className="col-12 col-md-3 ms-3">
                <label className="text-terciary form-control ms-0">Seleccione Vivero :</label>
                <Controller
                  name="viveros"
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
                {errors.viveros && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3 mt-4">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            {selecVivero.viveros ? (
              <div>
                <div className="d-flex mt-3 px-4 justify-content-end">
                  <div>
                    <label type="number"> Total de plantas |</label>
                  </div>
                  <div>
                    <label type="number" align="right">
                      1460
                    </label>
                  </div>
                </div>

                <div id="myGrid" className="ag-theme-alpine">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
                    <AgGridReact
                      columnDefs={columnDefs}
                      rowData={rowData}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>

                <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                  <button className="text-capitalize btn bg-gradient-danger mb-0" type="submit">
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
export default DonacionesScreen;
