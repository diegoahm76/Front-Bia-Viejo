import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";
import Subtitle from "../../../components/Subtitle";

const ReporteDeBajaScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    consecutivo: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      consecutivo: data.consecutivo,
    });
  };

  let gridApi;

  const columnDefs = [
    {
      headerName: "Codigo de articulo",
      field: "Codigo de articulo",
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
      headerName: "Marca",
      field: "Marca",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Serial",
      field: "Serial",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      Marca: "Lenovo",
      Serial: "1k3y4h",
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
              Reporte de bajas
            </h3>

            <Subtitle title="Consecutivo de baja" />

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">Numero consecutivo</label>
                <input
                  name="consecutivo"
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="numero consecutivo"
                  {...register("consecutivo", { required: true })}
                />
                {errors.consecutivo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-4"
                >
                  Fecha de baja
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
                      className="form-control border rounded-pill px-3 border border-terciary  p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-3 mt-2">
                <button
                  type="submit"
                  className="btn bg-gradient-primary text-capitalize rounded-pill mt-4"
                >
                  Buscar
                </button>
              </div>
            </div>

            {selecOpciones.consecutivo ? (
              <div>
                <div className="row mt-3">
                  <Subtitle title="Reporte  de baja " mb="3" />

                  <div className="col-12 col-md-12">
                    <div className="mx-3">
                      <label className="text-terciary" htmlFor="ms-2">
                        Observaciones
                      </label>
                      <textarea
                        className="form-control border rounded-pill px-4 border border-terciary"
                        type="text"
                        placeholder="Observaciones"
                        value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                        disabled
                        rows="5"
                        name="Acciones"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 row">
                  <div id="myGrid" className="ag-theme-alpine">
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

                <div className="d-flex flex-column align-items-start mt-6 ms-2">
                  <label>
                    ____________________________________________________
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
                    <label>Firma de quien solicita</label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <label>Nombre:</label>
                  </div>
                </div>

                <div className="mt-4 justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-2">
                      <label className="text-terciary ms-2">
                        Nombre quien imprime
                      </label>
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
                </div>
                <div className="justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-2">
                      <label
                        className="text-terciary"
                        htmlFor="exampleFormControlInput1 mt-4"
                      >
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
                            className="form-control border rounded-pill px-3 border border-terciary  p-2"
                            placeholderText="dd/mm/aaaa"
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
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
        </div>
      </div>
    </div>
  );
};
export default ReporteDeBajaScreen;
