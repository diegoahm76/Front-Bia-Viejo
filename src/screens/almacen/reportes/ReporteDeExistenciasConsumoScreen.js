import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import Subtitle from "../../../components/Subtitle";

const ReporteDeExistenciasConsumoScreen = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    bodega: "",
    codigoInicial: "",
    codigoFinal: "",
    fechaCorte: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setMostrarTabla(true);
    setSelecOpciones({
      ...selecOpciones,
      bodega: data.bodega?.value,
      codigoInicial: data.codigoInicial,
      codigoFinal: data.codigoFinal,
    });
  };

  const optionsBodega = [
    { label: "Villavicencio", value: "Villavicencio" },
    { label: "La Macarenia", value: "La Macarenia" },
    { label: "Puerto lopez", value: "Puerto lopez" },
  ];

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
      headerName: "Cantidad",
      field: "Cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor unitario",
      field: "Valor unitario",
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
      headerName: "Bodega",
      field: "Bodega",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Papel rexma",
      Cantidad: "5",
      "Valor unitario": "10000",
      "Valor total": "50000",
      Bodega: "Villavicencio",
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
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3  mb-4 ms-3 fw-light text-terciary">
              Existencias de consumo
            </h3>

            <Subtitle title="Paramentros de busqueda" />

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">
                  Codigo inicial<small className="text-danger">*</small>
                </label>
                <input
                  className="border-terciary form-control border rounded-pill px-3"
                  name="codigoInicial"
                  
                  type="text"
                  placeholder="Codigo Inicial"
                  {...register("codigoInicial", { required: true })}
                />
                {errors.codigoInicial && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">
                  Codigo final<small className="text-danger">*</small>
                </label>
                <input
                  className="border-terciary form-control border rounded-pill px-3"
                  name="codigoFinal"
                  
                  type="text"
                  placeholder="Codigo final"
                  {...register("codigoFinal", { required: true })}
                />

                {errors.codigoFinal && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>

            <div className="mt-4 row">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
                  Fecha inicial
                </label>
                <Controller
                  name="fechaCorte"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      className="form-control border rounded-pill px-3 border-terciary"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/aaaa"
                      onChange={(date) => {
                        setSelecOpciones({
                          ...selecOpciones,
                          fechaCorte: date,
                        });
                        setStartDate(date);
                      }}
                      selectsStart
                      startDate={startDate}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-3 ms-2 ">
                <label className=" text-terciary form-floating input-group input-group-dynamic ms-2">
                  Bodega <small className="text-danger">*</small>
                </label>
                <div className="col-12 ">
                  <Controller
                    name="bodega"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsBodega}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                {errors.bodega && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
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

            {selecOpciones.bodega &&
            selecOpciones.codigoInicial &&
            selecOpciones.codigoFinal ? (
              <div>
                
                  
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
                        <label className="text-terciary ms-2">Nombre quien imprime</label>
                        <input
                          className="border-terciary form-control border rounded-pill px-3"
                          name="nombreQuienImprime"
                          
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
                              className="form-control border rounded-pill px-3  p-2 border-terciary"
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
export default ReporteDeExistenciasConsumoScreen;
