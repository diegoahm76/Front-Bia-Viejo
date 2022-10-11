import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";

const ReporteDeInventarioScreen = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    ubicacion: "",
    bodega: "",
    tipoDeEntrada: "",
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
    });
  };

  const opcionUbicacion = [
    { label: "Produccion", value: "Produccion" },
    { label: "Almacen", value: "Almacen" },
    { label: "Compañia", value: "Compañia" },
  ];

  const opcionBodega = [
    { label: "Villavicencio", value: "Villavicencio" },
    { label: "Macarenia", value: "Macarenia" },
    { label: "todo", value: "todo" },
  ];

  const opcionTipoDeEntrada = [
    { label: "Compra", value: "Compra" },
    { label: "Convenio", value: "Convenio" },
    { label: "Comodato", value: "Comodato" },
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
      headerName: "Fecha de entrada",
      field: "Fecha de entrada",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Bodega",
      field: "Bodega",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor de compra",
      field: "Valor de compra",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Responsable",
      field: "Responsable",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Tipo de entrada",
      field: "Tipo de entrada",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Grupo",
      field: "Grupo",
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
      "Fecha de entrada": "10/10/2022",
      Bodega: "Villavicencio",
      "Valor de compra": "1.120.000",
      Responsable: "Julian Castillo",
      "Tipo de entrada": "Compra",
      Grupo: "Bioticos",
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
        <h3 className="mt-3 mb-0 text-center mb-6">Reporte de inventario </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="mt-4 row">
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Ubicacion
                  <div className="col-12 ">
                    <Controller
                      name="ubicacion"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) =>
                            setSelecOpciones({
                              ...selecOpciones,
                              ubicacion: e.value,
                            })
                          }
                          options={opcionUbicacion}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Bodega
                  <div className="col-12 ">
                    <Controller
                      name="bodega"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) =>
                            setSelecOpciones({
                              ...selecOpciones,
                              bodega: e.value,
                            })
                          }
                          options={opcionBodega}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de entrada
                  <div className="col-12 ">
                    <Controller
                      name="tipodeentrada"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          onChange={(e) =>
                            setSelecOpciones({
                              ...selecOpciones,
                              tipoDeEntrada: e.value,
                            })
                          }
                          options={opcionTipoDeEntrada}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="multisteps-form__content">
                <div className="row mt-4">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Rango de codigos</n>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                    />
                    <label className="ms-2">Codigo inicial</label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                    />
                    <label className="ms-2">Codigo final</label>
                  </div>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="row mt-4">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Rango de valores</n>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                    />
                    <label className="ms-2">Valor inicial</label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                    />
                    <label className="ms-2">Valor final</label>
                  </div>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="mt-4 row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Rango de fechas</n>
                  </label>
                </div>
              </div>

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

              <div className="row">
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

              {selecOpciones.ubicacion &&
                selecOpciones.bodega &&
                selecOpciones.tipoDeEntrada ||
              mostrarTabla ? (
                <div>
                  <div className="multisteps-form__content">
                    <div className="row">
                      <label className="form-control ms-0 fw-bolder text-center mt-4">
                        <n>Reporte de inventario</n>
                      </label>
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
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ReporteDeInventarioScreen;
