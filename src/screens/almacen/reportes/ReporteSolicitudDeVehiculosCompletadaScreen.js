import React, { useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { da } from "date-fns/locale";

const ReporteDeSolicitudDeVehiculosCompletadaScreen = () => {
  const [selecOpciones, setSelecOpciones] = useState({
    consecutivo: "",
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      consecutivo: data.consecutivo,
    });
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de solicitud de vehiculos completada
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="form-floating input-group input-group-dynamic">
                <input
                  name="consecutivo"
                  className="form-control"
                  type="text"
                  placeholder="numero consecutivo"
                  {...register("consecutivo", { required: true })}
                />
                <label className="ms-2">Numero consecutivo</label>
              </div>
              {errors.consecutivo && (
                <small className="text-danger">Este campo es obligatorio</small>
              )}
            </div>
            <div className="col-12 col-md-4">
              <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                <button
                  className="btn bg-gradient-primary mb-0 text-capitalize"
                  type="submit"
                  title="Send"
                  form="configForm"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {selecOpciones.consecutivo ? (
            <div>
              <div className="multisteps-form__content">
                <div className="row">
                  <label className="form-control ms-0 fw-bolder text-center mt-4">
                    <n>Reporte de solicitudes de vehiculos realizadas</n>
                  </label>
                </div>
              </div>
              <div className="multisteps-form__content">
                <div className="mt-4 row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Solicitante</n>
                  </label>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre completo"
                        value="C.C"
                        disabled
                      />
                      <label className="ms-2">Tipo de documento </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre completo"
                        value="1.243.675.654"
                        disabled
                      />
                      <label className="ms-2">Numero de documento</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre completo"
                        value="Julian Castillo"
                        disabled
                      />
                      <label className="ms-2">Nombre</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="mt-4 row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Vehiculo</n>
                  </label>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Placa"
                        value="OPL-246"
                        disabled
                      />
                      <label className="ms-2">Placa </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Marca"
                        value="Toyota"
                        disabled
                      />
                      <label className="ms-2">Marca</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Linea"
                        value="Prado"
                        disabled
                      />
                      <label className="ms-2">Linea</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="mt-4 row">
                  <label className="form-control ms-0 fw-bolder text-center">
                    <n>Conductor</n>
                  </label>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="row">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="tipo de documento"
                        value="C.C"
                        disabled
                      />
                      <label className="ms-2">Tipo de documento </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="numero de documento"
                        value="1.243.675.654"
                        disabled
                      />
                      <label className="ms-2">Numero de documento</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="nombre completo"
                        value="Julian Castillo"
                        disabled
                      />
                      <label className="ms-2">Nombre</label>
                    </div>
                  </div>

                  <div className="mt-3 row">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="dependencia"
                          value="Administrativa"
                          disabled
                        />
                        <label className="ms-2">Dependencia</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="grupo"
                          value="Almacen"
                          disabled
                        />
                        <label className="ms-2">Grupo</label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 row">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="pasajeros"
                          value="3"
                          disabled
                        />
                        <label className="ms-2">Pasajeros</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="carga"
                          value="No"
                          disabled
                        />
                        <label className="ms-2">Carga</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 row">
                <div className="col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de salida
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
                          disabled
                        />
                      )}
                    />
                  </label>
                </div>

                <div className="col-12 col-md-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de llegada
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
                          disabled
                        />
                      )}
                    />
                  </label>
                </div>
              </div>

              <div className="multisteps-form__content">
                <div className="row mt-3">
                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Departamento"
                        value="Meta"
                        disabled
                      />
                      <label className="ms-2">Departamento </label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Municipio"
                        value="Villavicencio"
                        disabled
                      />
                      <label className="ms-2">Municipio</label>
                    </div>
                  </div>

                  <div className="col-12 col-md-4">
                    <div className="form-floating input-group input-group-dynamic">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Predio"
                        value="Comuna 8"
                        disabled
                      />
                      <label className="ms-2">Predio</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column justify-content-end align-items-start mt-5">
                <label> _____________________________________________</label>
                <div className="d-flex justify-content-center align-items-center">
                  <label>Firma del solicitante</label>
                </div>
                <div className="d-flex justify-content-start align-items-center">
                  <label>Nombre:</label>
                </div>
              </div>

              {/* <div className="row">
                <div class=" d-grid gap-2 d-flex justify-content-end  mt-3">
                  <button
                    className="btn bg-gradient-primary mb-0"
                    type="button"
                    title="Send"
                    form="configForm"
                  >
                    Imprimir
                  </button>
                  <button
                    className="btn bg-gradient-danger mb-0"
                    type="button"
                    title="Send"
                    form="configForm"
                  >
                    Salir
                  </button>
                </div>
              </div> */}
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};
export default ReporteDeSolicitudDeVehiculosCompletadaScreen;
