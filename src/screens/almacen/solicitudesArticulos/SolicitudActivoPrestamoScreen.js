import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker from "react-datepicker";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useDispatch } from "react-redux";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";

const SolicitudActivoPrestamoScreen = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalArticulo, setIsModalArticulo] = useState(false); 

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
      codigo: "",
      nombre: " ",
      cantidad: "",
      fechaentrega: "",
    },
    {
      codigo: "",
      nombre: " ",
      cantidad: "",
      fechaentrega: "",
    },
    {
      codigo: "",
      nombre: " ",
      cantidad: "",
      fechaentrega: "",
    },
    {
      codigo: "",
      nombre: " ",
      cantidad: "",
      fechaentrega: "",
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
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleOpenAgregarProducto = () => {
    setIsModalArticulo(true);
  };

  return (
    <div className="row min-vh-100 ">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Solicitar un elemento activo en prestamo
        </h3>
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
            <div className="row">
              <div className="col-12 col-sm-4">
                <div >
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
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
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
                          options={optionsTipoDocumento}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </label>
              </div>
              <div className="col-12 col-sm-4">
                <div >
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
                <div >
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
                  type="button"
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                  onClick={handleOpenModal}
                >
                  Buscar
                </button>
              </div>
            </div>
            <BusquedaDePersonalModal
              isModalActive={isModalActive}
              setIsModalActive={setIsModalActive}
            />
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <label className="form-control ms-0 fw-bolder text-center">
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
                <div >
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
                <div >
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
          <form>
            <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="button"
                onClick={handleOpenAgregarProducto}
                className="mt-4 btn btn-primary flex-center text-capitalize"
              >
                Agregar Producto
              </button>
            </div>
            <div
              className="ag-theme-alpine mt-2 mb-4"
              style={{ height: "300px" }}
            >
              <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
            <div className="input-group input-group-dynamic flex-column mt-3">
              <label htmlFor="exampleFormControlInput1 ">Observaciones</label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                placeholder="Observaciones"
                rows="3"
                name="Observaciones"
              />
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-primary text-white text-capitalize"
                type="submit"
                title="Send"
              >
                Guardar
              </button>
            </div>
          </form>
          <BusquedaArticuloModal
            isModalActive={isModalArticulo}
            setIsModalActive={setIsModalArticulo}
          />
        </form>
      </div>
    </div>
  );
};

export default SolicitudActivoPrestamoScreen;
