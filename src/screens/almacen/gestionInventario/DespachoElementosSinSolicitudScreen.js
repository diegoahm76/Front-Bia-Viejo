import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import Subtitle from "../../../components/Subtitle";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function DespachoElementosSinSolicitudScreen() {
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

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

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
      headerName: "Buscar",
      field: "buscar",
      width: 100,
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
    { codigoArticulo: "1025", nombreArticulo: "Canoa", cantidad: 95 },
    { codigoArticulo: "9856", nombreArticulo: "Pala", cantidad: 10 },
    { codigoArticulo: "10256", nombreArticulo: "Amarillea", cantidad: 25 },
    { codigoArticulo: "98563", nombreArticulo: "Biche", cantidad: 8 },
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

  // MODAL BUSQUEDA ARTICULO Y PERSONA
  const [modalArticulos, setModalArticulos] = useState(false);
  const [modalPersonal, setModalPersonal] = useState(false);

  const handleOpenModalArticulos = () => {
    setModalArticulos(true);
  };

  const handleOpenModalBusquedaPersonal = () => {
    setModalPersonal(true);
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
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">Despachar Elementos sin Solicitud</h3>
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
                    id="consecutivoDespacharElementosSinSolicitud"
                    name="consecutivo"
                    minlength="2"
                    maxlength="15"
                    defaultValue={"25225"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("consecutivoDespacharElementosSinSolicitud", {
                      required: true,
                    })}
                  />
                  {errors.consecutivoDespacharElementosSinSolicitud && (
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
            <Subtitle title={"Operario Almacén"} mt={3} />
            <div className="row ms-1">
              <div className="col-12 col-md-3 align-content-end align-items-end">
                <label className="text-terciary">Tipo de documento </label>
                <Select
                  className="border rounded-pill px-3 mt-0 bg-light"
                  defaultValue={optionsTipoDocumento[0]}
                  name="tipoDocumentoOperario"
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
                    id="numeroDocumentoOperario"
                    name="numeroDocumentoOperario"
                    disabled
                    defaultValue={"112264899"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroDocumentoOperario", {
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
                    id="nombreOperario"
                    name="nombreOperario"
                    disabled
                    defaultValue={"Jhon Alejandro Lopez"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreOperario", { required: true })}
                  />
                </div>
              </div>
            </div>
              {/*  TERCERA FILA  */}
              <Subtitle title={"Responsable"} mt={3} />
              <div className="row ms-1">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                  <label className="text-terciary">
                    Tipo de documento<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoResponsable"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsTipoDocumento} />
                    )}
                  />
                  {errors.tipoDocumentoResponsable && (
                    <span className="text-danger">
                      Este campo es obligatorio *
                    </span>
                  )}
                </div>
                <div className="col-12 col-md-3">
                  <div className="mb-3">
                    <label className="text-terciary">Número de documento<span className="text-danger">*</span></label>
                    <input
                      type="number"
                      id="numeroDocumentoQuienEntrega"
                      name="numeroDocumentoQuienEntrega"
                      defaultValue={""}
                      placeholder={"Ingrese número de documento"}
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numeroDocumentoQuienEntrega", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumentoQuienEntrega?.type === "required" && (
                    <span className="text-danger">
                      El campo es requerido*
                    </span>
                )}
                </div>
                <div className="col-12 col-md-3">
                  <div className="mb-3">
                    <label className="text-terciary">Nombre completo</label>
                    <input
                      type="text"
                      id="nombreResponsable"
                      name="nombreResponsable"
                      disabled
                      defaultValue={"Jhon Alejandro Lopez"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("nombreResponsable", { required: true })}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-3">
                <div className="mb-3 d-inline-flex flex-column">
                    <label>&nbsp;</label>
                    <button
                    type="submit"
                    Value="buscar"
                    className="btn btn-primary text-capitalize border rounded-pill px-3"
                    onClick={handleOpenModalBusquedaPersonal}
                  >
                    Buscar
                  </button>
                  </div>
                  </div>
              </div>

              <div className="row">
              <div className="d-flex justify-content-end flex-wrap mt-4">
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary flex-center text-capitalize border rounded-pill px-3"
                  >
                    Guardar
                  </button>
                </div>
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-light flex-center text-capitalize border rounded-pill px-3"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>

            <Subtitle title={"Despacho de Solicitud"} mt={3} />
              <div id="myGrid" className="ag-theme-alpine mt-1">
                <div
                  className="ag-theme-alpine mt-2 mx-3"
                  style={{ height: "250px" }}
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
                <label className="text-terciary">Observaciones<span className="text-danger">*</span></label>
                <textarea
                  className="p-2 mw-100 w-auto border border-terciary rounded-pill px-4"
                  type="text"
                  placeholder="Incluya observación"
                  rows="3"
                  name="observacion"
                  {...register("observacion", {
                    required: true,
                  })}                  
                />
                {errors.observacion?.type === "required" && (
                  <span className="text-danger">El campo es requerido*</span>
                )}
              </div>
              <div className="row">
              <div className="d-flex justify-content-end flex-wrap mt-4">
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary flex-center text-capitalize border rounded-pill px-3"
                  >
                    Guardar
                  </button>
                </div>
                <div className="mx-1 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-light flex-center text-capitalize border rounded-pill px-3"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
            </div>
          </MarcaDeAgua1>
        </form>
        <BusquedaDePersonalModal
          isModalActive={modalPersonal}
          setIsModalActive={setModalPersonal}
        />

        <BusquedaArticuloModal
          isModalActive={modalArticulos}
          setIsModalActive={setModalArticulos}
        />
      </div>
    </div>
  );
}

export default DespachoElementosSinSolicitudScreen;
