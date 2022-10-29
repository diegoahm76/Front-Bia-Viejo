import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const ReporteDeFuncionarioPorConsumoScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    codigoInicial: "",
    codigoFinal: "",
    fechaInicial: "",
    fechaFinal: "",
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
      tipoDocumento: data.tipoDocumento?.value,
      numeroCedula: data.numeroCedula,
      codigoInicial: data.codigoInicial,
      codigoFinal: data.codigoFinal,
    });
  };

  const optionsTipoDocumento = [
    { label: "C.C", value: "CC" },
    { label: "T.I", value: "TI" },
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
      headerName: "Consecutivo de salida",
      field: "Consecutivo de salida",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de despacho",
      field: "Fecha de despacho",
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
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      "Consecutivo de salida": "51912",
      "Fecha de despacho": "09/09/2022",
      Nombre: "Papel rexma",
      Cantidad: "4",
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
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de consumo por funcionario
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row">
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha de eleboracion
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
                      className="form-control border rounded-pill px-3  p-2"
                      placeholderText="dd/mm/aaaa"
                      disabled
                    />
                  )}
                />
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row">
                <label
                  className="form-control border rounded-pill px-3 mt-3 text-white"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                  }}
                >
                  <b>Funcionario</b>
                </label>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="mt-4 row">
                <div className="col-12 col-md-4 mt-1">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento <small className="text-danger">*</small>
                  </label>
                  <div className="col-12 ">
                    <Controller
                      name="tipoDocumento"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  {errors.tipoDocumento && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-4">
                  <label className="ms-2">
                    Número de cedula<small className="text-danger">*</small>
                  </label>
                  <input
                    name="numeroCedula"
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="numero cedula"
                    {...register("numeroCedula", { required: true })}
                  />
                  {errors.numeroCedula && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12 col-md-4">
                  <label className="ms-2">Nombre completo</label>
                  <input
                    name="nombrecompleto"
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Julian Castillo"
                    disabled
                    {...register("nombrecompleto")}
                  />
                  {errors.codigoArticulo && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
              </div>
            </div>

            <div className=" col-12 col-md-2  row">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaPersonalIsActive(true)}
                >
                  Buscar personal
                </button>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="mt-4 row">
                <div className="col-12 col-md-4">
                  <label className="ms-2">Dependencia</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Administrativa y finaciera"
                    disabled
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="ms-2">Grupo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Almacen"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row">
                <label
                  className="form-control border rounded-pill px-3 mt-3 text-white"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                  }}
                >
                  <b>Rango de codigos</b>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <label className="ms-2">Codigo inicial</label>
                <input
                  name="codigoInicial"
                  className="form-control border rounded-pill px-3"
                  type="text"
                  placeholder="nombre completo"
                  {...register("codigoInicial")}
                />
              </div>

              <div className="col-12 col-md-4">
                <label className="ms-2">Codigo final</label>
                <input
                  name="codigoFinal"
                  className="form-control border rounded-pill px-3"
                  type="text"
                  placeholder="nombre completo"
                  {...register("codigoFinal")}
                />
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row">
                <label
                  className="form-control border rounded-pill px-3 mt-3 text-white"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                  }}
                >
                  <b>Rango de fechas</b>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha inicial
                </label>
                <Controller
                  name="fechaInicial"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      dateFormat="dd/MM/yyyy"
                      className="form-control border rounded-pill px-3  p-2"
                      placeholderText="dd/mm/aaaa"
                      onChange={(date) => {
                        setSelecOpciones({
                          ...selecOpciones,
                          fechaInicial: date,
                        });
                        setStartDate(date);
                      }}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha final
                </label>
                <Controller
                  name="fechaFinal"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      dateFormat="dd/MM/yyyy"
                      className="form-control border rounded-pill px-3  p-2"
                      placeholderText="dd/mm/aaaa"
                      onChange={(date) => {
                        setSelecOpciones({
                          ...selecOpciones,
                          fechaFinal: date,
                        });
                        setEndDate(date);
                      }}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-2">
                <div className="d-grid gap-2 d-flex justify-content-end  mt-4">
                  <button
                    className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                    type="submit"
                    title="Send"
                    form="configForm"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            {(selecOpciones.tipoDocumento &&
              selecOpciones.numeroCedula &&
              selecOpciones.codigoInicial &&
              selecOpciones.codigoFinal) ||
            (selecOpciones.fechaInicial && selecOpciones.codigoFinal) ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label
                      className="form-control border rounded-pill px-3 mt-3 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #67b136, #39aad4)",
                      }}
                    >
                      <b>Reporte de consumo por funcionario</b>
                    </label>
                  </div>

                  <div className="multisteps-form__content">
                    <div className="mt-4 row">
                      <div className="col-12 col-md-4">
                        <label className="ms-2">Funcionario</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="Funcionario"
                          value="Julian Catillo"
                          disabled
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="ms-2">Dependencia</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="nombre completo"
                          value="Administrativa"
                          disabled
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="ms-2">Grupo</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="nombre completo"
                          value="Almacen"
                          disabled
                        />
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
                  <div className="mt-4 justify-content-end align-items-end">
                    <div className="row">
                      <div className="col-12 col-md-4">
                        <label className="ms-2">Nombre quien imprime</label>
                        <input
                          name="nombreQuienImprime"
                          className="form-control border rounded-pill px-3"
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
                      <div className="col-12 col-md-4">
                        <label htmlFor="exampleFormControlInput1 mt-4">
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
                              className="form-control border rounded-pill px-3  p-2"
                              placeholderText="dd/mm/aaaa"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-4 row">
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
              </div>
            ) : (
              ""
            )}
          </MarcaDeAgua1>
        </form>
        <BusquedaDePersonalModal
          isModalActive={busquedaPersonalIsActive}
          setIsModalActive={setBusquedaPersonalIsActive}
        />
      </div>
    </div>
  );
};
export default ReporteDeFuncionarioPorConsumoScreen;
