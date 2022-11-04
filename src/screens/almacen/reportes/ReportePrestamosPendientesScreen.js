import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";

const ReportePrestamosPendientesScreen = () => {
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [selecOpciones, setSelecOpciones] = useState({
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
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
      dependencia: data.dependencia?.value,
      grupo: data.grupo?.value,
      codigoArticulo: data.codigoArticulo,
      fechaInicial: data.fechaInicial,
      fechaFinal: data.fechaFinal,
    });
  };

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
      headerName: "ID",
      field: "ID",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Maraca",
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
      headerName: "Fecha de prestamo",
      field: "Fecha de prestamo",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha acordada de devolucion",
      field: "Fecha acordada de devolucion",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Dia de retraso",
      field: "Dia de retraso",
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
      headerName: "Nombre del responsable",
      field: "Nombre del responsable",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      ID: "12346",
      Marca: "Lenovo",
      Serial: "72h634",
      "Fecha de prestamo": "10/10/2022",
      "Fecha acordada de devolucion": "13/10/2022",
      "Dia de retraso": "3",
      Grupo: "Almacen",
      "Nombre del responsable": "Julian Catillo",
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
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4 mb-2 ms-3 fw-light text-terciary">
              Reporte prestamos pendientes por devolucion
            </h3>

            <Subtitle mb="3" title="Rango de fechas" />

            <div className="row">
            
              <div className="col-12 col-md-3 ms-2">
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

              <div className="col-12 col-md-3 ms-2">
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

            <Subtitle mb="3" mt="3" title="Articulo" />

            <div className="row">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">Codigo del articulo </label>
                <input
                  name="codigoArticulo"
                  className="form-control border rounded-pill p-2 border border-terciary"
                  type="text"
                  placeholder="Codigo de articulo"
                  {...register("codigoArticulo")}
                />
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">Nombre del articulo </label>
                <input
                  name="nombreArticulo"
                  className="form-control border rounded-pill p-2 border border-terciary"
                  type="text"
                  placeholder="Nombre del articulo"
                  value="Computador"
                  disabled
                />
              </div>

              <div className="col-12 col-md-3 ms-2 mt-2">
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
            
            <Subtitle mb="3" title="Ubicacion" />
            
            <div className="row">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary form-floating input-group input-group-dynamic ">
                  Dependencia
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

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary form-floating input-group input-group-dynamic ">
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

              <div className="col-12 col-md-3 ms-2">
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
            {(selecOpciones.fechaInicial && selecOpciones.fechaFinal) ||
            (selecOpciones.dependencia && selecOpciones.grupo) ||
            selecOpciones.codigoArticulo ? (
              <div>
                <div className=" row">
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

                <div className="row">
                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-1">Nombre quien imprime</label>
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
                    <label className=" text-terciary" htmlFor="exampleFormControlInput1 mt-4">
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
export default ReportePrestamosPendientesScreen;
