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
import Subtitle from "../../../components/Subtitle";

const SolicitarElementoConsumoViveroScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaInicio: "",
  });

  const [native, setNative] = useState("");
  const onNativeChange = (e) => {
    setNative(e.target.value);
  };

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

  const handleOpenModal = () => {
    setIsModalActive(true);
  };

  const handleOpenAgregarProducto = () => {
    setIsModalArticulo(true);
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
            <h3 className="text-right fw-light ms-3 mb-4">
              Solicitar un elemento de consumo de vivero
            </h3>
            <div className="row">
              <Subtitle title="Informacón de la solicitud" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">Numero consecutivo</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="number"
                    placeholder="numero consecutivo"
                    {...register("numeroConsecutivo")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <label className="text-terciary">
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
                        className="form-control border-terciary border rounded-pill px-3 mt-2"
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
              <Subtitle title="Datos del responsable " mb="3" />
              <div className="col-12 col-sm-3">
                <label className="form-floating  text-terciary input-group input-group-dynamic ms-3">
                  Tipo de documento
                </label>
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
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    {...register("nombreCompleto")}
                  />
                </div>
              </div>
              <div className="col-12 col-md-2 mt-2">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
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
            </div>
          </form>
          <form
            className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <Subtitle title=" Datos del solicitante" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">Tipo de documento</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="tipo de documento"
                    value="C.C."
                    disabled
                    {...register("documento")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Número de cedula</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    value="1121919374"
                    disabled
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
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
              <Subtitle title="Información del artículo" mb="3" />
            </div>
            <div className="col-12 col-md-3 mt-2">
              <div className="d-grid gap-2 d-flex">
                <button
                  type="submit"
                  className=" btn btn-primary flex-center text-capitalize"
                  onClick={handleOpenAgregarProducto}
                >
                  Agregar Producto
                </button>
              </div>
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
            <div className="col-12">
              <div className="mx-3">
                <label htmlFor="ms-2" className="text-terciary">
                  Observaciones generales
                </label>
                <textarea
                  className="form-control border rounded-pill px-4 border-terciary"
                  type="text"
                  placeholder="Observaciones generales"
                  rows="3"
                  name="Observaciones"
                />
              </div>
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
export default SolicitarElementoConsumoViveroScreen;
