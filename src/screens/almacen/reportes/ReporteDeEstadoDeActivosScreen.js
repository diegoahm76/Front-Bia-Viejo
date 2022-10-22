import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const ReporteDeEstadoDeActivosScreen = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const [selecOpciones, setSelecOpciones] = useState({
    estado: "",
    bodega: "",
    valorInicial: "",
    valorFinal: "",
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
      estado: data.estado?.value,
      bodega: data.bodega?.value,
      valorInicial: data.valorInicial,
      valorFinal: data.valorFinal,
    });
  };

  const optionsEstado = [
    { label: "Bueno", value: "Bueno" },
    { label: "Malo", value: "Malo" },
    { label: "Defectuoso", value: "Defectuoso" },
    { label: "Todo", value: "Todo" },
  ];

  const optionsBodega = [
    { label: "Villavicencio", value: "Villavicencio" },
    { label: "Macarenia", value: "Macarenia" },
    { label: "Todo", value: "Todo" },
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
      headerName: "Estado",
      field: "Estado",
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
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      ID: "12346",
      Marca: "Lenovo",
      Serial: "72h634",
      Estado: "Bueno",
      Bodega: "Villavicencio",
      "Valor de compra": "2.700.000",
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
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de estado de activo{" "}
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="mt-4 row">
                <div className="col-12 col-md-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Estado
                    <div className="col-12 ">
                      <Controller
                        name="estado"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={optionsEstado}
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
                            options={optionsBodega}
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
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      name="valorInicial"
                      className="form-control"
                      type="text"
                      placeholder="Vaalor inicial"
                      {...register("valorInicial")}
                    />
                    <label className="ms-2">Valor inicial</label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      name="ValorFinal"
                      className="form-control"
                      type="text"
                      placeholder="Vaalor final"
                      {...register("valorFinal")}
                    />
                    <label className="ms-2">Valor final</label>
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
                {selecOpciones.estado ||
                selecOpciones.bodega ||
                (selecOpciones.valorInicial && selecOpciones.valorFinal) ? (
                  <div>
                    <div className="row">
                      <label className="form-control ms-0 fw-bolder text-center mt-4">
                        <n>Reporte de estado de activo</n>
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
                ) : (
                  ""
                )}
              </div>
            </div>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};
export default ReporteDeEstadoDeActivosScreen;
