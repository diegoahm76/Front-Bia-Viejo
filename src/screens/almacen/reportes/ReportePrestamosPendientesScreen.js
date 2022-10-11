import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";

const ReportePrestamosPendientesScreen = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    dependencia: "",
    grupo: "",
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
      dependencia: data.dependencia.value,
      grupo: data.grupo.value,
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

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte prestamos pendientes por devolucion
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="row">
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

          <div className="multisteps-form__content">
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Tipo de articulo</n>
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
                  />
                  <label className="ms-2">Codigo del articulo </label>
                </div>
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
          {(selecOpciones.dependencia && selecOpciones.grupo) ||
          mostrarTabla ? (
            <div>

              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center mt-4">
                  <n>Reporte prestamos pendientes por devolucion</n>
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
export default ReportePrestamosPendientesScreen;
