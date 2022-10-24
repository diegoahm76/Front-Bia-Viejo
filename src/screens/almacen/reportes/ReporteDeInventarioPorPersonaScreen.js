import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
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

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de inventario por persona o grupo
        </h3>

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Persona</n>
                </label>
              </div>
            </div>

            <div className="multisteps-form__content">
              <div className="row">
                <div className="col-12 col-md-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento
                    <div className="col-12 ">
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
                  </label>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      name="numeroCedula"
                      className="form-control"
                      type="text"
                      placeholder="numero de cedula"
                      {...register("numeroCedula")}
                    />
                    <label className="ms-2">Número de cedula</label>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                      value="Julian Castillo"
                      disabled
                    />
                    <label className="ms-2">Nombre completo</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="button"
                  title="Send"
                  form="configForm"
                  onClick={() => setBusquedaPersonalIsActive(true)}
                >
                  Buscar personal
                </button>
              </div>
            </div>

            <div className="row">
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
                          options={opcionGrupo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
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

            <div className="row">
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    name="codigoArticulo"
                    className="multisteps-form__input form-control"
                    type="text"
                    placeholder="Codigo de articulo"
                    {...register("codigoArticulo")}
                  />
                  <label className="ms-2">Codigo del articulo</label>
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
                  <label className="ms-2">Nombre del articulo</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                  <button
                    className="btn bg-gradient-primary mb-0 text-capitalize"
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

            {(selecOpciones.dependencia && selecOpciones.grupo) ||
            (selecOpciones.numeroCedula && selecOpciones.tipoDocumento) ||
            selecOpciones.codigoArticulo ? (
              <div>
                <div className="multisteps-form__content">
                  <div className="row">
                    <label className="form-control ms-0 fw-bolder text-center mt-4">
                      <n>Reporte de inventario porpersona o grupo</n>
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
              </div>
            ) : (
              ""
            )}
          </MarcaDeAgua1>
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
  );
};
export default ReporteDeInventarioPorPersonaScreen;
