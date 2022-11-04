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

function FormularioRevisionInventarioScreen() {
  const [selecOpciones, setSelecOpciones] = useState({
    vivero: "",
  });

  const optionsEstado = [
    { label: "Bueno", value: "B" },
    { label: "Malo", value: "M" },
    { label: "Defectuoso", value: "D" },
  ];

  const optionsRevision = [
    { label: "OK", value: "OK" },
    { label: "Pendiente", value: "PE" },
  ];

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

  const optionsTipoDocumento = [
    { label: "C.C.", value: "CC" },
    { label: "T.I.", value: "TI" },
  ];

  const optionsBodega = [
    { label: "Villavicencio / Principal", value: "VillavicencioPrincipal" },
    { label: "Villavicencio / San Antonio", value: "VillavicencioSanAntonio" },
    { label: "Macarena / Macarena", value: "Macarena" },
  ];

  let gridApi;

  const columnDefsArticulos = [
    {
      headerName: "Código artículo",
      field: "codigoArticulo",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre artículo",
      field: "nombreArticulo",
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
      headerName: "Bodega",
      field: "bodega",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Responsable",
      field: "responsable",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Código de barras",
      field: "codigoBarras",
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
      headerName: "Revisión",
      field: "revision",
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <Controller
            name="estado"
            control={control}
            defaultValue={optionsRevision[0]}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Select
                {...field}
                options={optionsRevision}
                placeholder="Seleccionar"
              />
            )}
          />
        </div>
      ),
    },

    {
      headerName: "Anotación",
      field: "anotacion",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      minWidth: 100,
      wrapText: true,
      cellRendererFramework: (params) => (
        <div>
          <textarea
            className="multisteps-form__input form-control p-2 mw-100 w-auto"
            type="text"
            placeholder="Incluya concepto"
            rows="1"
            name="concepto"
          />
        </div>
      ),
    },
  ];

  const rowDataArticulos = [
    {
      codigoArticulo: "1025",
      nombreArticulo: "Canoa",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      bodega: "San Benito",
      responsable: "Pepito",
      codigoBarras: "154875",
      cantidad: 95,
    },
    {
      codigoArticulo: "9856",
      nombreArticulo: "Pala",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      bodega: "San Benito",
      responsable: "Pepito",
      codigoBarras: "154875",
      cantidad: 10,
    },
    {
      codigoArticulo: "10256",
      nombreArticulo: "Amarillea",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      bodega: "San Benito",
      responsable: "Pepito",
      codigoBarras: "154875",
      cantidad: 25,
    },
    {
      codigoArticulo: "98563",
      nombreArticulo: "Biche",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      bodega: "San Benito",
      responsable: "Pepito",
      codigoBarras: "154875",
      cantidad: 8,
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
    rowSelection: "multiple",
    suppressRowClickSelection: true,
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
          <h3 className="mt-3 text-start mb-3 fw-light ms-3">Formulario Inventario de Revisión de Activos</h3>
            <div className="multisteps-form__content">
            <Subtitle title={"Detalles"} mt={3} />

              {/*  PRIMERA FILA  */}
              <Subtitle title={"Tipo de Artículo"} mt={3} />
              <div className="row ms-1 justify-content-start">
                <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">
                    Código<span className="text-danger">*</span>
                  </label>
                  <input
                    type="search"
                    id="codigoInventario"
                    name="codigoInventario"
                    minlength="2"
                    maxlength="15"
                    defaultValue={"114485"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("codigoInventario", {
                      required: true,
                    })}
                  />
                  {errors.codigoInventario && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                </div>
                <div className="col-12 col-md-3">
                <div className="mb-3">
                  <label className="text-terciary">Nombre</label>
                  <input
                    type="text"
                    id="nombreArticulo"
                    name="nombreArticulo"
                    disabled
                    defaultValue={"Equipo Lenovo"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreArticulo", { required: true })}
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
                    onClick={handleOpenModalArticulos}
                  >
                    Buscar Artículos
                  </button>
                  </div>
                  </div>
              </div>
              {/*  SEGUNDA FILA  */}
              <div className="row ms-1">
              <div className="col-12 col-md-6">
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


                <div className="form-check col-12 col-md-3">
                <div className="mb-3 d-flex flex-column align-items-center">
                  <label className="text-terciary">En Producción</label>
                  <div className="mt-2">
                    <input
                    type="checkbox"
                    id="enProduccion"
                    name="enProduccion"
                    className="form-check-input border border-terciary"
                    {...register("enProduccion", { required: true })}
                  />
                  </div>
                  
                </div>
              </div>
               
                </div>
             
              {/*  TERCERA FILA  */}
              <Subtitle title={"Persona"} mt={3} />
              <div className="row ms-1">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                  <label className="text-terciary">
                    Tipo de documento<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoPersona"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsTipoDocumento} />
                    )}
                  />
                  {errors.tipoDocumentoPersona && (
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
                      id="numeroDocumentoPersona"
                      name="numeroDocumentoPersona"
                      defaultValue={""}
                      placeholder={"Ingrese número de documento"}
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numeroDocumentoPersona", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumentoPersona?.type === "required" && (
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
                      id="nombrePersona"
                      name="nombrePersona"
                      disabled
                      defaultValue={"Jhon Alejandro Lopez"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("nombrePersona", { required: true })}
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
                    Buscar Personal
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
                    Buscar
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
              {/*  CUERPO DEL LA TABLA  */}
              <label className="mt-4 form-control ms-0 fw-bolder text-white text-center" style={{
          background: "#002c42",
        }}>
                  Revisión de Activos
                </label>
              <div id="myGrid" className="ag-theme-alpine mt-2">
                <div
                  className="ag-theme-alpine my-1 mx-3"
                  style={{ height: "270px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefsArticulos}
                    rowData={rowDataArticulos}
                    debounceVerticalScrollbar={true}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
              {/*  TRES FECHAS  */}
              <div className="row ms-1 mt-3">
              <div className="col-12 col-md-3">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-5"
                >
                  Fecha Inicial
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
                        placeholderText="Fecha Inicial"
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
              <div className="col-12 col-md-3">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-5"
                >
                  Última Modificación
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
                        placeholderText="Última Modificación"
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
              <div className="col-12 col-md-3">
                <label
                  className="text-terciary"
                  htmlFor="exampleFormControlInput1 mt-5"
                >
                  Fecha Final
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
                        placeholderText="Fecha Final"
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
              {/*  DOS BOTONES  */}
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
                    Finalizar
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

export default FormularioRevisionInventarioScreen;
