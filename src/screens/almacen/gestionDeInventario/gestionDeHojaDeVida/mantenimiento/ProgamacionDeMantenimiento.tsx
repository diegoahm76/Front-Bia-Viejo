import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import BusquedaDePersonalModal from "../../../../../components/BusquedaArticuloModal";
import BusquedaArticuloModal from "../../../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../../../components/MarcaDeAgua1";

import Subtitle from "../../../../../components/Subtitle"

const ProgamacionDeMantenimiento = () => {

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


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const options = [
    { label: "Árticulo", value: "AR" },
    { label: "Vehiculo", value: "VE" },
    { label: "Otro", value: "OT" },
  ];

  const opcionMantenimiento = [
    { label: "Preventivo", value: "PR" },
    { label: "Correctivo", value: "CO" },
    { label: "Otro", value: "OT" },
  ];

  const opcionProgramar = [
    { label: "Manual", value: "MA" },
    { label: "Automatica", value: "AU" },
    { label: "Otro", value: "OT" },
  ];

  const opcionProgramarFecha = [
    { label: "Semanas", value: "SE" },
    { label: "Meses", value: "ME" },
  ];

  const defaultColDef = {
    sortable: true,
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

  let gridApi;
  const rowData = [
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
    {
      CO: 122334,
      SP: "jd72123",
      KI: ".................",
      TI: "05/07/2022",
      X: ".",
    },
  ];
  const columnDefs = [
    { headerName: "Código", field: "CO", minWidth: 150 },
    { headerName: "Serial/Placa", field: "SP", minWidth: 150 },
    { headerName: "Kilometraje", field: "KI", minWidth: 150 },
    { headerName: "Tipo de mantenimiento", field: "TI", minWidth: 150 },
    {
      headerName: "",
      field: "X",
      minWidth: 150,
      cellRendererFramework: (params) => (
        <div className="form-check form-switch d-flex align-items-center mt-3">
          <input
            className="form-check"
            type="checkbox"
            id="rememberMe"
            disabled={true}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="mt-3 mb-0 mb-2 ms-3 fw-light text-terciary">
              Programacion mantenimiento
            </h3>
            <MarcaDeAgua1>
              <Subtitle title="Articulo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2 justify-content-md-end">
                <div className="col-12 col-md-3 mb-3 ">
                  <label className="text-terciary">
                    Fecha de solicitud {""}<span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Escribe el nombre del vivero"
                    {...register("fechaSolicitud", { required: true })}
                  />
                  {errors.fechaSolicitud && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
              </div>
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Código: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("numeroCodigoArticulo", { required: true })}
                  />
                  {errors.numeroCodigoArticulo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Nombre: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("nombreArticulo", { required: true })}
                  />
                  {errors.nombreArticulo && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo{" "}
                  </label>
                  <div className="col-12 ">
                    <Controller
                      name="tipoArticulo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Seleccionar"
                        // {...register("tipoArticulo", { required: true })}  
                        />
                      )}
                    />

                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn-min-width border rounded-pill px-3 btn bg-gradient-primary"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar articulo
                  </button>
                </div>
              </div>

              {/* <Subtitle title="Datalles del articulo" mt={3} /> */}
              {/* <div className="row d-flex align-items-center mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Marca: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("marcaArticulo", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Serial/Placa: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("serialArticulo", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Modelo: <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control border border-terciary rounded-pill px-3"
                  // {...register("modeloArticulo", { required: true })}
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Kilometraje: <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                  />
                </div>
              </div> */}

              <Subtitle title="Articulo" mt={3} />
              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tipo de mantenimiento{" "} <span className="text-danger">*</span>
                  </label>
                  <div className="col-12 ">
                    <Controller
                      name="tipoMantenimiento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={opcionMantenimiento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-md-3 mb-3">
                    <label className="text-terciary">
                      Motivo Mantenimiento: <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control border border-terciary rounded-pill px-3"
                      // {...register("nombreArticulo", { required: true })}
                    />
                  </div>
                </div>
              </div>
              <div className="row d-flex align-items-center mb-2 mx-2">
                <div className="col-12">
                  <label className="text-terciary">
                    Especificaciones tecnicas: <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control border rounded-pill px-3"
                    placeholder="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
                    rows={3}
                  />
                </div>
                {errors.nombre && <p className="text-danger">Este campo es obligatorio</p>}
              </div>

              <Subtitle title="Programar por fechas" mt={3} />

              <div className="row d-flex align-items-center mx-2 mt-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Programación{" "}
                  </label>
                  <Controller
                    name="programarFecha"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcionProgramar}
                        placeholder="Seleccionar"
                      />
                    )}
                  />

                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Cada: 
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    {...register("cadaNumero", { required: true })}
                  />

                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Tiempo{" "}
                  </label>
                  <Controller
                    name="fecha"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={opcionProgramarFecha}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>

                <div className="col-12 col-md-3 mb-3 ">
                  <label className="text-terciary">
                    Fecha generada  {""} {/*<span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Escribe el nombre del vivero"
                  // {...register("fechaSolicitud", { required: true })}
                  />
                  {/* {errors.fechaSolicitud && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )} */}
                </div>
              </div>
              <div className="row d-flex align-items-end mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Fecha programada {""} {/*<span className="text-danger">*</span> */}
                  </label>
                  <input
                    type="date"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Escribe el nombre del vivero"
                  // {...register("fechaSolicitud", { required: true })}
                  />
                </div>
              </div>


              {/* <div className="row d-flex align-items-end mx-2">
                <div className="form-check col-md-5 col-12 ps-0 pe-10 ms-3 mb-3 d-flex">
                  <label className="form-check-label text-terciary"
                  >
                    Incluir sabados y domingos {""} 
                  </label>
                  <input
                    className="form-check-input "
                    type="checkbox"
                    value=""
                    id="incluirFines"
                    {...register("IncluirFinSemana")}
                  />
                </div>
              </div> */}
              {/* <div className="row d-flex align-items-end mx-2">
                <div className="form-check col-md-4 col-12 ps-0 pe-10 ms-3 d-flex">
                  <label className="form-check-label text-terciary"
                  >
                    Incluir festivos {""}
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="incluirFestivos"
                    {...register("incluirFestivos")}
                  />
                </div>
              </div> */}

              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Agregar
                </button>
              </div>

              <Subtitle title="Programar por kilometraje" mt={3} />

              <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    1) Al llegar a:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
              </div>
              {/* <div className="row d-flex align-items-end mt-2 mx-2">
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    2) Cada:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
                <div className="col-12 col-md-3 mb-3">
                  <label className="text-terciary">
                    Hasta:
                  </label>
                  <input
                    type="number"
                    className="form-control border border-terciary rounded-pill px-3"
                    placeholder="Kilometros"
                  />
                </div>
              </div> */}

              <Subtitle title="Previsualizacion" mt={3} />

              <div className="row">
                <div
                  className="ag-theme-alpine mt-3 mb-4 px-4"
                  style={{ height: "275px" }}
                >
                  <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                  ></AgGridReact>
                </div>
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Limpiar
                </button>
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="submit"
                >
                  Guardar
                </button>
                <button
                  className="btn bg-gradient-danger "
                  type="button"
                  title="Send"
                >
                  Salir
                </button>

              </div>
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
    </div>
  );
};

export default ProgamacionDeMantenimiento;
