import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import Subtitle from "../../../components/Subtitle";

const ReporteDeSolicitudDePrestamoScreen = () => {
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
      headerName: "Cantidad",
      field: "Cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Fecha de entrega",
      field: "Fecha de entrega",
      minWidth: 150,
      maxWidth: 200,
    },
  ];

  const rowData = [
    {
      "Codigo de articulo": "12345",
      Nombre: "Computador",
      Cantidad: "3",
      "Fecha de entrega": "12/11/2022",
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
              Reporte de solicitud de prestamo de activo
            </h3>

            <Subtitle title="Consecutivo de solicitud de prestamo" />

            <div className="row">
              <div className="d-flex align-items-end gap-4  ms-2">
                <div className="col-12 col-md-3">
                  <label className="ms-2">Numero consecutivo</label>
                  <input
                    name="consecutivo"
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="numero consecutivo"
                    {...register("consecutivo", { required: true })}
                  />

                  {errors.consecutivo && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de solicitud
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
                        disabled
                      />
                    )}
                  />
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn bg-gradient-primary text-capitalize rounded-pill mb-0"
                  >
                    Buscar
                  </button>
                </div>
              </div>
            </div>

            {selecOpciones.consecutivo ? (
              <div>
                <Subtitle title="Datos de la solicitud de prestamo" mt="3" />

                <div className="row">
                  <div className="d-flex align-items-end gap-4 mt-3 ms-3">
                    <div className="col-12 col-md-3">
                      <label className="ms-2">Dependencia</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Administrativa y finaciera"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="ms-2">Grupo</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Almacen"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <Subtitle title="Coordinador" mt="3" />

                <div className="row mt-3">
                  <div className="d-flex align-items-end gap-4  ms-2">
                    <div className="col-12 col-md-3">
                      <label className="ms-2">Tipo de documento </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="C.C"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="ms-2">Numero de documento</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="1.243.675.654"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="ms-2">Nombre</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Julian Castillo"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <Subtitle title="Solicitante" mt="3" />

                <div className="row mt-3">
                  <div className="d-flex align-items-end gap-4  ms-2">
                    <div className="col-12 col-md-3">
                      <label className="ms-2">Tipo de documento </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="C.C"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="ms-2">Numero de documento</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="1.745.847.444"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-3">
                      <label className="ms-2">Nombre</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Jusus Cruz"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-end gap-4  ms-3">
                  <div className="col-12 col-md-12 mt-3">
                    <label htmlFor="ms-2">Observaciones</label>
                    <textarea
                      className="form-control border rounded-pill px-4"
                      type="text"
                      placeholder="Observaciones"
                      value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas"
                      disabled
                      rows="5"
                      name="Acciones"
                    />
                  </div>
                </div>

                <div className="row mt-4">
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
                <div className="d-flex flex-column align-items-start mt-6 ms-3">
                  <label>
                    ____________________________________________________
                  </label>
                  <div className="d-flex justify-content-center align-items-center ">
                    <label>Firma de quien solicita</label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <label>Nombre:</label>
                  </div>
                </div>

                <div className="mt-4 justify-content-end align-items-end ms-3">
                  <div className="row">
                    <div className="col-12 col-md-3">
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
                <div className="justify-content-end align-items-end ms-3">
                  <div className="row">
                    <div className="col-12 col-md-3">
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
        </div>
      </div>
    </div>
  );
};
export default ReporteDeSolicitudDePrestamoScreen;
