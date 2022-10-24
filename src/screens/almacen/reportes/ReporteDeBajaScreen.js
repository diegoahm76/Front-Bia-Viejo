import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const ReporteDeBajaScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    consecutivo: "",
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
      consecutivo: data.consecutivo,
    });
  };

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
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      Marca: "Lenovo",
      Serial: "1k3y4h",
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
        <h3 className="mt-3 mb-0 text-center mb-6">Reporte de bajas</h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    name="consecutivo"
                    className="form-control"
                    type="text"
                    placeholder="numero consecutivo"
                    {...register("consecutivo", { required: true })}
                  />
                  <label className="ms-2">Numero consecutivo</label>
                </div>
                {errors.consecutivo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

<<<<<<< HEAD
            <div className="col-12 col-md-4">
              <label htmlFor="exampleFormControlInput1 mt-4">
                Fecha de baja
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
                      disabled
                    />
                  )}
                />
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
=======
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha de baja
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
>>>>>>> main
              </div>
            </div>

            {selecOpciones.consecutivo ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label className="form-control ms-0 fw-bolder text-center mt-4">
                      <n>Reporte de baja</n>
                    </label>
                  </div>
                </div>
                <div className="input-group input-group-dynamic flex-column mt-3">
                  <label htmlFor="exampleFormControlInput1 ">
                    Observaciones
                  </label>
                  <textarea
                    className="multisteps-form__input form-control p-2 mw-100 w-auto"
                    type="text"
                    placeholder="Observaciones"
                    rows="5"
                    name="Observaciones"
                    value="eeLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas"
                    disabled
                  />
                </div>

                <div className="mt-4 row">
                  <div id="myGrid" className="ag-theme-alpine">
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

                <div className="d-flex flex-column justify-content-end align-items-start mt-5">
                  <label> _____________________________________________</label>
                  <div className="d-flex justify-content-center align-items-center">
                    <label>Firma del almacenista</label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <label>Nombre:</label>
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
<<<<<<< HEAD

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
=======
            ) : (
              ""
            )}
          </MarcaDeAgua1>
>>>>>>> main
        </form>
      </div>
    </div>
  );
};
export default ReporteDeBajaScreen;
