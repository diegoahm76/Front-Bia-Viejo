import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { activeModalAction, desactiveModalAction } from '../../../actions/modalActions';
import ModalLocal from '../../../components/ModalLocal';
import BusquedaArticuloModal from '../../../components/BusquedaArticuloModal';
import { useDispatch } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function DespacharElementosConsumoScreen() {
  
     {/*  DECLARAR VARIABLES  */}
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
      headerName: "Nombre del elemento",
      field: "nombreElemento",    
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
    {codigoArticulo: "1025", nombreElemento: "Canoa", cantidad: 95,},
    {codigoArticulo: "9856", nombreElemento: "Pala", cantidad: 10,},
    {codigoArticulo: "10256", nombreElemento: "Amarillea", cantidad: 25,},
    {codigoArticulo: "98563", nombreElemento: "Biche", cantidad: 8,},
    ];

    const rowDataDespachar = [
      { codigoArticuloSolicitado: "1025", nombreArticuloSolicitado: "Canoa", cantidadSolicitada: 95, cantidadEntregada: "5", },
      { codigoArticuloSolicitado: "9856", nombreArticuloSolicitado: "Pala", cantidadSolicitada: 10, cantidadEntregada: "5",},
      { codigoArticuloSolicitado: "10256", nombreArticuloSolicitado: "Amarillea", cantidadSolicitada: 25, cantidadEntregada: "5",},
      { codigoArticuloSolicitado: "98563", nombreArticuloSolicitado: "Biche", cantidadSolicitada: 8, cantidadEntregada: "5",},
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
  const [despachar, setDespachar] = useState(false)
  
  const handleOpenModalDespachar = () => {
    setDespachar(true)
  };

  const handleCloseModalDespachar = () => {
    setDespachar(false)
  };

  const [rechazar, setRechazar] = useState(false)
  
  const handleOpenModalRechazar = () => {
    setRechazar(true)
  };

  const handleCloseModalRechazar = () => {
    setRechazar(false)
  };

  const [elementosNoDisponibles, setElementosNoDisponibles] = useState(false)
  
  const handleOpenModalElementosNoDisponibles = () => {
    setElementosNoDisponibles(true)
  };

  const handleCloseModalElementosNoDisponibles = () => {
    setElementosNoDisponibles(false)
  };

  // MODAL BUSQUEDA ARTICULO
  const [modalArticulos, setModalArticulos] = useState(false)
  
  const handleOpenModalArticulos = () => {
    setModalArticulos(true);
  };

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Despachar Elementos de Consumo</h3>

        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="multisteps-form__content">
            <div className="row my-3">
              <div className="col-12 col-sm-6">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Datos Generales
                </h5>
              </div>
            </div>
            {/*  PRIMERA FILA  */}
            <div className="row justify-content-between">
              <div className="col col-6 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="number"
                    defaultValue={"25225"}
                    placeholder="Consecutivo"
                    {...register("consecutivoAsignarActivo", {
                      required: true,
                    })}
                  />
                  <label className="ms-2">Consecutivo
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.consecutivoAsignarActivo?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
              </div>
              {/*  FECHA  */}
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
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
            {/*  SEGUNDA FILA  */}
            <div className="row justify-content-between">
              <div className="col col-6 col-md-6">
                <div className="form-floating input-group input-group-dynamic">
                  <input
                    className="form-control"
                    type="number"
                    defaultValue={"25225"}
                    placeholder="Consecutivo de solicitud"
                    {...register("consecutivoSolicitud", {
                      required: true,
                    })}
                  />
                  <label className="ms-2">Consecutivo de solicitud
                  <span className="text-danger">*</span>
                  </label>
                </div>
                {errors.consecutivoSolicitud?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
              </div>
              {/*  FECHA  */}
              <div className="col-12 col-md-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
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
                        className="multisteps-form__input form-control p-2 border border-1"
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
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Responsable
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12">
                    <Controller
                      name="tipoDocumentoResponsable"
                      control={control}
                      defaultValue={optionsTipoDocumento[0]}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isDisabled
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="number"
                    {...register("numeroDocumentoResponsable")}
                    placeholder="numero documento"
                    value="1121919374"
                    disabled
                  />
                  <label className="ms-2">Número de documento</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="text"
                    {...register("nombreResponsable")}
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                    id="nombreResponsable"
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
            {/*  CUARTA FILA  */}
            <div className="row">
              <label className="mt-4 form-control ms-0 fw-bolder text-center">
                Solicitante
              </label>
              <div className="col-12 col-md-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12">
                    <Controller
                      name="tipoDocumentoSolicitante"
                      control={control}
                      defaultValue={optionsTipoDocumento[0]}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isDisabled
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="number"
                    {...register("numeroDocumentoSolicitante")}
                    placeholder="numero documento"
                    value="1121919374"
                    disabled
                  />
                  <label className="ms-2">Número de documento</label>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="form-floating input-group input-group-dynamic disabled">
                  <input
                    className="form-control"
                    type="text"
                    {...register("nombreSolicitante")}
                    placeholder="Nombre Completo"
                    value="Jhon Alejandro Lopez Ramos"
                    disabled
                  />
                  <label className="ms-2">Nombre completo</label>
                </div>
              </div>
            </div>
           {/* QUINTA FILA */}
            <div>
              <label className="mt-4 form-control ms-0 fw-bolder text-end p-3">
                Solicitud autorizada el día 10/20/2022 por Jhon Alejandro Lopez
                Ramos
              </label>
            </div>

            <div className="row my-3">
              <div className="col-12 col-sm-6">
                <h5 className="font-weight-bolder border-radius-xl my-2">
                  Detalles
                </h5>
              </div>
            </div>
            <div id="myGrid" className="ag-theme-alpine mt-4">
            <div className="ag-theme-alpine my-1" style={{ height: "300px" }}>
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
                    <label htmlFor="exampleFormControlInput1">Observaciones</label>
                    <textarea
                      className="multisteps-form__input form-control p-2 mw-100 w-auto"
                      type="text"
                      placeholder="Incluya observacion"
                      rows="3"
                      name="observaciones"
                      {...register("observaciones")}
                      defaultValue={"Campo de observaciones traídas de la solicitud"}
                      disabled
                    />
                  </div>

                  {/* CAMPO DE BOTONES */}
            <div className="row">
              <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                <button
                  type="button"
                  className="mt-4 btn btn-secondary flex-center text-capitalize"
                  onClick={handleOpenModalDespachar}
                >
                  Despachar
                </button>
                <button
                  type="button"
                  className="mt-4 mx-4 btn btn-danger flex-center text-capitalize"
                  onClick={handleOpenModalRechazar}
                >
                  Rechazar
                </button>
                <button
                  type="submit"
                  className="mt-4 btn btn-danger flex-center text-capitalize"
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
                ></AgGridReact>
              </div>
            </div>
            <div className="input-group input-group-dynamic flex-column mt-4 mb-2">
              <label htmlFor="exampleFormControlInput1">Observaciones</label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                {...register("observacionesDespachar")}
                placeholder="Incluya observacion"
                rows="2"
                name="observaciones"
              />
            </div>
            <div className="row justify-content-end">
            <button
            className="col-2 btn bg-gradient-danger mt-2 flex-end"
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
                  <label className="ms-2">Nombre
                 </label>
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
              <label htmlFor="exampleFormControlInput1">Observaciones
              <span className="text-danger">*</span>
              </label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                {...register("observacionesRechazar" ,{
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
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                  onClick={""}
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="mt-4 mx-4 btn btn-danger flex-center text-capitalize"
                  onClick={handleCloseModalRechazar}
                >
                  Salir
                </button>
              </div>
            </div>
        </form>
        </div>
        </div>
        </ModalLocal>

        <ModalLocal localState={elementosNoDisponibles}>
        <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-2 text-center">Elementos No Disponibles</h3>
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
                  <label className="ms-2">Nombre
                 </label>
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
              <label htmlFor="exampleFormControlInput1">Observaciones
              <span className="text-danger">*</span>
              </label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                {...register("observacionesElementosNoDisponibles",{
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
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                  onClick={""}
                >
                  Guardar
                </button>
                <button
                  type="submit"
                  className="mt-4 mx-4 btn btn-danger flex-center text-capitalize"
                  onClick={handleCloseModalElementosNoDisponibles}
                >
                  Salir
                </button>
              </div>
            </div>
        </form>
        </div>
        </div>
        </ModalLocal>

        <BusquedaArticuloModal
      isModalActive={modalArticulos}
      setIsModalActive={setModalArticulos}
      />      
          </div>
        
      </div>
  );

}

export default DespacharElementosConsumoScreen