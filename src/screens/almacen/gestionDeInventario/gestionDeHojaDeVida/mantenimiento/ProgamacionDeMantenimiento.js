import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
<<<<<<< HEAD
import DatePicker from "react-datepicker";
import BusquedaDePersonalModal from "../../../../../components/BusquedaArticuloModal"
=======
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaDePersonalModal from "../../../../../components/BusquedaArticuloModal";
>>>>>>> 6ee102a4e23b7fb58b713f4489ce09ec8ff9099f
import BusquedaArticuloModal from "../../../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../../../components/MarcaDeAgua1";

const ProgamacionDeMantenimiento = () => {
  const [startDate, setStartDate] = useState(new Date());

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

  const { register, control, handleSubmit } = useForm();

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
            disabled="true"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Programación mantenimiento
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative "
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="multisteps-form__content">
              <div className="row">
                <div className="col-12 col-sm-4 ">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de solicitud
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
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Articulo</n>
                </label>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="numero cedula"
                      {...register("numeroCedula")}
                    />
                    <label className="ms-2">Codigo</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="numero cedula"
                      disabled="true"
                    />
                    <label className="ms-2">Nombre</label>
                  </div>
                </div>
                <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn bg-gradient-primary mb-0 text-capitalize my-2"
                    type="button"
                    title="Send"
                    form="configForm"
                    onClick={() => setBusquedaPersonalIsActive(true)}
                  >
                    Buscar personal
                  </button>
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo{" "}
                  <div className="col-12 ">
                    <Controller
                      name="tipoDocumento2"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={options}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>

              <div className="row">
                <div className="col-12 col-sm-12">
                  <label className="form-control ms-0 text-left mt-3">
                    <n>Datos del artículo:</n>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-4">
                  <label className="form-control ms-0 text-center mt-1 ">
                    <n>Marca:</n>
                  </label>
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      disabled="true"
                    />
                    <label className="ms-2">Lenovo</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-control ms-0 text-center mt-1 ">
                    <n>Serial/Placa:</n>
                  </label>
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      disabled="true"
                    />
                    <label className="ms-2">k8363ju462</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-control ms-0 text-center mt-1 ">
                    <n>Modelo:</n>
                  </label>
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      disabled="true"
                    />
                    <label className="ms-2">V14-ADA</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-control ms-0 text-center mt-1 ">
                    <n>Kilometraje:</n>
                  </label>
                  <div className="form-floating input-group input-group-dynamic ms-2">
                    <input
                      className="form-control"
                      type="text"
                      disabled="true"
                    />
                    <label className="ms-2">12.603</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-12">
                  <label className="form-control ms-0 text-left mt-3">
                    <n>Detalles:</n>
                  </label>
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tipo de mantenimiento{" "}
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
                  </label>
                </div>
              </div>
              <div className="row mb-4">
                <label className="form-control ms-0 text-center mt-3">
                  <n>Especificaciones técnicas</n>
                </label>
                <div className="input-group input-group-dynamic flex-column my-3">
                  <textarea
                    className="multisteps-form__textarea form-control p-0 w-auto ms-1"
                    type="number"
                    placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                    name="nombre"
                    {...register("nombre", { required: true })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-sm-12">
                  <label className="form-control ms-0 text-left mt-3">
                    <n>Programar por fechas:</n>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Programación{" "}
                    <div className="col-12 ">
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
                  </label>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="numero cedula"
                      {...register("numeroCedula")}
                    />
                    <label className="ms-2">Cada</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Tiempo{" "}
                    <div className="col-12 ">
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
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-4 ">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de solicitud
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
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-5">
                    <div className="form-check form-switch d-flex align-items-center mt-3">
                      <label className="form-check ">
                        Incluir sabados y domingos
                      </label>
                      <input
                        className="form-check ms-3"
                        type="checkbox"
                        id="rememberMe"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-5">
                    <div className="form-check form-switch d-flex align-items-center mt-3">
                      <label className="form-check">Incluir festivos</label>
                      <input
                        className="form-check ms-7"
                        type="checkbox"
                        id="rememberMe"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                <button
                  className="btn bg-gradient-primary me-md-2"
                  type="button"
                  title="Send"
                >
                  Agregar
                </button>
              </div>

              <div className="row">
                <label className="form-floating input-group input-group-dynamic justify-content-center ">
                  Previsualización
                </label>
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
                  type="button"
                  title="Send"
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
  );
};

export default ProgamacionDeMantenimiento;
