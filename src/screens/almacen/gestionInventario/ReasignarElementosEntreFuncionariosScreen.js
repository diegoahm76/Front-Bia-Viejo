import React, { useRef, useState } from "react";
import Select from "react-select";
import Subtitle from "../../../components/Subtitle";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
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

function ReasignarElementosEntreFuncionariosScreen() {
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

  const optionsEstado = [
    { label: "Bueno", value: "B" },
    { label: "Malo", value: "M" },
    { label: "Defectuoso", value: "D" },
  ];

  let gridApi;
  const columnDefs = [
    {
      headerName: "Código",
      field: "codigo",
      minWidth: 20,
      maxWidth: 100,
      width: 30,
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
      headerName: "Valor Unitario",
      field: "valorUnitario",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Estado",
      field: "estado",
      minWidth: 100,
      wrapText: true,
      // cellRendererFramework: (params) => (
      //   <div>
      //     <Controller
      //       name="estado"
      //       control={control}
      //       defaultValue={optionsEstado[0]}
      //       rules={{
      //         required: true,
      //       }}
      //       render={({ field }) => (
      //         <Select
      //           {...field}
      //           options={optionsEstado}
      //           placeholder="Seleccionar"
      //         />
      //       )}
      //     />
      //   </div>
      // ),
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
            placeholder="Incluya concepto"
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
    {
      codigo: "1025",
      nombre: "Canoa",
      id: 95,
      marca: "lenovo",
      serial: 86842,
      valorUnitario: "1.150.100",
      estado: "Defectuoso",
      justificacion: "Necesario",
    },
    {
      codigo: "9856",
      nombre: "Pala",
      id: 10,
      marca: "lenovo",
      serial: 86842,
      valorUnitario: "1.150.100",
      estado: "Malo",
      justificacion: "Necesario",
    },
    {
      codigo: "10256",
      nombre: "Amarillea",
      id: 25,
      marca: "lenovo",
      serial: 86842,
      valorUnitario: "1.150.100",
      estado: "Bueno",
      justificacion: "Necesario",
    },
    {
      codigo: "98563",
      nombre: "Biche",
      id: 8,
      marca: "lenovo",
      serial: 86842,
      valorUnitario: "1.150.100",
      estado: "Malo",
      justificacion: "Necesario",
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
            <h3 className="mt-3 text-start mb-3 fw-light ms-3">
              Reasignación de Elementos entre Funcionarios
            </h3>
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
                      id="consecutivoReasignarElementosFuncionarios"
                      name="consecutivo"
                      minlength="2"
                      maxlength="15"
                      defaultValue={"25225"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register(
                        "consecutivoReasignarElementosFuncionarios",
                        { required: true }
                      )}
                    />
                    {errors.consecutivoReasignarElementosFuncionarios && (
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
                  <label className="text-terciary" htmlFor="exampleFormControlInput1 mt-5">
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
                          className="form-control border rounded-pill px-3 mt-2 border-terciary"
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
              <Subtitle title={"Quien entrega"} mt={3} />
              <div className="row ms-1">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                  <label className="text-terciary">
                    Tipo de documento<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoQuienEntrega"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsTipoDocumento} />
                    )}
                  />
                  {errors.tipoDocumentoQuienEntrega && (
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
                      id="nombreQuienEntrega"
                      name="nombreQuienEntrega"
                      disabled
                      defaultValue={"Jhon Alejandro Lopez"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("nombreQuienEntrega", { required: true })}
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
              
              {/*  TERCERA FILA  */}
              <Subtitle title={"Quien recibe"} mt={3} />
              <div className="row ms-1">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                  <label className="text-terciary">
                    Tipo de documento<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoQuienRecibe"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsTipoDocumento} />
                    )}
                  />
                  {errors.tipoDocumentoQuienRecibe && (
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
                      id="numeroDocumentoQuienRecibe"
                      name="numeroDocumentoQuienRecibe"
                      defaultValue={""}
                      placeholder={"Ingrese número de documento"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("numeroDocumentoQuienRecibe", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroDocumentoQuienRecibe?.type === "required" && (
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
                      id="nombreQuienRecibe"
                      name="nombreQuienRecibe"
                      disabled
                      defaultValue={"Jhon Alejandro Lopez"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("nombreQuienRecibe", { required: true })}
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

              <div className="input-group mx-2 input-group-dynamic flex-column mt-4 mb-2 px-1">
                <label className="text-terciary">Concepto<span className="text-danger">*</span></label>
                <textarea
                  className="p-2 mw-100 w-auto border border-terciary rounded-pill px-4"
                  type="text"
                  placeholder="Incluya concepto"
                  rows="3"
                  name="concepto"
                  {...register("concepto", {
                    required: true,
                  })}                  
                />
                {errors.concepto?.type === "required" && (
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

            <Subtitle title={"Detalles"} mt={3} />
              <div id="myGrid" className="ag-theme-alpine mt-4">
                <div
                  className="ag-theme-alpine my-1 mx-3"
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

export default ReasignarElementosEntreFuncionariosScreen;
