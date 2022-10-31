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

const AutorizarSolicitudesConsumoScreen = () => {
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
      codigo: " ",
      nombre: " ",
      cantida: "",
      fechaEntrega: "",
    },
    {
      codigo: " ",
      nombre: " ",
      cantida: "",
      fechaEntrega: "",
    },
    {
      codigo: " ",
      nombre: " ",
      cantida: "",
      fechaEntrega: "",
    },
    {
      codigo: " ",
      nombre: " ",
      cantida: "",
      fechaEntrega: "",
    },
    {
      codigo: " ",
      nombre: " ",
      cantida: "",
      fechaEntrega: "",
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
          <h4 className="text-right fw-light ms-3 mb-2">
            Autorizar solicitudes de consumo
          </h4>
            <div className="row">
              <div className="col-12 col-sm-4">
                <div >
                  <label className="ms-2">Numero consecutivo</label>
                  <input
                    className="form-control border rounded-pill px-3"
                    type="number"
                    placeholder="numero consecutivo"
                    disabled
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
                          isDisabled
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
                    disabled
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
              <label className="form-control ms-0 fw-bolder text-center">
                <n>Datos del solicitante</n>
              </label>
              <div className="col-12 col-sm-4">
                <div >
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
                    value="1.121.919.374"
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
                disabled
                rows="3"
                name="Observaciones"
              />
            </div>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
              <button
                className="btn bg-secondary border rounded-pill me-md-2 text-white text-capitalize"
                type="submit"
                title="Send"
              >
                Autorizar
              </button>
              <button
                className="btn bg-danger border rounded-pill  text-white text-capitalize"
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
                <h3 className="mt-3 mb-0 text-center mb-6">
                  Rechazar solicitud de consumo
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
                      <div className="col-12">
                        <div className="input-group input-group-dynamic flex-column mt-3">
                          <label htmlFor="exampleFormControlInput1 ">
                            Motivo de Rechazo
                          </label>
                          <textarea
                            className="multisteps-form__input form-control p-2 mw-100 w-auto"
                            type="text"
                            placeholder="Observaciones"
                            rows="5"
                            name="Observaciones"
                          />
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

export default AutorizarSolicitudesConsumoScreen;
