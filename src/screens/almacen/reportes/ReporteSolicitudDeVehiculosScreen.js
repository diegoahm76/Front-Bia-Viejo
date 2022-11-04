import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import Subtitle from "../../../components/Subtitle";

const ReporteSolicitudDeVehiculosScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    fechaInicial: "",
    fechaFinal: "",
    estadoDeSolicitudes: "",
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
      dependencia: data.dependencia?.value,
      grupo: data.grupo?.value,
      fechaInicial: data.fechaInicial,
      fechaFinal: data.fechaFinal,
      estadoDeSolicitudes: data.estadoDeSolicitudes?.value,
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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mt-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Reporte de solicitudes de vehiculo
            </h3>

            <Subtitle title="Solicitante" mb="3" />

            <div className="row">
              <div className="col-12 col-md-3">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento
                </label>
                <div className="col-12 mt-3">
                  <Controller
                    name="tipoDocumento"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsTipoDocumento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3">
                <label className="text-terciary ms-2">Número de cedula</label>
                <input
                  name="numeroCedula"
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="numero cedula"
                  {...register("numeroCedula")}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="text-terciary ms-2">Nombre completo</label>
                <input
                  className="form-control border rounded-pill px-3 border border-terciary"
                  type="text"
                  placeholder="nombre completo"
                  value="Julian Castillo"
                  disabled
                />
              </div>
              <div className="col-12 col-md-3 mt-2">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
            </div>

            
            <Subtitle title="Ubicacion" mt="3" mb="3"/>

            <div className="row">
              <div className="col-12 col-md-3">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Dependencia{" "}
                </label>
                <div className="col-12 ">
                  <Controller
                    name="dependencia"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcionDependecia}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-12 col-md-3">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Grupo
                </label>
                <div className="col-12 ">
                  <Controller
                    name="grupo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcionGrupo}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <Subtitle title="Rango de fechas " mb="3" mt="3"/>
            <div className="row">
              <div className="col-12 col-md-3">
                <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
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
                      className="form-control border rounded-pill px-3  p-2 border border-terciary"
                      placeholderText="dd/mm/aaaa"
                      selected={selecOpciones.fechaInicial}
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

              <div className="col-12 col-md-3">
                <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
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
                      className="form-control border rounded-pill px-3  p-2 border border-terciary"
                      placeholderText="dd/mm/aaaa"
                      selected={selecOpciones.fechaFinal}
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
            </div>

            <div className="row mt-3">
              <div className="col-12 col-md-3">
                <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                  Estado de la solicitud
                </label>
                <div className="col-12 ">
                  <Controller
                    name="estadoDeSolicitudes"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcionEstado}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-4 col-md-3">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input border border-terciary"
                    type="checkbox"
                    value=""
                  />
                  <label className="text-terciary form-check-label">
                    Todas la solicitudes
                  </label>
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
            {(selecOpciones.tipoDocumento && selecOpciones.numeroCedula) ||
            (selecOpciones.dependencia && selecOpciones.grupo) ||
            (selecOpciones.fechaFinal && selecOpciones.fechaInicial) ||
            selecOpciones.estadoDeSolicitudes ? (
              <div>
                

                <div className="row">
                  <div id="myGrid" className="ag-theme-alpine mt-3">
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

                <div className="row">
                  <div className="col-12 col-md-3">
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

                <div className="justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3">
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
                            className="form-control border rounded-pill px-3  p-2 border border-terciary"
                            placeholderText="dd/mm/aaaa"
                          />
                        )}
                      />
                    </div>
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
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />
        </div>
      </div>
    </div>
  );
};
export default ReporteSolicitudDeVehiculosScreen;
