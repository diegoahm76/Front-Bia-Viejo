import React, { useMemo, useRef, useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import BusquedaDePersonalModal from "../../../components/BusquedaDePersonalModal";
import BusquedaArticuloModal from "../../../components/BusquedaArticuloModal";
import Subtitle from "../../../components/Subtitle";

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
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            data-animation="FadeIn"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="mt-3 mb-4  ms-3 fw-light text-terciary">
              Registro de mantenimiento de computo
            </h3>

            <Subtitle title="Consecutivo del registro de mantenimiento " />

            <div className="row mt-3">
            
              <div className="col-12 col-md-3 ms-2 mt-3">
                <label className="text-terciary ms-2">
                  Numero consecutivo<small className="text-danger">*</small>
                </label>
                <input
                  name="consecutivo"
                  className="border border-terciary form-control border rounded-pill px-3"
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

              <div className="col-12 col-md-3 ms-2 mt-3">
                <label className="text-terciary"   htmlFor="exampleFormControlInput1 mt-4">
                  Fecha de solicitud
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
                      className="border border-terciary form-control border rounded-pill px-3  p-2"
                      placeholderText="dd/mm/aaaa"
                      disabled
                    />
                  )}
                />
              </div>

              <div className="col-12 col-md-2 mt-4">
                <div className="d-grid gap-2 d-flex">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
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
                

                <div className="row mt-3">
                <Subtitle title="Articulo"  />
                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary ms-2">
                      Codigo del articulo
                      <small className="text-danger">*</small>
                    </label>
                    <input
                      name="codigoArticulo"
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Codigo de articulo"
                      {...register("codigoArticulo", { required: true })}
                    />

                    {errors.codigoArticulo && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary ms-2">Nombre del articulo </label>
                    <input
                      name="nombreArticulo"
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="Nombre del articulo"
                      value="Computador"
                      disabled
                    />
                  </div>

                  <div className="col-12 col-md-3 mt-4">
                    <button
                      className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                      type="button"
                      title="Send"
                      form="configForm"
                      onClick={() => setBusquedaArticuloIsActive(true)}
                    >
                      Buscar articulo
                    </button>
                  </div>
                </div>

                

                <div className="mt-4 row">
                <Subtitle title="Tercero" />
                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                      Tipo de documento
                      <small className="text-danger">*</small>
                      <div className="col-12 mt-3 ">
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

                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary ms-2">
                      Número de cedula
                      <small className="text-danger">*</small>
                    </label>
                    <input
                      name="numeroCedula"
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="numero cedula"
                      {...register("numeroCedula", { required: true })}
                    />

                    {errors.numeroCedula && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary ms-2">Nombre completo</label>
                    <input
                      className="border border-terciary form-control border rounded-pill px-3"
                      type="text"
                      placeholder="nombre completo"
                      value="Julian Castillo"
                      disabled
                      {...register("nombreCompleto")}
                    />
                  </div>

                  <div className="col-12 col-md-2 mt-4">
                    <button
                      className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                      type="button"
                      title="Send"
                      form="configForm"
                      onClick={() => setBusquedaPersonalIsActive(true)}
                    >
                      Buscar Tercero
                    </button>
                  </div>
                </div>

                <div className="mt-2 row">
                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                      Tipo de mantenimiento
                      <small className="text-danger">*</small>
                    </label>
                    <div className="col-12 mt-3">
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

                    {errors.tipodemantenimiento && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-md-3 ms-2 mt-3">
                    <label className="text-terciary form-floating input-group input-group-dynamic ms-2">
                      Estado final<small className="text-danger">*</small>
                    </label>
                    <div className="col-12 mt-3">
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

                    {errors.estado && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>

                <div className="col-12 col-md-12 mt-3">
                <div className="mx-3">
                  <label className="text-terciary" htmlFor="ms-2">Acciones realizadas</label>
                  <textarea
                    className="form-control border rounded-pill px-4 border border-terciary"
                    type="text"
                    placeholder="Acciones realizadas"
                    value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                    
                    rows="5"
                    name="Acciones"
                  />
                  </div>
                </div>

                <div className="col-12 col-md-12">
                <div className="mx-3">
                  <label className="text-terciary" htmlFor="ms-2">Observaciones</label>
                  <textarea
                    className="form-control border rounded-pill px-4 border border-terciary"
                    type="text"
                    placeholder="Observaciones"
                    value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                  
                    rows="5"
                    name="Acciones"
                  />
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 col-md-12 d-flex justify-content-end">
                    <div className=" d-grid gap-2 d-flex justify-content-end  mt-4 ">
                      <button
                        className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                        type="button"
                        title="Send"
                        form="configForm"
                      >
                        Limpiar
                      </button>

                      <button
                        className="mt-1 form-control border rounded-pill px-3  btn bg-gradient-primary mb-0 text-capitalize"
                        type="submit"
                        title="Send"
                        form="configForm"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
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
    </div>
  );
};
export default RegistroDeMantenimientoDeComputoScreen;
