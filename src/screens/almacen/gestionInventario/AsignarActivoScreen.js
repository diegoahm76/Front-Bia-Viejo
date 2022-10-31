import React, { useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
// import {activeModalAction,desactiveModalAction,} from "../../../actions/modalActions";
// import CalendarModal from "../../../components/CalendarModal";
import ModalLocal from '../../../components/ModalLocal';
import BusquedaArticuloModal from '../../../components/BusquedaArticuloModal';
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function AsignarActivoScreen() {
  {
    /*  DECLARAR VARIABLES  */
  }
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const detailRowAutoHeight = true;
  
  const {register, handleSubmit, control, formState: { errors },} = useForm();
  const onSubmit = (data) => {
    setSelecOpciones({
      vivero: data.vivero,
    });
  };

  // const actionButton = (params) => {
  //   console.log(params);
  //   alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  // };

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
      headerName: "Nombre Artículo",
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
  ];

  const columnDefsDespachar = [
    {
      headerName: "Código artículo solicitado",
      field: "codigoArticuloSolicitado",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre Artículo solicitado",
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
      headerName: "ID Unico",
      field: "idUnico",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Marca",
      field: "marca",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Serial",
      field: "serial",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Cantidad entregada",
      field: "cantidadEntregada",
      minWidth: 100,
      wrapText: true,
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
            className="btn btn-primary mx-auto my-1 d-flex btn-sm text-xxs text-capitalize border rounded-pill px-3"
            onClick={handleOpenModalArticulos}
          >
            Buscar
          </button>
        </div>
      ),
    },
  ];

  const rowData = [
    { codigoArticulo: "1025", nombreArticulo: "Canoa", cantidad: 95 },
    { codigoArticulo: "9856", nombreArticulo: "Pala", cantidad: 10 },
    { codigoArticulo: "10256", nombreArticulo: "Amarillea", cantidad: 25 },
    { codigoArticulo: "98563", nombreArticulo: "Biche", cantidad: 8 },
  ];

  const rowDataDespachar = [
    {
      codigoArticuloSolicitado: "1025",
      nombreArticuloSolicitado: "Canoa",
      cantidadSolicitada: 95,
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      cantidadEntregada: "5",
    },
    {
      codigoArticuloSolicitado: "9856",
      nombreArticuloSolicitado: "Pala",
      cantidadSolicitada: 10,
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      cantidadEntregada: "5",
    },
    {
      codigoArticuloSolicitado: "10256",
      nombreArticuloSolicitado: "Amarillea",
      cantidadSolicitada: 25,
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      cantidadEntregada: "5",
    },
    {
      codigoArticuloSolicitado: "98563",
      nombreArticuloSolicitado: "Biche",
      cantidadSolicitada: 8,
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      cantidadEntregada: "5",
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

  const dispatch = useDispatch();

  // PARA MODALES SE USA ESTE CODIGO
  const [modal, setModal] = useState(false);
  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

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
        <h3 className="mt-3 mb-0 text-center mb-6">Asignar un Activo Fijo</h3>

        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row my-3">
              <div className="col-12 col-sm-12 border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
              <h5 className="font-weight-bolder my-2 text-light">
                  Datos Generales
                </h5>
              </div>
            </div>
                         
              {/*  PRIMERA FILA  */}
              <div className="row justify-content-between">
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Consecutivo<span className="text-danger">*</span>
            </label>
            <input
              type="search"
              id="consecutivoAsignarActivo"
              name="consecutivo"
              minlength="2"
              maxlength="15"
              defaultValue={"25225"}
              className="form-control border rounded-pill px-3"
              {...register("consecutivoAsignarActivo", { required: true })}
            />
            {errors.consecutivoAsignarActivo && (
              <div className="col-12">
                <small className="text-center text-danger">
                  Este campo es obligatorio
                </small>
              </div>
            )}
          </div>
              </div>
                {/*  FECHA  */}
                <div className="col col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-5">
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
                          className="form-control border rounded-pill px-3 mt-2"
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
              <div className="row justify-content-between">
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Consecutivo Solicitud<span className="text-danger">*</span>
            </label>
            <input
              type="number"
              id="consecutivoSolicitud"
              name="consecutivo"
              minlength="2"
              maxlength="15"
              defaultValue={"25225"}
              className="form-control border rounded-pill px-3"
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
                <div className="col col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-5">
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
                          className="form-control border rounded-pill px-3 mt-2"
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
              <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center text-light border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                  Responsable
                </label>
                <div className="col-12 col-md-4 align-content-end align-items-end">
              <label>Tipo de documento </label>
                      <Select className="border rounded-pill px-3 mt-0 bg-light"
                      defaultValue={optionsTipoDocumento[0]}
                      name="tipoDocumentoResponsable"
                      options={optionsTipoDocumento}
                      isDisabled
                      placeholder="Seleccione"
                    />
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Número de documento
            </label>
            <input
              type="number"
              id="numeroDocumentoResponsable"
              name="numeroDocumentoResponsable"
              disabled
              defaultValue={"112264899"}
              className="form-control border rounded-pill px-3"
              {...register("numeroDocumentoResponsable", { required: true })}
            />
            </div>
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Nombre completo
            </label>
            <input
              type="tex"
              id="nombreResponsable"
              name="nombreResponsable"
              disabled
              defaultValue={"Jhon Alejandro Lopez"}
              className="form-control border rounded-pill px-3"
              {...register("nombreResponsable", { required: true })}
            />
            </div>
              </div>
              </div>
              {/*  CUARTA FILA  */}
              <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center text-light border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                  Solicitante
                </label>
                <div className="col-12 col-md-4 align-content-end align-items-end">
              <label>Tipo de documento </label>
                
              <Select className="border rounded-pill px-3 mt-0 bg-light"
                      defaultValue={optionsTipoDocumento[0]}
                      name="tipoDocumentoSolicitante"
                      options={optionsTipoDocumento}
                      isDisabled
                      placeholder="Seleccione"
                    />
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Número de documento
            </label>
            <input
              type="number"
              id="numeroDocumentoSolicitante"
              name="numeroDocumentoSolicitante"
              disabled
              defaultValue={"1122648"}
              className="form-control border rounded-pill px-3"
              {...register("numeroDocumentoSolicitante", { required: true })}
            />
            </div>
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Nombre completo
            </label>
            <input
              type="text"
              id="nombreSolicitante"
              name="nombreSolicitante"
              disabled
              defaultValue={"Ricardo Sedihno"}
              className="form-control border rounded-pill px-3"
              {...register("nombreSolicitante", { required: true })}
            />
            </div>
              </div>
              </div>
              {/*  QUINTA FILA  */}
              <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center text-light border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
                  Operario
                </label>
                <div className="col-12 col-md-4 align-content-end align-items-end">
              <label>Tipo de documento </label>
                
              <Select className="border rounded-pill px-3 mt-0 bg-light"
                      defaultValue={optionsTipoDocumento[0]}
                      name="tipoDocumentoOperario"
                      options={optionsTipoDocumento}
                      isDisabled
                      placeholder="Seleccione"
                    />
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Número de documento
            </label>
            <input
              type="number"
              id="numeroDocumentoOperario"
              name="numeroDocumentoOperario"
              disabled
              defaultValue={"1122648"}
              className="form-control border rounded-pill px-3"
              {...register("numeroDocumentoOperario", { required: true })}
            />
            </div>
              </div>
              <div className="col col-12 col-md-4">
              <div className="col-12 mb-3">
            <label>
              Nombre completo
            </label>
            <input
              type="tex"
              id="nombreOperario"
              name="nombreOperario"
              disabled
              defaultValue={"Ricardo Perez"}
              className="form-control border rounded-pill px-3"
              {...register("nombreOperario", { required: true })}
            />
            </div>
              </div>
              </div>

              <div>
                <label className="mt-4 form-control ms-0 fw-bolder text-end p-3">
                  Solicitud autorizada el día 10/20/2022 por Jhon Alejandro
                  Lopez Ramos
                </label>
              </div>

              <div className="row my-3">
              <div className="col-12 col-sm-12 border rounded-pill px-3" style={{backgroundImage:"linear-gradient(45deg, #67b136, #39aad4)"}}>
              <h5 className="font-weight-bolder my-2 text-light">
                  Detalles
                </h5>
              </div>
              </div>
              <div id="myGrid" className="ag-theme-alpine mt-1">
                <div
                  className="ag-theme-alpine my-1"
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
              <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                <label>Observaciones</label>
                <textarea
                  className="p-2 mw-100 w-auto border rounded-pill px-4"
                  type="text"
                  disabled
                  {...register("observaciones")}
                  defaultValue={
                    "Campo de observaciones traídas de la solicitud"
                  }
                  placeholder="Incluya observacion"
                  rows="3"
                  name="observaciones"
                />
              </div>
              {/* CAMPO DE BOTONES */}
              <div className="row">
                <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                  <button
                    type="button"
                    className="mt-4 btn btn-secondary flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalDespachar}
                  >
                    Despachar
                  </button>
                  <button
                    type="button"
                    className="mt-4 mx-4 btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalRechazar}
                  >
                    Rechazar
                  </button>
                  <button
                    type="submit"
                    className="mt-4 btn btn-danger flex-center text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalElementosNoDisponibles}
                  >
                    Elementos no disponibles
                  </button>
                </div>
              </div>        
         
          </div>
        </form>

        <ModalLocal localState={despachar}>
        <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center">Despachar Activos</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div id="myGrid" className="ag-theme-alpine mt-1">
              <div className="ag-theme-alpine my-1" style={{ height: "250px" }}>
                <AgGridReact
                  columnDefs={columnDefsDespachar}
                  rowData={rowDataDespachar}
                  debounceVerticalScrollbar={true}
                  defaultColDef={defaultColDef}
                  onGridReady={onGridReady}
                  >
                </AgGridReact>
              </div>
            </div>
            <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
                <label>Observaciones</label>
                <textarea
                  className="p-2 mw-100 w-auto border rounded-pill px-4"
                  type="text"
                  {...register("observacionesDespachar")}
                  placeholder="Incluya observacion"
                  rows="2"
                  name="observacionesDespachar"
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
                    <div className="col-12 mb-3">
            <label>
              Nombre
            </label>
            <input
              type="text"
              id="nombreRechazar"
              name="nombreRechazar"
              disabled
              defaultValue={"Ricardo Sedihno"}
              className="form-control border rounded-pill px-3"
              {...register("nombreRechazar", { required: true })}
            />
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
                              className="form-control border rounded-pill px-3 mt-2"
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
                <label>Observaciones<span className="text-danger">*</span></label>
                <textarea
                  className="p-2 mw-100 w-auto border rounded-pill px-4"
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
                    <div className="col-12 mb-3">
            <label>
              Nombre
            </label>
            <input
              type="text"
              id="nombreElementosNoDisponibles"
              name="nombreElementosNoDisponibles"
              disabled
              defaultValue={"Ricardo Sedihno"}
              className="form-control border rounded-pill px-3"
              {...register("nombreElementosNoDisponibles", { required: true })}
            />
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
                              className="form-control border rounded-pill px-3 mt-2"
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
                <label>Observaciones<span className="text-danger">*</span></label>
                <textarea
                  className="p-2 mw-100 w-auto border rounded-pill px-4"
                  type="text"
                  {...register("observacionesElementosNoDisponibles", {
                    required: true,
                  })}
                  placeholder="Incluya observacion"
                  rows="2"
                  name="observacionesElementosNoDisponibles"
                />
                {errors.observacionesElementosNoDisponibles?.type === "required" && (
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

        {/* <CalendarModal>
          <div>
            <h3>Modal de prueba</h3>
          </div>
          <button
            className="btn bg-gradient-danger mb-0"
            onClick={""}
            type="submit"
            title="Send"
            form="configForm"
          >
            Salir
          </button>
        </CalendarModal> */}
      </div>
    </div>
  );
}

export default AsignarActivoScreen;
