import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import Subtitle from "../../../components/Subtitle";
import DirecionResidenciaModal from "../../../components/DirecionResidenciaModal";

const ReporteDeEntradaScreen = () => {
  const [direccionModal, setDireccionModal] = useState(false)
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
      headerName: "Cantidad",
      field: "Cantidad",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor unitario",
      field: "Valor unitario",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Valor IVA",
      field: "Valor IVA",
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
      Marca: "Lenovo",
      Cantidad: "3",
      "Valor unitario": "2.700.000",
      "Valor IVA": "200.000",
      "Valor de compra": "8.700.000",
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
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row mt-3"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4 mb-2 ms-3 fw-light text-terciary">
              Reporte de Entrada de Almacen de activos fijos
            </h3>

            <Subtitle title="Consecutivo de entrada de activos" />

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary ms-2">Numero consecutivo</label>
                <input
                  name="consecutivo"
                  className="form-control border rounded-pill px-3 border border-terciary"
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

              <div className="col-12 col-md-3 ms-2">
                <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-4">
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
                      className="form-control border rounded-pill px-3 border border-terciary"
                      placeholderText="dd/mm/aaaa"
                      disabled
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-2 mt-2">
                
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
            {selecOpciones.consecutivo ? (
              <div>
                

                <div className="row">
                <Subtitle title="Tercero" mb="3" />
                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Tipo de documento </label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="C.C"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Numero de documento</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="1.243.675.654"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Nombre</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="Julian Castillo"
                      disabled
                    />
                  </div>
                </div>

                <div className="col-12 col-md-12">
                  <div className="mx-3 mt-3">
                    <label className="text-terciary text-terciary text-terciary"  htmlFor="ms-2">
                      Observaciones
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      type="text"
                      placeholder="Observaciones"
                      value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                      disabled
                      rows="5"
                      name="Acciones"
                    />
                  </div>
                </div>

                <div className="mt-3 row">
                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Origen</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="Compras"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 ms-2">
                    <label className="text-terciary ms-2">Bodega</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="Villavicencio"
                      disabled
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="d-flex mt-4 px-4 justify-content-end">
                    <div>
                      <label type="number"> cantidad de articulos |</label>
                    </div>
                    <div>
                      <label type="number" align="right">
                        3 |
                      </label>
                    </div>
                    <div>
                      <label type="number"> Valor total |</label>
                    </div>
                    <div>
                      <label type="number" align="right">
                        8.700.000 |
                      </label>
                    </div>
                  </div>
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

                <div className="d-flex flex-column align-items-start mt-6 ms-2">
                  <label>
                    ____________________________________________________
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
                    <label>Firma de quien solicita</label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <label>Nombre:</label>
                  </div>
                </div>

                <div className="mt-4 justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-2">
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
                </div>
                <div className="justify-content-end align-items-end">
                  <div className="row">
                    <div className="col-12 col-md-3 ms-2">
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
                            className="form-control border rounded-pill px-3  p-2  border border-terciary"
                            placeholderText="dd/mm/aaaa"
                          />
                        )}
                      />
                    </div>
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
                        onClick={setDireccionModal}
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
          {/* <DirecionResidenciaModal
            isModalActive = {direccionModal}
            setIsModalActive ={setDireccionModal}
            /> */}
        </div>
      </div>
    </div>
  );
};
export default ReporteDeEntradaScreen;
