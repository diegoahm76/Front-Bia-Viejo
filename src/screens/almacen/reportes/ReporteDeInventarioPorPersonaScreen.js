import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import Subtitle from "../../../components/Subtitle";

import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const ReporteDeInventarioPorPersonaScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);
  const [selecOpciones, setSelecOpciones] = useState({
    tipoDocumento: "",
    numeroCedula: "",
    dependencia: "",
    grupo: "",
    codigoArticulo: "",
    nombreArticulo: "",
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
      tipoDocumento: data.tipoDocumento?.value,
      grupo: data.grupo?.value,
      numeroCedula: data.numeroCedula,
      codigoArticulo: data.codigoArticulo,
      nombreArticulo: data.nombreArticulo,
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
    {
      headerName: "Fecha de entrada",
      field: "Fecha de entrada",
      minWidth: 150,
      maxWidth: 200,
    },
    {
      headerName: "Consecutivo de asignacion o prestamo",
      field: "Consecutivo de asignacion o prestamo",
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
      "Fecha de entrada": "10/10/2022",
      "Consecutivo de asignacion o prestamo": "Villavicencio",
      "Valor de compra": "1.120.000",
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
      <div className="col-lg-12 col-md-12col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Reporte de inventario por persona o grupo
            </h3>

            <Subtitle title="Responsable" />

            <div className="row mt-3 ">
              <div className="col-12 col-md-3 ms-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento
                </label>
                <div className="col-12  mt-3">
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

              <div className="col-12 col-md-3 ms-2">
                <label className="ms-2">Número de cedula</label>
                <input
                  className="form-control border rounded-pill px-3"
                  name="numeroCedula"
                  
                  type="text"
                  placeholder="numero de cedula"
                  {...register("numeroCedula")}
                />
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label className="ms-2">Nombre completo</label>
               <input
                  className="form-control border rounded-pill px-3"
                  type="text"
                  placeholder="nombre completo"
                  value="Julian Castillo"
                  disabled
                />
              </div>
              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
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
                <label className="form-floating input-group input-group-dynamic ms-2">
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

            <Subtitle title="Articulo" mt="3" />

            <div className="row mt-3">
              <div className="col-12 col-md-3 ms-2">
                <label className="ms-2">Codigo del articulo</label>
                <input
                  className="form-control border rounded-pill px-3"
                  name="codigoArticulo"
                  
                  type="text"
                  placeholder="Codigo de articulo"
                  {...register("codigoArticulo")}
                />
              </div>

              <div className="col-12 col-md-3 ms-2">
                <label className="ms-2">Nombre del articulo</label>
                <input
                  className="form-control border rounded-pill px-3"
                  name="nombreArticulo"
                  
                  type="text"
                  placeholder="Nombre del articulo"
                  value="Computador"
                  disabled
                />
              </div>

              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaArticuloIsActive(true)}
                  >
                    Buscar articulo
                  </button>
                </div>
              </div>
            </div>

            <div className="row col-2 ms-1">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
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

            {(selecOpciones.dependencia && selecOpciones.grupo) ||
            (selecOpciones.numeroCedula && selecOpciones.tipoDocumento) ||
            selecOpciones.codigoArticulo ? (
              <div>
                <div className="mt-1 row">
                <Subtitle title="Reporte de inventario porpersona o grupo" mt="3" />
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
                    <div className="col-12 col-md-3 ms-2">
                      <label className="ms-2">Nombre quien imprime</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        name="nombreQuienImprime"
                        
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
          <BusquedaDePersonalModal
            isModalActive={busquedaPersonalIsActive}
            setIsModalActive={setBusquedaPersonalIsActive}
          />

          <BusquedaArticuloModal
            isModalActive={busquedaArticuloIsActive}
            setIsModalActive={setBusquedaArticuloIsActive}
          />
        </div>
      </div>
    </div>
  );
};
export default ReporteDeInventarioPorPersonaScreen;
