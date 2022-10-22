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
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import MarcaDeAgua1 from "../../../components/MarcaDeAgua1";

const RegistroDeMantenimientoDeComputoScreen = () => {
  const [busquedaPersonalIsActive, setBusquedaPersonalIsActive] =
    useState(false);
  const [busquedaArticuloIsActive, setBusquedaArticuloIsActive] =
    useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [selecOpciones, setSelecOpciones] = useState({
    consecutivo: "",
    tipoMantenimiento: "",
    estado: "",
  });

  const onSubmit = (data) => {
    setSelecOpciones({
      ...selecOpciones,
      consecutivo: data.consecutivo,
      tipoMantenimiento: data.tipoMantenimiento?.value,
      estado: data.estado?.value,
      tipoDocumento: data.tipoDocumento?.value,
    });
  };

  const opcionTipoMantenimiento = [
    { label: "Correctivo", value: "Correctivo" },
    { label: "Preventivo", value: "Preventivo" },
  ];

  const opcionEstado = [
    { label: "Bueno", value: "Bueno" },
    { label: "Malo", value: "Malo" },
    { label: "T.I", value: "Dfectuoso" },
  ];

  const opcionTipoDocumento = [
    { label: "NIT", value: "NIT" },
    { label: "C.C", value: "C.C" },
    { label: "T.I", value: "Dfectuoso" },
  ];

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="row min-vh-100">
      <div className="col-lg-10 col-md-10 col-12 mx-auto">
        <h3 className="mt-3 mb-0 text-center mb-6">
          Registro de mantenimiento de computo
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
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-md-4">
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
                        disabled
                      />
                    )}
                  />
                </label>
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
                    <label className="form-control ms-0 fw-bolder text-center">
                      <n>Articulo</n>
                    </label>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          name="codigoArticulo"
                          className="multisteps-form__input form-control"
                          type="text"
                          placeholder="Codigo de articulo"
                          {...register("codigoArticulo", { required: true })}
                        />
                        <label className="ms-2">
                          Codigo del articulo
                          <small className="text-danger">*</small>
                        </label>
                      </div>
                      {errors.codigoArticulo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          name="nombreArticulo"
                          className="form-control"
                          type="text"
                          placeholder="Nombre del articulo"
                          value="Computador"
                          disabled
                        />
                        <label className="ms-2">Nombre del articulo </label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                        <button
                          className="btn bg-gradient-primary mb-0 text-capitalize"
                          type="button"
                          title="Send"
                          form="configForm"
                          onClick={() => setBusquedaArticuloIsActive(true)}
                        >
                          Buscar articulo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="mt-4 row">
                    <label className="form-control ms-0 fw-bolder text-center">
                      <n>Tercero</n>
                    </label>
                  </div>
                </div>

                <div className="multisteps-form__content">
                  <div className="mt-4 row">
                    <div className="col-12 col-md-4">
                      <label className="form-floating input-group input-group-dynamic ms-2">
                        Tipo de documento{" "}
                        <small className="text-danger">*</small>
                        <div className="col-12 ">
                          <Controller
                            name="tipodocumento"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                onChange={(e) =>
                                  setSelecOpciones({
                                    ...selecOpciones,
                                    tipoDocumento: e.value,
                                  })
                                }
                                options={opcionTipoDocumento}
                                placeholder="Seleccionar"
                              />
                            )}
                          />
                        </div>
                      </label>
                      {errors.tipodocumento && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic ">
                        <input
                          name="numeroCedula"
                          className="form-control"
                          type="text"
                          placeholder="numero cedula"
                          {...register("numeroCedula", { required: true })}
                        />
                        <label className="ms-2">
                          Número de cedula
                          <small className="text-danger">*</small>
                        </label>
                      </div>
                      {errors.numeroCedula && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>

                    <div className="col-12 col-md-4">
                      <div className="form-floating input-group input-group-dynamic">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="nombre completo"
                          value="Julian Castillo"
                          disabled
                          {...register("nombreCompleto")}
                        />
                        <label className="ms-2">Nombre completo</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" row">
                  <div className="d-grid gap-2 d-flex justify-content-end  mt-3">
                    <button
                      className="btn bg-gradient-primary mb-0 text-capitalize"
                      type="button"
                      title="Send"
                      form="configForm"
                      onClick={() => setBusquedaPersonalIsActive(true)}
                    >
                      Buscar Tercero
                    </button>
                  </div>
                </div>

                <div className="mt-4 row">
                  <div className="col-12 col-md-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Tipo de mantenimiento
                      <small className="text-danger">*</small>
                      <div className="col-12 ">
                        <Controller
                          name="tipodemantenimiento"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(e) =>
                                setSelecOpciones({
                                  ...selecOpciones,
                                  tipoMantenimiento: e.value,
                                })
                              }
                              options={opcionTipoMantenimiento}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    </label>
                    {errors.tipodemantenimiento && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Estado final<small className="text-danger">*</small>
                      <div className="col-12 ">
                        <Controller
                          name="estado"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              onChange={(e) =>
                                setSelecOpciones({
                                  ...selecOpciones,
                                  estado: e.value,
                                })
                              }
                              options={opcionEstado}
                              placeholder="Seleccionar"
                            />
                          )}
                        />
                      </div>
                    </label>
                    {errors.estado && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="input-group input-group-dynamic flex-column mt-3">
                  <label htmlFor="exampleFormControlInput1 ">
                    Acciones realizadas
                  </label>
                  <textarea
                    className="multisteps-form__input form-control p-2 mw-100 w-auto"
                    type="text"
                    placeholder="Acciones realizadas"
                    rows="3"
                    name="Acciones"
                  />
                </div>

                <div className="mt- 4 input-group input-group-dynamic flex-column mt-3">
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

                <div className="row">
                  <div className=" d-grid gap-2 d-flex justify-content-end  mt-3">
                    <button
                      className="btn bg-gradient-primary mb-0"
                      type="button"
                      title="Send"
                      form="configForm"
                    >
                      Limpiar
                    </button>
                    <button
                      className="btn bg-gradient-primary mb-0"
                      type="submit"
                      title="Send"
                      form="configForm"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
export default RegistroDeMantenimientoDeComputoScreen;
