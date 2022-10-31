import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";

const SolicitarArticulosConsumoScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaInicio: "",
  });

  const [isModalActive, setIsModalActive] = useState(false);
  const [isModalArticulo, setIsModalArticulo] = useState(false);

  const handleOpenModal = () => {
    setIsModalActive(true);
  };
  const handleOpenAgregarProducto = () => {
    setIsModalArticulo(true);
  };

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
      codigo: " ",
      nombre: " ",
      observaciones: "",
      cantidad: "",
    },
    {
      codigo: " ",
      nombre: " ",
      observaciones: "",
      cantidad: "",
    },
    {
      codigo: " ",
      nombre: " ",
      observaciones: "",
      cantidad: "",
    },
    {
      codigo: " ",
      nombre: " ",
      observaciones: "",
      cantidad: "",
    },
    {
      codigo: " ",
      nombre: " ",
      observaciones: "",
      cantidad: "",
    },
  ]);

  const columnDefs = [
    { headerName: "Código del artículo", field: "codigo", minWidth: 150 },
    { headerName: "Nombre del artículo", field: "nombre", minWidth: 150 },
    { headerName: "Observaciones", field: "observaciones", minWidth: 150 },
    {
      headerName: "Cantidad",
      field: "cantidad",
      minWidth: 150,
    },
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
            <h4 className="text-right fw-light ms-3 mb-2">
              Solicitar un elemento de consumo
            </h4>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div>
                  <label className="ms-2">Número consecutivo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="número consecutivo"
                    {...register("numeroConsecutivo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-4 mt-2">
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
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Datos del responsable</n>
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
                <div>
                  <label className="ms-2">Número de cédula</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="número cédula"
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
                  type="button"
                  className="mt-4 btn btn-primary flex-center text-capitalize"
                  onClick={handleOpenModal}
                >
                  Buscar
                </button>
              </div>
              <BusquedaDePersonalModal
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
              />
            </div>
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
          <form>
            <div className="col-12 col-sm-12 d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="button"
                className="mt-4 btn btn-primary flex-center text-capitalize"
                onClick={handleOpenAgregarProducto}
              >
                Agregar Producto
              </button>
            </div>
            <BusquedaArticuloModal
              isModalActive={isModalArticulo}
              setIsModalActive={setIsModalArticulo}
            />
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
              <label htmlFor="exampleFormControlInput1 ">
                Observaciones generales
              </label>
              <textarea
                className="multisteps-form__input form-control p-2 mw-100 w-auto"
                type="text"
                placeholder="Observaciones generales"
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
        </form>
      </div>
    </div>
  );
};

export default SolicitarArticulosConsumoScreen;
