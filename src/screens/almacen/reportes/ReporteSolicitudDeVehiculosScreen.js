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

const ReporteSolicitudDeVehiculosScreen = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    dependencia: "",
    grupo: "",
    estadoDeSolicitudes: "",
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
      tipoDocumento: data.tipoDocumento.value,
      dependencia: data.dependencia.value,
      grupo: data.grupo.value,
      estadoDeSolicitudes: data.estadoDeSolicitudes.value,
    });
  };

  const optionsTipoDocumento = [
    { label: "C.C", value: "CC" },
    { label: "T.I", value: "TI" },
  ];

  const opcionDependecia = [
    {
      label: "Administrativa y finaciera",
      value: "Administrativa y finaciera",
    },
    { label: "Recaudo", value: "Recaudo" },
    { label: "Vivero", value: "Vivero" },
  ];

  const opcionGrupo = [
    { label: "Almacen", value: "Almacen" },
    { label: "Contaduria", value: "Contaduria" },
    { label: "Calidad", value: "Calidad" },
  ];

  const opcionEstado = [
    { label: "En cola de espera", value: "En cola de espera" },
    { label: "Asigando no autorizado", value: "Asigando no autorizado" },
    { label: "Asigando y autorizado", value: "Asigando y autorizado" },
    { label: "Cancelado", value: "Cancelado" },
    { label: "Rechazado", value: "Rechazado" },
  ];

  let gridApi;

  const columnDefs = [
    {
      headerName: "Consecutivo",
      field: "Consecutivo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Solicitante",
      field: "Solicitante",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Dependencia",
      field: "Dependencia",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Grupo",
      field: "Grupo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de solicitud",
      field: "Fecha de solicitud",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Destino",
      field: "Destino",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Estado",
      field: "Estado",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      Consecutivo: "12345",
      Solicitante: "Julian castillo",
      Dependencia: "Administrativa",
      Grupo: "Almacen",
      "Fecha de solicitud": "07/10/2022",
      Destino: "Granada",
      Estado: "Asigando y autorizado",
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
          Reporte de solicitudes de vehiculo
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Solicitante</n>
              </label>
            </div>
          </div>

          <div className="multisteps-form__content">
            <div className="mt-4 row">
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento
                  <div className="col-12 ">
                    <Controller
                      name="tipoConsulta"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) =>
                            setSelecOpciones({
                              ...selecOpciones,
                              tipoDocumento: e.value,
                            })
                          }
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic ">
                  <input
                    name="numeroCedula"
                    className="form-control"
                    type="text"
                    placeholder="numero cedula"
                  />
                  <label className="ms-2">Número de cedula</label>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="nombre completo"
                    value="Julian Castillo"
                    disabled
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
              <button
                className="btn bg-gradient-primary mb-0 text-capitalize"
                type="button"
                title="Send"
                form="configForm"
              >
                Buscar personal
              </button>
            </div>
          </div>

          <div className="mt-4 row">
            <div className="col-12 col-md-4">
              <label className="form-floating input-group input-group-dynamic ms-2">
                Dependencia
                <div className="col-12 ">
                  <Controller
                    name="dependencia"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            dependencia: e.value,
                          })
                        }
                        options={opcionDependecia}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </label>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-floating input-group input-group-dynamic ms-2">
                Grupo
                <div className="col-12 ">
                  <Controller
                    name="grupo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            grupo: e.value,
                          })
                        }
                        options={opcionGrupo}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="mt-4 row">
            <div className="col-12 col-md-4">
              <label htmlFor="exampleFormControlInput1 mt-4">
                Fecha inicial
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
                      className="multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </label>
            </div>

            <div className="col-12 col-md-4">
              <label htmlFor="exampleFormControlInput1 mt-4">
                Fecha final
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
                      className="multisteps-form__input form-control p-2"
                      placeholderText="dd/mm/aaaa"
                    />
                  )}
                />
              </label>
            </div>
          </div>

          <div className="mt-4 row">
            <div className="col-12 col-md-4">
              <label className="form-floating input-group input-group-dynamic ms-2">
                Estado de la solicitud
                <div className="col-12 ">
                  <Controller
                    name="estado de solicitud"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) =>
                          setSelecOpciones({
                            ...selecOpciones,
                            estadoDeSolicitudes: e.value,
                          })
                        }
                        options={opcionEstado}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </label>
            </div>

            <div className="col-4 col-md-5">
              <div class="form-check mt-4">
                <input class="form-check-input" type="checkbox" value="" />
                <label class="form-check-label">Todas la solicitudes </label>
              </div>
            </div>

            <div className="col-12 col-md-3">
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
          {mostrarTabla ||
          (selecOpciones.tipoDocumento &&
            selecOpciones.dependencia &&
            selecOpciones.grupo &&
            selecOpciones.estadoDeSolicitudes) ? (
            <div>

              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center mt-4">
                  <n>Reporte de solicitudes de vehiculo</n>
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

              <div className="row">
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
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};
export default ReporteSolicitudDeVehiculosScreen;
