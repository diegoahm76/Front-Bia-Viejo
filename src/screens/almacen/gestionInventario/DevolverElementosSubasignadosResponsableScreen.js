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
        <h3 className="mt-3 mb-0 text-center mb-6">
          Devolver Elementos Subasignados al Responsable
        </h3>

        {/*  CUERPO DEL FORMULARIO  */}

        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row my-3">
                <div className="col-12 col-sm-6">
                  <h5 className="font-weight-bolder border-radius-xl my-2">
                    Devolucion de Activos Subasignados
                  </h5>
                </div>
              </div>

              {/*  PRIMERA FILA  */}
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
              {/*  SEGUNDA FILA  */}
              <div className="row">
                <label className="mt-4 form-control ms-0 fw-bolder text-center">
                  Operario
                </label>
                <div className="col-12 col-md-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de documento <span className="text-danger">*</span>
                    <div className="col-12">
                      <Controller
                        name="tipoDocumentoOperario"
                        control={control}
                        defaultValue={optionsTipoDocumento[0]}
                        rules={{
                          required: true,
                        }}
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
                  <div className="form-floating input-group input-group-dynamic disabled">
                    <input
                      className="form-control"
                      type="number"
                      {...register("numeroDocumentoOperario", {
                        required: true,
                      })}
                      placeholder="numero documento"
                      defaultValue={"1121919374"}
                    />
                    <label className="ms-2">
                      Número de documento
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errors.numeroDocumentoOperario?.type === "required" && (
                    <small className="text-danger">
                      El campo es requerido*
                    </small>
                  )}
                </div>
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic disabled">
                    <input
                      className="form-control"
                      type="text"
                      {...register("nombreOperario")}
                      placeholder="Nombre Completo"
                      value="Jhon Alejandro Lopez Ramos"
                      disabled
                      id="nombreOperario"
                    />
                    <label className="ms-2">Nombre completo</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-end">
                  <button
                    type="submit"
                    onClick={handleOpenModalBusquedaPersonal}
                    className="mt-0 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar
                  </button>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                  <button
                    type="submit"
                    title="Send"
                    form="configForm"
                    Value="buscar"
                    id="almacen"
                    className="mt-4 btn btn-primary flex-center text-capitalize"
                  >
                    Buscar Activos
                  </button>
                </div>
              </div>

              <div>
                <label className="mt-4 form-control ms-0 fw-bolder text-center">
                  Contratistas
                </label>
                <div id="myGrid" className="ag-theme-alpine mt-2">
                  <div
                    className="ag-theme-alpine my-1"
                    style={{ height: "300px" }}
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

                <label className="mt-4 form-control ms-0 fw-bolder text-center">
                  Artículos Subasignados
                </label>
                <div id="myGrid" className="ag-theme-alpine mt-2">
                  <div
                    className="ag-theme-alpine my-1"
                    style={{ height: "300px" }}
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
                  <div className="col-12 col-md-12 d-grid gap-2 d-md-flex justify-content-center">
                    <button
                      type="button"
                      className="mt-4 mx-4 btn btn-primary flex-center text-capitalize"
                      onClick={"null"}
                    >
                      Guardar
                    </button>
                    <button
                      type="submit"
                      title="Send"
                      form="configForm"
                      className="mt-4 btn btn-light flex-center text-capitalize"
                    >
                      Limpiar
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
      </div>
    </div>
  );
}

export default DevolverElementosSubasignadosResponsableScreen;
