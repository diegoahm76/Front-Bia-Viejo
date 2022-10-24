import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import BusquedaDeVehiculoModal from "../../../components/BusquedaDeVehiculoModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const AsignacionVehiculoScreen = () => {
  const [isModalVehiculo, setIsModalVehiculo] = useState(false);

  const handleOpenBuscarVehiculo = () => {
    setIsModalVehiculo(true);
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
  const [startDate, setStartDate] = useState(new Date());
  const [formValues, setFormValues] = useState({
    fechaInicio: "",
    fechaSalida: "",
  });

  return (
    <div className="row min-vh-100 ">
      <div className="col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">Asignación Vehículo</h3>
        <form
          className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative"
          data-animation="FadeIn"
          onSubmit={handleSubmit(onSubmit)}
          id="configForm"
        >
          <MarcaDeAgua1>
            <form
              className="multisteps-form__panel border-radius-xl js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="nombre completo"
                      value="Ludy Angelica Leon Quiroga"
                      disabled
                      {...register("nombreCompleto")}
                    />
                    <label className="ms-2">Nombre completo</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de respuesta
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
                <div className="col-12 col-sm-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de salida solicitada
                    <Controller
                      name="fechaSolicitud"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          disabled
                          onChange={(date) => setStartDate(date)}
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
                <div className="col-12 col-sm-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de llegada solicitada
                    <Controller
                      name="fechaSolicitud"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          dateFormat="dd/MM/yyyy"
                          disabled
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
              className="multisteps-form__panel border-radius-xl js-active p-4 position-relative"
              data-animation="FadeIn"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="row">
                <label className="form-control ms-0 fw-bolder text-center">
                  <n>Reasignar vehículo</n>
                </label>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="placa"
                      {...register("placa")}
                    />
                    <label className="ms-2">Placa</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="marca"
                      disabled
                      {...register("marca")}
                    />
                    <label className="ms-2">Marca</label>
                  </div>
                </div>
                <div className="col-12 col-sm-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="linea"
                      disabled
                      {...register("linea")}
                    />
                    <label className="ms-2">Linea</label>
                  </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Ver disponibilidad
                  </button>
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="button"
                    title="Send"
                    onClick={handleOpenBuscarVehiculo}
                  >
                    Buscar vehiculo para asignar
                  </button>
                  <BusquedaDeVehiculoModal
                    isModalActive={isModalVehiculo}
                    setIsModalActive={setIsModalVehiculo}
                  />
                </div>
                <div className="input-group input-group-dynamic flex-column mt-3">
                  <label htmlFor="exampleFormControlInput1 ">
                    Observaciones
                  </label>
                  <textarea
                    className="multisteps-form__input form-control p-2 mw-100 w-auto"
                    type="text"
                    placeholder="Observaciones"
                    rows="3"
                    name="Observaciones"
                  />
                </div>
                <div className="col-12 col-sm-4 mt-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de salida asignada
                    <Controller
                      name="fechaSalida"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={formValues.fechaSalida}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaSalida: e })
                          }
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
                <div className="col-12 col-sm-4 mt-4">
                  <label htmlFor="exampleFormControlInput1 mt-4">
                    Fecha de llegada asignada
                    <Controller
                      name="fechaInicio"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          locale="es"
                          selected={formValues.fechaInicio}
                          onSelect={(e) =>
                            setFormValues({ ...formValues, fechaInicio: e })
                          }
                          className="multisteps-form__input form-control p-2"
                          placeholderText="dd/mm/aaaa"
                        />
                      )}
                    />
                  </label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Guardar
                  </button>
                  <button
                    className="btn bg-primary me-md-2 text-white text-capitalize"
                    type="button"
                    title="Send"
                  >
                    Salir
                  </button>
                </div>
              </div>
            </form>
          </MarcaDeAgua1>
        </form>
      </div>
    </div>
  );
};

export default AsignacionVehiculoScreen;
