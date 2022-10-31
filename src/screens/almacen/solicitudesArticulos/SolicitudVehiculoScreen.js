import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import CalendarModal from "../../../components/CalendarModal";
import { useDispatch } from "react-redux";

const SolicitudVehiculoScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaSalida: "",
    fechaLlegada: "",
  });

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  const [rowData] = useState([
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
    {
      nombre: "Palo cruz",
      especie: " ",
      vivero: "",
      lote_siembra: "",
      cantidad: "",
      cantidad_sembrada: "",
      total: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Código Artículo", field: "codigo", minWidth: 150 },
    { headerName: "Nombre del artículo", field: "nombre", minWidth: 150 },
    { headerName: "Cantidad", field: "cantidad", minWidth: 150 },
    {
      headerName: "Fecha entrega",
      field: "fechaEntrega",
      minWidth: 150,
    },
  ];
  const [rowBuscar] = useState([
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
    {
      nombre: " ",
      tipoDocumento: " ",
      documento: "",
      dependencia: "",
      grupo: "",
    },
  ]);

  const columnBuscar = [
    { headerName: "Nombre", field: "nombre", minWidth: 150 },
    { headerName: "Tipo documento", field: "tipoDocumento", minWidth: 150 },
    { headerName: "Documento", field: "documento", minWidth: 150 },
    {
      headerName: "Dependecia",
      field: "dependencia",
      minWidth: 150,
    },
    { headerName: "Grupo", field: "grupo", minWidth: 150 },
  ];

  const optionsTipoDocumento = [
    { label: "C.C", value: "CC" },
    { label: "T.I", value: "TI" },
  ];

  const optionsDependencia = [
    { label: "Dependencia 1", value: "D1" },
    { label: "Dependencia 2", value: "D2" },
    { label: "Dependencia 3", value: "D3" },
  ];

  const optionsGrupo = [
    { label: "Grupo 1", value: "G1" },
    { label: "Grupo 2", value: "G2" },
    { label: "Grupo 3", value: "G3" },
  ];

  const optionsSiNo = [
    { label: "Si", value: "si" },
    { label: "No", value: "no" },
  ];

  let gridApi;
  const defaultColDef = {
    sortable: true,
    editable: true,
    flex: 1,
    filter: true,
    wrapHeaderText: true,
    resizable: true,
    initialWidth: 200,
    autoHeaderHeight: true,
    suppressMovable: true,
  };
  const [startDate, setStartDate] = useState(new Date());

  const onGridReady = (params) => {
    gridApi = params.api;
  };

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(activeModalAction());
  };

  const handleCloseModal = () => {
    dispatch(desactiveModalAction());
  };

  return (
    <div className="row min-vh-100 ">
      <div className="col-12 mx-auto">
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
          <h4 className="text-rigth  fw-light mb-3 mb-2">
            Solicitud de vehículo
          </h4>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Numero consecutivo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero consecutivo"
                    {...register("numeroConsecutivo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label htmlFor="exampleFormControlInput1">
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
                        className="form-control border rounded-pill px-3 mt-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </label>
              </div>
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <label
                className="form-control ms-0 fw-bolder text-right ps-2 border rounded-pill text-white"
                style={{
                  backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                }}
              >
                <n>Datos del solicitante</n>
              </label>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Tipo de documento</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="tipo de documento"
                    value="C.C."
                    disabled
                    {...register("documento")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Número de cedula</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    value="1121919374"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Nombre completo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    value="Ludy Angélica León Quiroga"
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <label
                className="form-control ms-0 fw-bolder text-right ps-2 border rounded-pill text-white"
                style={{
                  backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                }}
              >
                <n>Datos del coordinador</n>
              </label>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de documento{" "}
                  <div className="col-12 ">
                    <Controller
                      name="tipoDocumento"
                      control={control}
                      defaultValue={optionsTipoDocumento[0]}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="mt-3"
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Número de cedula</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Nombre completo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    {...register("nombreCompleto")}
                  />
                </div>
              </div>
              <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                  type="submit"
                  className="mt-4 btn btn-primary border rounded-pill flex-center text-capitalize"
                  onClick={handleOpenModal}
                >
                  Buscar
                </button>
              </div>
              <label
                className="form-control ms-0 fw-bolder text-right ps-2 border rounded-pill text-white"
                style={{
                  backgroundImage: "linear-gradient(45deg, #67b136, #39aad4)",
                }}
              >
                <n>Información de la solicitud</n>
              </label>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Dependecia{" "}
                  <div className="col-12 ">
                    <Controller
                      name="dependencia"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsDependencia}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
                <CalendarModal>
                  <div className="row min-vh-100 ">
                    <div className="col-12 mx-auto">
                      <h3 className="mt-3 mb-0 text-center mb-0">
                        Busqueda de personal
                      </h3>
                      <form
                        className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
                        data-animation="FadeIn"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <label
                          className="form-control ms-0 fw-bolder text-right ps-2 border rounded-pill text-white"
                          style={{
                            backgroundImage:
                              "linear-gradient(45deg, #67b136, #39aad4)",
                          }}
                        >
                          <n>Información de persona</n>
                        </label>
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <label className="form-floating input-group input-group-dynamic ms-2">
                              Tipo de documento{" "}
                              <div className="col-12 ">
                                <Controller
                                  name="tipoDocumento"
                                  control={control}
                                  defaultValue={optionsTipoDocumento[0]}
                                  rules={{
                                    required: true,
                                  }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="mt-3"
                                      options={optionsTipoDocumento}
                                      placeholder="Seleccionar"
                                    />
                                  )}
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div>
                              <label className="ms-2">Número de cedula</label>
                              <input
                                className="form-control border rounded-pill px-3"
                                type="number"
                                placeholder="numero cedula"
                                {...register("numeroCedula")}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <div>
                              <label className="ms-2">Nombre completo</label>
                              <input
                                className="form-control border rounded-pill px-3"
                                type="text"
                                placeholder="nombre completo"
                                {...register("nombreCompleto")}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-floating input-group input-group-dynamic ms-2">
                              Dependecia{" "}
                              <div className="col-12">
                                <Controller
                                  name="dependencia"
                                  control={control}
                                  rules={{
                                    required: true,
                                  }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      className="mt-3"
                                      options={optionsDependencia}
                                      placeholder="Seleccionar"
                                    />
                                  )}
                                />
                              </div>
                            </label>
                          </div>
                          <div className="col-12 col-sm-6">
                            <label className="form-floating input-group input-group-dynamic ms-2">
                              Grupo{" "}
                              <div className="col-12">
                                <Controller
                                  name="grupo"
                                  control={control}
                                  rules={{
                                    required: true,
                                  }}
                                  render={({ field }) => (
                                    <Select
                                      {...field}
                                      options={optionsGrupo}
                                      placeholder="Seleccionar"
                                    />
                                  )}
                                />
                              </div>
                            </label>
                          </div>
                          <div
                            className="ag-theme-alpine mt-4 mb-4"
                            style={{ height: "300px" }}
                          >
                            <AgGridReact
                              columnDefs={columnBuscar}
                              rowData={rowBuscar}
                              defaultColDef={defaultColDef}
                              onGridReady={onGridReady}
                            ></AgGridReact>
                          </div>
                          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                            <button
                              className="btn bg-primary me-md-2 text-white border rounded-pill text-capitalize"
                              type="submit"
                              onClick={handleCloseModal}
                              title="Send"
                            >
                              Limpiar
                            </button>
                            <button
                              className="btn bg-primary me-md-2 text-white border rounded-pill  text-capitalize"
                              type="submit"
                              onClick={handleCloseModal}
                              title="Send"
                            >
                              Aceptar
                            </button>
                            <button
                              className="btn bg-light text-white border rounded-pill  text-capitalize"
                              type="button"
                              onClick={handleCloseModal}
                              title="Send"
                            >
                              Salir
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </CalendarModal>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Grupo{" "}
                  <div className="col-12 ">
                    <Controller
                      name="grupo"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsGrupo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="input-group input-group-dynamic flex-column mt-3 mb-3">
                <label htmlFor="exampleFormControlInput1 ">
                  Motivo de salida
                </label>
                <textarea
                  className="multisteps-form__input form-control p-2 mw-100 w-auto"
                  type="text"
                  placeholder="motivo de salida"
                  rows="3"
                  name="motivosalida"
                />
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Número expediente</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Capacidad de pasajeros</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2 mt-2">
                  ¿Acompañamiento policial o militar?{" "}
                  <div className="col-12 ">
                    <Controller
                      name="acompañamiento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsSiNo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2 ">
                  Transporta carga{" "}
                  <div className="col-12 ">
                    <Controller
                      name="capacidad"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsSiNo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Departamento{" "}
                  <div className="col-12 ">
                    <Controller
                      name="departamento"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsSiNo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2 ">
                  Municipio{" "}
                  <div className="col-12 ">
                    <Controller
                      name="municipio"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={optionsSiNo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Predio{" "}
                  <div className="col-12 ">
                    <Controller
                      name="predio"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          className="mt-2"
                          options={optionsSiNo}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label htmlFor="exampleFormControlInput1 mt-4">
                  Fecha de salida
                  <Controller
                    name="fechaSalida"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        selected={formValues.fechaSalida}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaSalida: e })
                        }
                        className="form-control border rounded-pill px-3 mt-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <label htmlFor="exampleFormControlInput1">
                  Fecha de llegada
                  <Controller
                    name="fechallegada"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        selected={formValues.fechaLlegada}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaLlegada: e })
                        }
                        className="form-control border rounded-pill px-3 mt-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </label>
              </div>
              <div className="input-group input-group-dynamic flex-column mt-3">
                <label htmlFor="exampleFormControlInput1 ">
                  Observaciones adicionales
                </label>
                <textarea
                  className="multisteps-form__input form-control p-2 mw-100 w-auto"
                  type="text"
                  placeholder="Observaciones adicionales"
                  rows="3"
                  name="Observacionesadicionales"
                />
              </div>
            </div>
          </form>
          <form>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-primary me-md-2 text-white border rounded-pill text-capitalize"
                type="submit"
                title="Send"
              >
                Guardar
              </button>
              <button
                className="btn bg-primary text-white border rounded-pill text-capitalize"
                type="submit"
                title="Send"
              >
                Limpiar
              </button>
            </div>
          </form>
        </form>
      </div>
    </div>
  );
};

export default SolicitudVehiculoScreen;
