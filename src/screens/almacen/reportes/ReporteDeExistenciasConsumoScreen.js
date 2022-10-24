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
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Existencias de consumo</h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row mt-4">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Rango de codigos</n>
                </label>
              </div>
            </div>

<<<<<<< HEAD
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  name="codigoFinal"
                  className="form-control"
                  type="text"
                  placeholder="Codigo final"
                  {...register("codigoFinal", { required: true })}
                />
                <label className="ms-2">
                  Codigo final<small className="text-danger">*</small>
                </label>
              </div>
              {errors.codigofinal && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
          </div>

          <div className="mt-4 row">
          <div className="col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de corte
                    <Controller
                      name="fechaCorte"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                          selected={selecOpciones.fechaCorte}
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
=======
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    name="codigoiniciaL"
                    className="form-control"
                    type="text"
                    placeholder="Codigo Inicial"
                    {...register("codigoInicial", { required: true })}
                  />
                  <label className="ms-2">
                    Codigo inicial<small className="text-danger">*</small>
>>>>>>> main
                  </label>
                </div>
                {errors.codigoinicial && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    name="codigoFinal"
                    className="form-control"
                    type="text"
                    placeholder="Codigo final"
                    {...register("codigoFinal", { required: true })}
                  />
                  <label className="ms-2">
                    Codigo final<small className="text-danger">*</small>
                  </label>
                </div>
                {errors.codigofinal && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>

            <div className="mt-4 row">
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha inicial
                  <Controller
                    name="fechaCorte"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        className="multisteps-form__input form-control p-2"
                        placeholderText="dd/mm/aaaa"
                        selected={startDate}
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
                </label>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Bodega <small className="text-danger">*</small>
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
                </label>
              </div>

<<<<<<< HEAD
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

                {/* <div className="row">
                  <div class=" d-grid gap-2 d-flex justify-content-end  mt-3">
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
                </div> */}
=======
              <div className="col-12 col-md-4">
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
>>>>>>> main
              </div>
            </div>

            {selecOpciones.bodega &&
            selecOpciones.codigoInicial &&
            selecOpciones.codigoFinal &&
            selecOpciones.fechaCorte ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label className="form-control ms-0 fw-bolder text-center mt-4">
                      <n>Reporte de consumo por funcionario</n>
                    </label>
                  </div>

                  <div className="multisteps-form__content">
                    <div className="mt-4 row">
                      <div className="col-12 col-md-4">
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Funcionario"
                            value="Julian Catillo"
                            disabled
                          />
                          <label className="ms-2">Funcionario</label>
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="nombre completo"
                            value="Administrativa"
                            disabled
                          />
                          <label className="ms-2">Dependencia</label>
                        </div>
                      </div>

                      <div className="col-12 col-md-4">
                        <div className="form-floating input-group input-group-dynamic">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="nombre completo"
                            value="Almacen"
                            disabled
                          />
                          <label className="ms-2">Grupo</label>
                        </div>
                      </div>
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
      </div>
    </div>
  );
};
export default ReporteDeExistenciasConsumoScreen;
