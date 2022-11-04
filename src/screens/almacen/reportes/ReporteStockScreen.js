import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";

const ReporteStockScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    codigoArtico: "",
  });

  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      codigoArticulo: data.codigoArticulo,
    });
  };

  let gridApi;

  const columnDefs = [
    {
      headerName: "Codigo del articulo",
      field: "Codigo del articulo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Nombre",
      field: "Nombre",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Stock minimo",
      field: "Stock minimo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Stock maximo",
      field: "Stock maximo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Cantidad",
      field: "Cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo del articulo": "12973",
      Nombre: "Papel rexma",
      "Stock minimo": "50",
      "Stock maximo": "300",
      Cantidad: "250",
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

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Reporte de stock maximo y minimo
            </h3>

            <Subtitle title="reporte de stok maximo y minimo" mb="3" />

            <div className="row">
              <div className="col-12 col-md-3 ">
                <label className="text-terciary ms-2">
                  Codigo del articulo
                  <small className="text-danger">*</small>
                </label>
                <input
                  name="codigoArticulo"
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Codigo de articulo"
                  {...register("codigoArticulo", { required: true })}
                />
                {errors.codigoArticulo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3 ">
                <label className="text-terciary ms-2">Nombre del articulo </label>
                <input
                  name="nombreArticulo"
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="Nombre del articulo"
                  value="Computador"
                  disabled
                />
              </div>

              <div className="col-12 col-md-3  mt-2">
                <button
                  className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaArticuloIsActive(true)}
                >
                  Buscar articulo
                </button>
              </div>
              <div className="col-12 col-md-3  mt-2">
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

            {selecOpciones.codigoArticulo ? (
              <div>
                <div className="row">
                  <div id="myGrid" className="ag-theme-alpine mt-4">
                    <div
                      className="ag-theme-alpine"
                      style={{ height: "400px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefs}
                        rowData={rowData}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Nombre quien imprime</label>
                    <input
                      name="nombreQuienImprime"
                      className="form-control border rounded-pill px-3 border border-terciary"
                      type="text"
                      placeholder="Nombre del articulo"
                      value="Julian Castillo"
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-3 ms-2">
                    <label  className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
                      Fecha de impresion
                    </label>

                    <Controller
                      name="fechaSolicitud"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={startDate}
                          dateFormat="dd/MM/yyyy"
                          includeDates={[new Date()]}
                          onChange={(date) => setStartDate(date)}
                          className="form-control border rounded-pill px-3  p-2 border border-terciary"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-12 col-md-12 d-flex justify-content-end">
                    <div className=" d-grid gap-2 d-flex justify-content-end  mt-4 ">
                      <button
                        className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                        type="button"
                        title="Send"
                        form="configForm"
                      >
                        Imprimir
                      </button>

                      <button
                        className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-danger mb-0 text-capitalize"
                        type="button"
                        title="Send"
                        form="configForm"
                      >
                        Salir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </form>
          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    </div>
  );
};
export default ReporteStockScreen;
