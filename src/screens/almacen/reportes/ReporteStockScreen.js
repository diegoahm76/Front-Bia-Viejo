import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { da } from "date-fns/locale";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de stock de articulo
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Articulo</n>
                </label>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      name="codigoArticulo"
                      className="multisteps-form__input form-control"
                      type="text"
                      placeholder="Codigo de articulo"
                      {...register("codigoArticulo", { required: true })}
                    />
                    <label className="ms-2">
                      Codigo del articulo
                      <small className="text-danger">*</small>
                    </label>
                  </div>
                  {errors.codigoArticulo && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      name="nombreArticulo"
                      className="form-control"
                      type="text"
                      placeholder="Nombre del articulo"
                      value="Computador"
                      disabled
                    />
                    <label className="ms-2">Nombre del articulo </label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                    <button
                      className="btn bg-gradient-primary mb-0 text-capitalize"
                      type="button"
                      title="Send"
                      form="configForm"
                      onClick={() => setBusquedaArticuloIsActive(true)}
                    >
                      Buscar articulo
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Buscar
                </button>
              </div>
            </div>
            {selecOpciones.codigoArticulo ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label className="form-control ms-0 fw-bolder text-center mt-4">
                      <n>Reporte de Stock de articulos</n>
                    </label>
                  </div>
                  <div className="mt-1 row">
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

                  <div className="d-flex flex-column justify-content-end align-items-end">
                    <div className="row">
                      <div className="col-12 col-md-12">
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            name="nombreQuienImprime"
                            className="form-control"
                            type="text"
                            placeholder="Nombre del articulo"
                            value="Julian Castillo"
                            disabled
                          />
                          <label className="ms-2">Nombre quien imprime</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-md-12">
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            name="fechaDeImpresion"
                            className="form-control"
                            type="text"
                            placeholder="fecha de impresion"
                            value="05/10/2022"
                            disabled
                          />
                          <label className="ms-2">Fecha de impresion</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className=" d-grid gap-2 d-flex justify-content-end  mt-3">
                      <button
                        className="btn bg-gradient-primary mb-0"
                        type="button"
                        title="Send"
                        form="configForm"
                      >
                        Imprimir
                      </button>
                      <button
                        className="btn bg-gradient-danger mb-0"
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
          </MarcaDeAgua1>
        </form>
        <BusquedaArticuloModal
          isModalActive={busquedaArticuloIsActive}
          setIsModalActive={setBusquedaArticuloIsActive}
        />
      </div>
    </div>
  );
};
export default ReporteStockScreen;
