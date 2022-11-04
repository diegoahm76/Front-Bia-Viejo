import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";

const ReporteHistoricoDeActivoScreen = () => {
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const [mostrarTabla, setMostrarTabla] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setMostrarTabla(true);
  };

  let gridApi;

  const columnDefs = [
    {
      headerName: "Fecha",
      field: "Fecha",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Tipo de movimiento",
      field: "Tipo de movimiento",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Consecutivo",
      field: "Consecutivo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Ubicacion",
      field: "Ubicacion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Responsable",
      field: "Responsable",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      Fecha: "05/10/2022",
      "Tipo de movimiento": "Entrada",
      Consecutivo: "12346",
      Ubicacion: "Produccion",
      Responsable: "julian castillo",
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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4 mb-2 ms-3 fw-light text-terciary">
              Historico de un articulo
            </h3>
            <Subtitle title="Articulo" mb="3" />
            <div className="row">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">
                  Codigo del articulo <small className="text-danger">*</small>
                </label>
                <input
                  name="codigoArticulo"
                  className="form-control border rounded-pill px-3  border border-terciary"
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

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">Nombre del articulo</label>
                <input
                  name="nombreArticulo"
                  className="form-control border rounded-pill px-3  border border-terciary"
                  type="text"
                  placeholder="Nombre del articulo"
                  value="Computador"
                  disabled
                />
              </div>

              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
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
              </div>

              <div className="col-12 col-md-2 mt-2">
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

            {mostrarTabla && (
              <div>
                
                <div className="row">
                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Codigo del articulo</label>
                    <input
                      name="Codigo"
                      className="form-control border rounded-pill px-3  border border-terciary"
                      type="text"
                      placeholder="Codigo del articulo"
                      value="12345"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Nombre del responsable</label>
                    <input
                      name="nombreResponsable"
                      className="form-control border rounded-pill px-3  border border-terciary"
                      type="text"
                      placeholder="Nombre del responsable"
                      value="Julian Castillo"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">ID</label>
                    <input
                      name="ID"
                      className="form-control border rounded-pill px-3  border border-terciary"
                      type="text"
                      placeholder="ID"
                      value="001912"
                      disabled
                    />
                  </div>
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

                <div className="mt-4 justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-1">
                      <label className="text-terciary ms-2">Nombre quien imprime</label>
                      <input
                        name="nombreQuienImprime"
                        className="form-control border rounded-pill px-3  border border-terciary"
                        type="text"
                        placeholder="Nombre del articulo"
                        value="Julian Castillo"
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-2">
                      <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
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
                            className="form-control border rounded-pill px-3  p-2  border border-terciary"
                            placeholderText="dd/mm/aaaa"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-3 ms-2 row">
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
                      onclik="${}"
                    >
                      Salir
                    </button>
                  </div>
                </div>
              </div>
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

export default ReporteHistoricoDeActivoScreen;
