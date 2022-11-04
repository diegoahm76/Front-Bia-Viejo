import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";

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
    fechaSolicitud: "",
    codigoArticulo: "",
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
      Nombre: "Acer",
      Marca: "Lenovo",
      Serial: "jhe6jfk",
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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Resporte de estado de mantenimiento de activo
            </h3>

            <Subtitle title="Articulo" mb="3" />

            <div className="row">
              <div className="col-12 col-md-3 ms-2">
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

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">
                  Nombre del articulo{" "}
                </label>
                <input
                  name="nombreArticulo"
                  className="form-control border rounded-pill px-3 border border-terciary"
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
            </div>

            <div className="mt-4 row">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Tipo de mantenimiento
                </label>
                <div className="col-12 mt-3">
                  <Controller
                    name="tipomantenimiento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            tipoMantenimiento: e.value,
                          })
                        }
                        options={opcionTipoMantenimiento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3 ms-3">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Estado del activo
                </label>
                <div className="col-12 mt-3">
                  <Controller
                    name="estado del activo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            estado: e.value,
                          })
                        }
                        options={opcionEstado}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Estado del mantenimiento
                </label>
                <div className="col-12 mt-3 ">
                  <Controller
                    name="estado del mantenimiento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            estadoMantenimiento: e.value,
                          })
                        }
                        options={opcionEstadoMantenimiento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2 ">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-4"
                >
                  Fecha de solicitud
                </label>
                <Controller
                  name="fechaSolicitud"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      locale="es"
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setStartDate(date)}
                      className="form-control border rounded-pill px-3  p-2 border border-terciary"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </div>

              <div className="col-4 col-md-3 mt-3 ms-3">
                <div className="form-check mt-4 ">
                  <input
                    className="form-check-input border border-terciary"
                    type="checkbox"
                    value=""
                  />
                  <label className="text-terciary form-check-label">
                    Todas
                  </label>
                </div>
              </div>

              <div className="col-12 col-md-2 mt-2 ms-3">
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

            {selecOpciones.tipoMantenimiento &&
            selecOpciones.estado &&
            selecOpciones.estadoMantenimiento ? (
              <div>
                <div className="mt-3 row">
                  <div i d="myGrid" className="ag-theme-alpine mt-4">
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
                  <div className="col-12 col-md-3 ms-1">
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
                          className="form-control border rounded-pill px-3  p-2 border border-terciary"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
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
          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    </div>
  );
};
export default ReporteEstadoMantenimientoActivoScreen;
