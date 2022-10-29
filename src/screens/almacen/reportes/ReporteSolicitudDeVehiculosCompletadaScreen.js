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
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

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
      <div className="col-lg-12 col-md-12 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Reporte de solicitud de vehiculos completada
        </h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <div className="row">
              <div className="col-12 col-md-4">
                <label className="ms-2">Numero consecutivo</label>
                <input
                  name="consecutivo"
                  className="form-control border rounded-pill px-3"
                  type="text"
                  placeholder="numero consecutivo"
                  {...register("consecutivo", { required: true })}
                />
                {errors.consecutivo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-md-2">
                <div className="d-grid gap-2 d-flex justify-content-end  mt-4">
                  <button
                    className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
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
                    <label
                      className="form-control border rounded-pill px-3 mt-3 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #67b136, #39aad4)",
                      }}
                    >
                      <n>Reporte de solicitudes de vehiculos realizadas</n>
                    </label>
                  </div>
                </div>
                <div className="multisteps-form__content">
                  <div className="mt-4 row">
                    <label
                      className="form-control border rounded-pill px-3 mt-3 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #67b136, #39aad4)",
                      }}
                    >
                      <n>Solicitante</n>
                    </label>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">Tipo de documento </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="C.C"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Numero de documento</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="1.243.675.654"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Nombre</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Julian Castillo"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="mt-4 row">
                    <label
                      className="form-control border rounded-pill px-3 mt-3 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #67b136, #39aad4)",
                      }}
                    >
                      <n>vehiculo</n>
                    </label>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">Placa </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Placa"
                        value="OPL-246"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Marca</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Marca"
                        value="Toyota"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Linea</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Linea"
                        value="Prado"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="mt-4 row">
                    <label
                      className="form-control border rounded-pill px-3 mt-3 text-white"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #67b136, #39aad4)",
                      }}
                    >
                      <n>Conductor</n>
                    </label>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">Tipo de documento </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="tipo de documento"
                        value="C.C"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Numero de documento</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="numero de documento"
                        value="1.243.675.654"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Nombre</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="nombre completo"
                        value="Julian Castillo"
                        disabled
                      />
                    </div>

                    <div className="mt-3 row">
                      <div className="col-12 col-md-4">
                        <label className="ms-2">Dependencia</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="dependencia"
                          value="Administrativa"
                          disabled
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="ms-2">Grupo</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="grupo"
                          value="Almacen"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="mt-3 row">
                      <div className="col-12 col-md-4">
                        <label className="ms-2">Pasajeros</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="pasajeros"
                          value="3"
                          disabled
                        />
                      </div>

                      <div className="col-12 col-md-4">
                        <label className="ms-2">Carga</label>
                        <input
                          className="form-control border rounded-pill px-3"
                          type="text"
                          placeholder="carga"
                          value="No"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 row">
                  <div className="col-12 col-md-4">
                    <label htmlFor="exampleFormControlInput1 mt-4">
                      Fecha de salida
                    </label>
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
                          className="form-control border rounded-pill px-3  p-2"
                          placeholderText="dd/mm/aaaa"
                          disabled
                        />
                      )}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label htmlFor="exampleFormControlInput1 mt-4">
                      Fecha de llegada
                    </label>
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
                          className="form-control border rounded-pill px-3  p-2"
                          placeholderText="dd/mm/aaaa"
                          disabled
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="row mt-3">
                    <div className="col-12 col-md-4">
                      <label className="ms-2">Departamento </label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Departamento"
                        value="Meta"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Municipio</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Municipio"
                        value="Villavicencio"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="ms-2">Predio</label>
                      <input
                        className="form-control border rounded-pill px-3"
                        type="text"
                        placeholder="Predio"
                        value="Comuna 8"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-start mt-6">
                  <label>
                    ____________________________________________________
                  </label>
                  <div className="d-flex justify-content-center align-items-center">
                    <label>Firma de quien solicita</label>
                  </div>
                  <div className="d-flex justify-content-start align-items-center">
                    <label>Nombre:</label>
                  </div>
                </div>
                <div className="col-12 col-md-4 row">
                  <div className=" d-grid gap-2 d-flex justify-content-end  mt-4 ">
                    <button
                      className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                      type="button"
                      title="Send"
                      form="configForm"
                    >
                      Imprimir
                    </button>

                    <button
                      className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-danger mb-0 text-capitalize"
                      type="button"
                      title="Send"
                      form="configForm"
                      onclik="${}"
                    >
                      Salir
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};
export default ReporteDeSolicitudDeVehiculosCompletadaScreen;
