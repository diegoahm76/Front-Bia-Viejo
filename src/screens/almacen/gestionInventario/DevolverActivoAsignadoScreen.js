import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import Subtitle from "../../../components/Subtitle";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

const optionsEstado = [
  { label: "Bueno", value: "B" },
  { label: "Malo", value: "M" },
  { label: "Defectuoso", value: "D" },
];

const optionsBodega = [
  { label: "Villavicencio / Principal", value: "VillavicencioPrincipal" },
  { label: "Villavicencio / San Antonio", value: "VillavicencioSanAntonio" },
  { label: "Macarena / Macarena", value: "Macarena" },
];

function DevolverActivoAsignadoScreen() {
  {
    /*  DECLARAR VARIABLES  */
  }
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

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
      headerName: "Código",
      field: "codigo",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre",
      field: "nombre",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "ID Único",
      field: "id",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Consecutivo de asignación",
      field: "consecutivoAsignacion",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Estado",
      field: "estado",
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <Controller
            name="estado"
            control={control}
            defaultValue={optionsEstado[0]}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={optionsEstado}
                placeholder="Seleccionar"
              />
            )}
          />
        </div>
      ),
    },
    {
      headerName: "Justificación",
      field: "justificacion",
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <textarea
            className="multisteps-form__input form-control p-2 mw-100 w-auto"
            type="text"
            placeholder="Incluya Justificación"
            rows="1"
            name="concepto"
          />
        </div>
      ),
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

  const rowData = [
    { codigo: "1025", nombre: "Canoa", id: 95, consecutivoAsignacion: "5698" },
    { codigo: "9856", nombre: "Pala", id: 10, consecutivoAsignacion: "5698" },
    {
      codigo: "10256",
      nombre: "Amarillea",
      id: 25,
      consecutivoAsignacion: "5698",
    },
    { codigo: "98563", nombre: "Biche", id: 8, consecutivoAsignacion: "5698" },
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
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">Devolver un Activo Asignado</h3>
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
                    type="text"
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

              <div className="row ms-1">
              <div className="col-12 col-md-6 align-content-end align-items-end">
                  <label className="text-terciary">
                    Bodega<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="bodega"
                    control={control}
                    defaultValue={optionsBodega[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsBodega} />
                    )}
                  />
                  {errors.bodega && (
                    <span className="text-danger">
                      Este campo es obligatorio *
                    </span>
                  )}
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

            <Subtitle title={"Detalles"} mt={3} />
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

export default DevolverActivoAsignadoScreen;
