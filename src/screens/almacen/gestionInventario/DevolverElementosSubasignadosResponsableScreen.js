import React, { useRef, useState } from "react";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import { useDispatch } from "react-redux";
import Subtitle from "../../../components/Subtitle";
import "react-datepicker/dist/react-datepicker.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const optionsTipoDocumento = [
  { label: "C.C.", value: "CC" },
  { label: "T.I.", value: "TI" },
];

function DevolverElementosSubasignadosResponsableScreen() {
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

  const actionButton = (params) => {
    console.log(params);
    alert(`${params.data.nombreComun} ${params.data.disponibleVivero}`);
  };

  let gridApi;

  const columnDefsContratistas = [
    {
      headerName: "C.C. Identificación",
      field: "cedula",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Nombre del contratista",
      field: "nombreContratista",
      minWidth: 100,
      wrapText: true,
    },
    {
      headerName: "Grupo",
      field: "grupo",
      minWidth: 100,
      wrapText: true,
    },
  ];

  const rowDataContratistas = [
    {
      cedula: "1.102.555",
      nombreContratista: "Pepito",
      grupo: "Aire y Urbano",
    },
    { cedula: "129.856", nombreContratista: "Ana Maria", grupo: "Rentas" },
    {
      cedula: "100.256.125",
      nombreContratista: "Julian Santiago",
      grupo: "Aire y Urbano",
    },
    {
      cedula: "11.025.256",
      nombreContratista: "Esteban",
      grupo: "Contabilidad",
    },
  ];

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
      headerName: "Fecha de Subasignación",
      field: "fechaSubasignacion",
      minWidth: 100,
      wrapText: true,
    },

    {
      headerName: "Devuelto",
      field: "devuelto",
      width: 100,
      minWidth: 100,
      maxWidth: 200,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
  ];

  const rowDataArticulos = [
    {
      codigoArticulo: "1025",
      nombreArticulo: "Canoa",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      fechaSubasignacion: "10/20/2022",
      cantidad: 95,
    },
    {
      codigoArticulo: "9856",
      nombreArticulo: "Pala",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      fechaSubasignacion: "10/20/2022",
      cantidad: 10,
    },
    {
      codigoArticulo: "10256",
      nombreArticulo: "Amarillea",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      fechaSubasignacion: "10/20/2022",
      cantidad: 25,
    },
    {
      codigoArticulo: "98563",
      nombreArticulo: "Biche",
      idUnico: "0000586",
      marca: "Lenovo",
      serial: "ndg589",
      fechaSubasignacion: "10/20/2022",
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

  // MODAL BUSQUEDA PERSONA

  const [modalPersonal, setModalPersonal] = useState(false);

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
          Devolver Elementos Subasignados al Responsable
          </h3>
            <div className="multisteps-form__content">
            <Subtitle title={"Devolucion de Activos Subasignados"} mt={3} />

              {/*  PRIMERA FILA  */}
              <Subtitle title={"Responsable"} mt={3} />
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
                    id="numeroDocumentoResponsable"
                    name="numeroDocumentoResponsable"
                    disabled
                    defaultValue={"112264899"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroDocumentoResponsable", {
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
                    id="nombreResponsable"
                    name="nombreResponsable"
                    disabled
                    defaultValue={"Jhon Alejandro Lopez"}
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreResponsable", { required: true })}
                  />
                </div>
              </div>
            </div>
              {/*  SEGUNDA FILA  */}
              <Subtitle title={"Operario"} mt={3} />
              <div className="row ms-1">
                <div className="col-12 col-md-3 align-content-end align-items-end">
                  <label className="text-terciary">
                    Tipo de documento<span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumentoOperario"
                    control={control}
                    defaultValue={optionsTipoDocumento[0]}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select {...field} options={optionsTipoDocumento} />
                    )}
                  />
                  {errors.tipoDocumentoOperario && (
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
                      id="numeroOperario"
                      name="numeroOperario"
                      defaultValue={""}
                      placeholder={"Ingrese número de documento"}
                      className="form-control border border-terciary rounded-pill px-3"
                      {...register("numeroOperario", {
                        required: true,
                      })}
                    />
                  </div>
                  {errors.numeroOperario?.type === "required" && (
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
                      id="nombreOperario"
                      name="nombreOperario"
                      disabled
                      defaultValue={"Jhon Alejandro Lopez"}
                      className="form-control border rounded-pill px-3 border-terciary"
                      {...register("nombreOperario", { required: true })}
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
                    Buscar Activos
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

              <div>
                <label className="mt-4 form-control ms-0 fw-bolder text-white text-center" style={{
          background: "#002c42",
        }}>
                  Contratistas
                </label>
                <div id="myGrid" className="ag-theme-alpine mt-2">
                  <div
                    className="ag-theme-alpine my-1 mx-3"
                    style={{ height: "250px" }}
                  >
                    <AgGridReact
                      columnDefs={columnDefsContratistas}
                      rowData={rowDataContratistas}
                      debounceVerticalScrollbar={true}
                      defaultColDef={defaultColDef}
                      onGridReady={onGridReady}
                    ></AgGridReact>
                  </div>
                </div>

                <label className="mt-4 form-control ms-0 fw-bolder text-white text-center" style={{
          background: "#002c42",
        }}>
                  Artículos Subasignados
                </label>
                <div id="myGrid" className="ag-theme-alpine mt-2">
                  <div
                    className="ag-theme-alpine my-1 mx-3"
                    style={{ height: "250px" }}
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
                    Limpiar
                  </button>
                </div>
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
      </div>
    </div>
  );
}

export default DevolverElementosSubasignadosResponsableScreen;
