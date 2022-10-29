import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import DatePicker, { registerLocale } from "react-datepicker";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const ReporteDeEstadoDeActivosScreen = () => {
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
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
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
                    <div className="col-12 mt-3">
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
                    <div className="col-12 mt-3">
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
                  <label className="ms-2">Valor inicial</label>
                  <input
                    name="valorInicial"
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Valor inicial"
                    {...register("valorInicial")}
                  />
                </div>

                <div className="col-12 col-md-4">
                  <label className="ms-2">Valor final</label>
                  <input
                    name="ValorFinal"
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="Valor final"
                    {...register("valorFinal")}
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
                {selecOpciones.estado ||
                selecOpciones.bodega ||
                (selecOpciones.valorInicial && selecOpciones.valorFinal) ? (
                  <div>
                    <div className="row">
                      <label
                        className="form-control border rounded-pill px-3 mt-3 text-white"
                        style={{
                          backgroundImage:
                            "linear-gradient(45deg, #67b136, #39aad4)",
                        }}
                      >
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
