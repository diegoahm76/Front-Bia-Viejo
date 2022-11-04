import React, { useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { AgGridReact } from "ag-grid-react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  activeModalAction,
  desactiveModalAction,
} from "../../../actions/modalActions";
import CalendarModal from "../../../components/CalendarModal";
import { useDispatch } from "react-redux";
import Subtitle from "../../../components/Subtitle";

const AutorizarSolicitudActivoPrestamoScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaInicio: "",
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
            <h3 className="text-right fw-light ms-3 mb-2">
              Autorizar una solicitud de activo en prestamo
            </h3>
            <div className="row">
              <Subtitle title="Información de la solicitud" mt="3" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">
                    Numero consecutivo
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero consecutivo"
                    disabled
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
                        className="form-control border border-terciary rounded-pill px-3 mt-2"
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
              <Subtitle title="Datos del coordinador" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-3 text-terciary">
                    Tipo de documento
                  </label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
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
                    className="form-control border border-terciary rounded-pill px-3"
                    type="number"
                    placeholder="numero cedula"
                    disabled
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Nombre completo</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="nombre completo"
                    disabled
                    {...register("nombreCompleto")}
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
              <Subtitle title="Datos del solicitante" mb="3" />
              <div className="col-12 col-sm-3">
                <div>
                  <label className="ms-2 text-terciary">Tipo de documento</label>
                  <input
                    className="form-control border border-terciary rounded-pill px-3"
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
                    className="form-control border border-terciary rounded-pill px-3"
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
                    className="form-control border border-terciary rounded-pill px-3"
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
              <Subtitle title="Información del Artículo" mb="3" />
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
                  disabled
                  name="Observaciones"
                />
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-secondary  border rounded-pill me-md-2 text-white text-capitalize"
                type="submit"
                title="Send"
              >
                Autorizar
              </button>
              <button
                className="btn bg-danger text-white border rounded-pill  text-capitalize"
                type="button"
                onClick={handleOpenModal}
                title="Send"
              >
                Rechazar
              </button>
            </div>
          </form>
          <CalendarModal>
          <div className="row min-vh-100 ">
              <div className="col-lg-10 col-md-10 col-12 mx-auto">
                <h3 className="mt-3 mb-0 text-ligth">
                  Rechazar solicitud de consumo
                </h3>
                <Subtitle title="información de solicitud " mt="3" />
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
                      <div className="col-12">
                        <div className="col-12">
                          <div className="mx-3">
                            <label htmlFor="ms-2" className="text-terciary">
                              Motivo de rechazo
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
                            className="btn bg-secondary me-md-2 text-white text-capitalize"
                            type="submit"
                            onClick={handleCloseModal}
                            title="Send"
                          >
                            Salir
                          </button>
                          <button
                            className="btn bg-danger text-white text-capitalize"
                            type="button"
                            onClick={handleCloseModal}
                            title="Send"
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </form>
              </div>
            </div>
          </CalendarModal>
        </form>
      </div>
    </div>
  );
};

export default AutorizarSolicitudActivoPrestamoScreen;
