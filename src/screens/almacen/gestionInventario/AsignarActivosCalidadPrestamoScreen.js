import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import ModalLocal from "../../../components/ModalLocal";
import Subtitle from "../../../components/Subtitle";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function AsignarActivosCalidadPrestamoScreen() {
  {
    /*  DECLARAR VARIABLES  */
  }
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero: data.vivero,
    });
  };
  const [startDate, setStartDate] = useState(new Date());
  const CustomPlaceholder = ({ date, value, onChange }) => (
    <input style={{ border: "solid 1px black" }} />
  );

  let gridApi;
  const columnDefs = [
    {
      headerName: "Código artículo",
      field: "codigoArticulo",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre del artículo",
      field: "nombreArticulo",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Fecha de entrega",
      field: "fechaEntrega",
      width: 50,
      minWidth: 100,
      maxWidth: 200,
      // cellRendererFramework: (params) => (
      //   <div>
      //     <input
      //       className="border border-0 mx-auto my-0 d-flex btn-sm text-xxs text-capitalize"
      //       type="date"
      //       placeholder="dd/mm/aaaa"
      //     ></input>
      //   </div>
      // ),
    },
  ];

  const columnDefsDespachar = [
    {
      headerName: "Código artículo solicitado",
      field: "codigoArticuloSolicitado",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre del artículo solicitado",
      field: "nombreArticuloSolicitado",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad solicitada",
      field: "cantidadSolicitada",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Fecha de entrega",
      field: "fechaEntregaSolicitada",
      width: 50,
      minWidth: 100,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <input
            className="border border-0 mx-auto my-0 d-flex btn-sm text-xxs text-capitalize"
            type="date"
          ></input>
        </div>
      ),
    },
    {
      headerName: "Nombre del elemento",
      field: "nombreElemento",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Serial del elemento",
      field: "serialElemento",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad a despachar",
      field: "cantidadDespachar",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Fecha acordada",
      field: "fechaAcordada",
      width: 50,
      minWidth: 100,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <input
            className="border border-0 mx-auto my-0 d-flex btn-sm text-xxs text-capitalize"
            type="date"
          ></input>
        </div>
      ),
    },
    {
      headerName: "Buscar",
      field: "buscar",
      width: 50,
      minWidth: 100,
      maxWidth: 200,
      cellRendererFramework: (params) => (
        <div>
          <button
            className="btn btn-primary mx-auto my-1 d-flex btn-sm text-xxs text-capitalize"
            onClick={handleOpenModalArticulos}
          >
            Buscar
          </button>
        </div>
      ),
    },
  ];

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  const rowData = [
    { codigoArticulo: "1025", nombreArticulo: "Canoa", cantidad: 95, fechaEntrega: "10/05/2022" },
    { codigoArticulo: "9856", nombreArticulo: "Pala", cantidad: 10, fechaEntrega: "10/05/2022"},
    { codigoArticulo: "10256", nombreArticulo: "Amarillea", cantidad: 25, fechaEntrega: "10/05/2022"},
    { codigoArticulo: "98563", nombreArticulo: "Biche", cantidad: 8, fechaEntrega: "10/05/2022"},
  ];

  const rowDataDespachar = [
    {
      codigoArticuloSolicitado: "1025",
      nombreArticuloSolicitado: "Canoa",
      cantidadSolicitada: 95,
      cantidadEntregada: "5",
      nombreElemento: "Carretilla",
      serialElemento: "165685",
      cantidadDespachar: "15",
    },
    {
      codigoArticuloSolicitado: "9856",
      nombreArticuloSolicitado: "Pala",
      cantidadSolicitada: 10,
      cantidadEntregada: "5",
      nombreElemento: "Pala",
      serialElemento: "165685",
      cantidadDespachar: "15",
    },
    {
      codigoArticuloSolicitado: "10256",
      nombreArticuloSolicitado: "Amarillea",
      cantidadSolicitada: 25,
      cantidadEntregada: "5",
      nombreElemento: "Libro",
      serialElemento: "165685",
      cantidadDespachar: "15",
    },
    {
      codigoArticuloSolicitado: "98563",
      nombreArticuloSolicitado: "Biche",
      cantidadSolicitada: 8,
      cantidadEntregada: "5",
      nombreElemento: "Mesa",
      serialElemento: "165685",
      cantidadDespachar: "15",
    },
  ];

  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    floatingFilter: false,
    resizable: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  // PARA MODALES SE USA ESTE CODIGO
  const [despachar, setDespachar] = useState(false);

  const handleOpenModalDespachar = () => {
    setDespachar(true);
  };

  const handleCloseModalDespachar = () => {
    setDespachar(false);
  };

  const [rechazar, setRechazar] = useState(false);

  const handleOpenModalRechazar = () => {
    setRechazar(true);
  };

  const handleCloseModalRechazar = () => {
    setRechazar(false);
  };

  const [elementosNoDisponibles, setElementosNoDisponibles] = useState(false);

  const handleOpenModalElementosNoDisponibles = () => {
    setElementosNoDisponibles(true);
  };

  const handleCloseModalElementosNoDisponibles = () => {
    setElementosNoDisponibles(false);
  };

  // MODAL BUSQUEDA ARTICULO
  const [modalArticulos, setModalArticulos] = useState(false);

  const handleOpenModalArticulos = () => {
    setModalArticulos(true);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        
        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">Asignar Activos en Calidad de Préstamo</h3>
            <div className="multisteps-form__content">
            <Subtitle title={"Datos Generales"} mt={3} />
              {/*  PRIMERA FILA  */}
            <div className="row ms-1 justify-content-start">
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">
                    Consecutivo<span className="text-danger">*</span>
                  </label>
                  <input
                    type="search"
                    id="consecutivoAsignarActivosPrestamo"
                    name="consecutivo"
                    minlength="2"
                    maxlength="15"
                    defaultValue={"25225"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("consecutivoAsignarActivosPrestamo", {
                      required: true,
                    })}
                  />
                  {errors.consecutivoAsignarActivosPrestamo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              {/*  FECHA  */}
              <div className="col-12 col-md-3">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-5"
                >
                  Fecha de Respuesta
                  <Controller
                    name="fechaRespuesta"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        selected={startDate}
                        dateFormat="dd/MM/yyyy"
                        includeDates={[new Date()]}
                        onChange={(date) => setStartDate(date)}
                        className="form-control border border-terciary rounded-pill px-3 mt-2"
                        placeholderText="Fecha de respuesta"
                        peekNextMonth
                        disabled
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    )}
                  />
                </label>
              </div>
            </div>
            {/*  SEGUNDA FILA  */}
            <div className="row ms-1 justify-content-start">
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">
                    Consecutivo Solicitud<span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="consecutivoSolicitud"
                    name="consecutivo"
                    minlength="2"
                    maxlength="15"
                    defaultValue={"25225"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("consecutivoSolicitud", { required: true })}
                  />
                  {errors.consecutivoSolicitud && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              {/*  FECHA  */}
              <div className="col-12 col-md-3">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-5"
                >
                  Fecha de Solicitud
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
                        className="form-control border border-terciary rounded-pill px-3 mt-2"
                        placeholderText="Fecha de solicitud"
                        disabled
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                      />
                    )}
                  />
                </label>
              </div>
            </div>
             {/*  TERCERA FILA  */}
            <Subtitle title={"Coordinador"} mt={3} />
            <div className="row ms-1">
              <div className="col-12 col-md-3 align-content-end align-items-end">
                <label className="text-terciary">Tipo de documento </label>
                <Select
                  className="border rounded-pill px-3 mt-0 bg-light"
                  defaultValue={optionsTipoDocumento[0]}
                  name="tipoDocumentoResponsable"
                  options={optionsTipoDocumento}
                  isDisabled
                  placeholder="Seleccione"
                />
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">Número de documento</label>
                  <input
                    type="number"
                    id="numeroDocumentoCoordinador"
                    name="numeroDocumentoCoordinador"
                    disabled
                    defaultValue={"112264899"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroDocumentoCoordinador", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">Nombre completo</label>
                  <input
                    type="tex"
                    id="nombreCoordinador"
                    name="nombreCoordinador"
                    disabled
                    defaultValue={"Jhon Alejandro Lopez"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreCoordinador", { required: true })}
                  />
                </div>
              </div>
            </div>
            {/*  CUARTA FILA  */}
            <Subtitle title={"Solicitante"} mt={3} />
            <div className="row ms-1">
              <div className="col-12 col-md-3 align-content-end align-items-end">
                <label className="text-terciary">Tipo de documento </label>

                <Select
                  className="border rounded-pill px-3 mt-0 bg-light"
                  defaultValue={optionsTipoDocumento[0]}
                  name="tipoDocumentoSolicitante"
                  options={optionsTipoDocumento}
                  isDisabled
                  placeholder="Seleccione"
                />
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">Número de documento</label>
                  <input
                    type="number"
                    id="numeroDocumentoSolicitante"
                    name="numeroDocumentoSolicitante"
                    disabled
                    defaultValue={"1122648"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroDocumentoSolicitante", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">Nombre completo</label>
                  <input
                    type="text"
                    id="nombreSolicitante"
                    name="nombreSolicitante"
                    disabled
                    defaultValue={"Ricardo Sedihno"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreSolicitante", { required: true })}
                  />
                </div>
              </div>
            </div>
              {/* QUINTA FILA */}
              <div>
                <label className="mt-4 form-control ms-0 fw-bolder text-end p-3">
                  Solicitud autorizada el día 10/20/2022 por Jhon Alejandro
                  Lopez Ramos
                </label>
              </div>

              <Subtitle title={"Detalles"} mt={3} />
              <div id="myGrid" className="ag-theme-alpine mt-1">
                <div
                  className="ag-theme-alpine mt-2 mx-3"
                  style={{ height: "270px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    debounceVerticalScrollbar={true}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
              <div className="input-group mx-2 input-group-dynamic flex-column mt-4 mb-2 px-1">
              <label className="text-terciary">Observaciones</label>
              <textarea
                className="p-2 mw-100 w-auto border border-terciary rounded-pill px-4"
                type="text"
                disabled
                {...register("observaciones")}
                defaultValue={"Campo de observaciones traídas de la solicitud"}
                placeholder="Incluya observacion"
                rows="3"
                name="observaciones"
              />
            </div>

              {/* CAMPO DE BOTONES */}
            <div className="row">
              <div className="d-flex justify-content-end flex-wrap mt-4">
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-secondary flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalDespachar}
                  >
                    Despachar
                  </button>
                </div>
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalRechazar}
                  >
                    Rechazar
                  </button>
                </div>
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalElementosNoDisponibles}
                  >
                    Elementos no disponibles
                  </button>
                </div>
              </div>
            </div>
            </div>
          </MarcaDeAgua1>
        </form>
        <ModalLocal localState={despachar}>
          <MarcaDeAgua1>
            <div className="row min-vh-100">
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-center">Despachar Activos</h3>
                <form
                  className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                  data-animation="FadeIn"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div id="myGrid" className="ag-theme-alpine mt-1">
                    <div
                      className="ag-theme-alpine my-1"
                      style={{ height: "250px" }}
                    >
                      <AgGridReact
                        columnDefs={columnDefsDespachar}
                        rowData={rowDataDespachar}
                        debounceVerticalScrollbar={true}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                      ></AgGridReact>
                    </div>
                  </div>
                  <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                    <label htmlFor="exampleFormControlInput1">
                      Observaciones
                    </label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto border rounded-pill px-3"
                      type="text"
                      {...register("observacionesDespachar")}
                      placeholder="Incluya observacion"
                      rows="2"
                      name="observaciones"
                    />
                  </div>
                  <div className="row justify-content-end">
                    <button
                      className="col-2 btn bg-gradient-danger mt-2 flex-end border rounded-pill px-3"
                      onClick={handleCloseModalDespachar}
                      type="submit"
                      title="Send"
                      form="configForm"
                    >
                      Salir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </MarcaDeAgua1>
        </ModalLocal>

        <ModalLocal localState={rechazar}>
          <MarcaDeAgua1>
            <div className="row min-vh-100">
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <h3 className="mt-3 mb-2 text-center">Rechazar Solicitud</h3>
                <form
                  className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                  data-animation="FadeIn"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row justify-content-between">
                    <div className="col col-6 col-md-6">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          value={"Alejandro Magno"}
                          disabled
                          placeholder="Nombre"
                          {...register("nombreRechazar", {
                            required: true,
                          })}
                        />
                        <label className="ms-2">Nombre</label>
                      </div>
                    </div>
                    {/*  FECHA  */}
                    <div className="col-12 col-md-4">
                      <label htmlFor="exampleFormControlInput1 mt-4">
                        Fecha de Respuesta
                        <Controller
                          name="fechaRespuestaRechazar"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              locale="es"
                              selected={startDate}
                              dateFormat="dd/MM/yyyy"
                              includeDates={[new Date()]}
                              onChange={(date) => setStartDate(date)}
                              className="multisteps-form__input form-control p-2 border border-1"
                              placeholderText="Fecha de respuesta"
                              peekNextMonth
                              disabled
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          )}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                    <label htmlFor="exampleFormControlInput1">
                      Observaciones
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      {...register("observacionesRechazar", {
                        required: true,
                      })}
                      placeholder="Incluya observacion"
                      rows="2"
                      name="observacionesRechazar"
                    />
                    {errors.observacionesRechazar?.type === "required" && (
                      <small className="text-danger">
                        El campo es requerido*
                      </small>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                      <button
                        type="submit"
                        className="mt-4 btn btn-primary flex-center text-capitalize border rounded-pill px-3"
                        onClick={""}
                      >
                        Guardar
                      </button>
                      <button
                        type="submit"
                        className="mt-4 mx-4 btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                        onClick={handleCloseModalRechazar}
                      >
                        Salir
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MarcaDeAgua1>
        </ModalLocal>

        <ModalLocal localState={elementosNoDisponibles}>
          <MarcaDeAgua1>
            <div className="row min-vh-100">
              <div className="col-lg-12 col-md-12 col-12 mx-auto">
                <h3 className="mt-3 mb-2 text-center">
                  Elementos No Disponibles
                </h3>
                <form
                  className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                  data-animation="FadeIn"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="row justify-content-between">
                    <div className="col col-6 col-md-6">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          value={"Alejandro Magno"}
                          disabled
                          placeholder="Nombre"
                          {...register("nombreRechazar", {
                            required: true,
                          })}
                        />
                        <label className="ms-2">Nombre</label>
                      </div>
                    </div>
                    {/*  FECHA  */}
                    <div className="col-12 col-md-4">
                      <label htmlFor="exampleFormControlInput1 mt-4">
                        Fecha de Respuesta
                        <Controller
                          name="fechaRespuestaElementosNoDisponibles"
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              {...field}
                              locale="es"
                              selected={startDate}
                              dateFormat="dd/MM/yyyy"
                              includeDates={[new Date()]}
                              onChange={(date) => setStartDate(date)}
                              className="multisteps-form__input form-control p-2 border border-1"
                              placeholderText="Fecha de respuesta"
                              peekNextMonth
                              disabled
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                            />
                          )}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                    <label htmlFor="exampleFormControlInput1">
                      Observaciones
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      {...register("observacionesElementosNoDisponibles", {
                        required: true,
                      })}
                      placeholder="Incluya observacion"
                      rows="2"
                      name="observacionesElementosNoDisponibles"
                    />
                    {errors.observacionesElementosNoDisponibles?.type ===
                      "required" && (
                      <small className="text-danger">
                        El campo es requerido*
                      </small>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                      <button
                        type="submit"
                        className="mt-4 btn btn-primary flex-center text-capitalize border rounded-pill px-3"
                        onClick={""}
                      >
                        Guardar
                      </button>
                      <button
                        type="submit"
                        className="mt-4 mx-4 btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                        onClick={handleCloseModalElementosNoDisponibles}
                      >
                        Salir
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </MarcaDeAgua1>
        </ModalLocal>

        <BusquedaArticuloModal
          isModalActive={modalArticulos}
          setIsModalActive={setModalArticulos}
        />
      </div>
    </div>
  );
}

export default AsignarActivosCalidadPrestamoScreen;
