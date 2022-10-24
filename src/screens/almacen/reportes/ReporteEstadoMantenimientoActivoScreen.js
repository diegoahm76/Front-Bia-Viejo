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

const ReporteEstadoMantenimientoActivoScreen = () => {
  

  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selecOpciones, setSelecOpciones] = useState({
    tipoMantenimiento: "",
    estado: "",
    estadoMantenimiento: "",
    fechaSolicitud:"",
    codigoArticulo:"",
  });

  

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      tipoMantenimiento: data.tipoMantenimiento?.value,
      estado: data.estado?.value,
      estadoMantenimiento: data.estadoMantenimiento?.value,
      codigoArticulo: data.codigoArticulo,
    });
  };

  const opcionTipoMantenimiento = [
    { label: "Correctivo", value: "Correctivo" },
    { label: "Preventivo", value: "Preventivo" },
  ];

  const opcionEstado = [
    { label: "Bueno", value: "Bueno" },
    { label: "Malo", value: "Malo" },
    { label: "T.I", value: "Dfectuoso" },
  ];

  const opcionEstadoMantenimiento = [
    { label: "Completado", value: "Completado" },
    { label: "Programado", value: "Programado" },
    { label: "En proceso", value: "En proceso" },
  ];

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
    {
      headerName: "Fecha de mantenimiento",
      field: "Fecha de mantenimiento",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Tipo de mantenimiento",
      field: "Tipo de mantenimiento",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Estado de mantenimiento",
      field: "Estado de mantenimiento",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo del articulo": "12973",
      "Nombre": "Acer",
      "Marca": "Lenovo",
      "Serial": "jhe6jfk",
      "Fecha de mantenimiento": "24/12/2022",
      "Tipo de mantenimiento": "Correctivo",
      "Estado de mantenimiento": "Programado",
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
        <h3 className="mt-3 mb-0 text-center mb-6">
          Resporte de estado de mantenimiento de activo
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
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
                    Codigo del articulo<small className="text-danger">*</small>
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

          <div className="multisteps-form__content">
            <div className="mt-4 row">
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de mantenimiento
                  <div className="col-12 ">
                    <Controller
                      name="tipomantenimiento"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcionTipoMantenimiento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Estado del activo
                  <div className="col-12 ">
                    <Controller
                      name="estado del activo"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={opcionEstado}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Estado del mantenimiento
                  <div className="col-12 ">
                    <Controller
                      name="estado del mantenimiento"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={opcionEstadoMantenimiento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="multisteps-form__content">
            <div className="mt-4 row">

            <div className="col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de solicitud
                    <Controller
                      name="fechaSolicitud"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                          selected={selecOpciones.fechaSolicitud}
                          onChange={(date) => {
                            setSelecOpciones({
                              ...selecOpciones,
                              fechaSolicitud: date,
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

            <div className="col-4 col-md-4">
              <div class="form-check mt-4">
                <input class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label">Todas</label>
              </div>
            </div>

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
            </div>

            </div>
          </div>

          {selecOpciones.codigoArticulo ? (
            <div>

              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center mt-4">
                  <n>Reporte de estado de mantenimiento</n>
                </label>
              </div>

              <div className="mt-1 row">
                <div id="myGrid" className="ag-theme-alpine mt-4">
                  <div className="ag-theme-alpine" style={{ height: "400px" }}>
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
  );
};
export default ReporteEstadoMantenimientoActivoScreen;
