import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export const CreacionArticulosFijosScreen = () => {
  const [checkboxSoli, setCheckboxSoli] = useState(true);
  const [checkboxHoja, setCheckboxHoja] = useState(true);

  const {
    reset,
    register: registerCrear,
    handleSubmit,
    control: controlCrear,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {};

  const navigate = useNavigate();
  const volver = () => {
    navigate(
      "/dashboard/Recaudo/gestor-notificacion/catalogo-bienes-Screen"
    );
  };
  return (
    <div className="row min-vh-100">
      <div className="col-lg-12 col-md-10 col-12 mx-auto">
        <div className="multisteps-form__panel border-radius-xl bg-white js-active p-4 position-relative ">
          <form
            className="row"
            onSubmit={handleSubmit(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              <b>Creación de artículo</b>
            </h3>

            <Subtitle title={"Informacíon del articulo"} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de bien
                </label>
                <Controller
                  name="TipoBien"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Activo", value: "a" },
                        { label: "Consumo", value: "c" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label: "Activo", value: "a"}}
                      isDisabled
                    />
                  )}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Código<span className="text-danger">*</span>
                </label>
                <input
                  name="codigo"
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="Código"
                  {...registerCrear("Codigo", {
                    required: true,
                  })}
                  defaultValue={"20198642"}
                  disabled
                />
                {errors.codigo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Nombre<span className="text-danger">*</span>
                  </label>
                  <input
                    name="nombre"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Nombre"
                    {...registerCrear("nombre", {
                      required: true,
                    })}
                    defaultValue={"Computador"}
                  />
                </div>
                {errors.nombre && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>

              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de activo<span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoactivo"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Computo ", value: "com" },
                        { label: "Vehiculo" , value: "vei"},
                        { label: "Otros Activos", value: "oac" },
                      ]}
                      placeholder="Seleccionar"
                    />
                  )}
                  defaultValue={{label:"Computo", value: "com"}}
                  isDisabled
                />
                {errors.tipoactivo && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="ms-2 text-terciary">
                  Carpeta padre<span className="text-danger">*</span>
                </label>
                <input
                  name="padre"
                  className="form-control border border-terciary border rounded-pill px-3"
                  type="text"
                  placeholder="Carpeta Padre"
                  {...registerCrear("padre", {
                    required: true,
                  })}
                  defaultValue={"Activo"}
                  disabled
                />
                {errors.padre && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Unidad de medida<span className="text-danger">*</span>
                </label>
                <Controller
                  name="unidadmedida"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "kilogramo " , value: "kg" },
                        { label: "kilometro" , value: "km"},
                        { label: "segundos" , value: "seg"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Unidades", value: "uni"}}
                      isDisabled
                    />
                    
                  )}
                />
                {errors.unidadmedida && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Porcentaje IVA<span className="text-danger">*</span>
                </label>
                <Controller
                  name="porcentaje"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "19%" , value: "19"},
                        { label: "14%" , value: "14"},
                        { label: "22%" , value: "23"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"19%", value: "19"}}
                      
                    />
                  )}
                />
                {errors.porcentaje && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de depreciación<span className="text-danger">*</span>
                </label>
                <Controller
                  name="depresiacion"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "linea recta" , value: "lin"},
                        { label: "hora uso" , value: "hor"},
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Linea recta", value: "lin"}}
                      
                    />
                  )}
                />
                {errors.depresiacion && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Unidad de vida útil<span className="text-danger">*</span>
                </label>
                <Controller
                  name="unidadvida"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "años ", value: "ano" },
                        { label: "meses" , value: "mes"},
                        { label: "dias", value: "dia" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Años", value: "ano"}}
                    />
                  )}
                />
                {errors.unidadvida && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Cantidad de vida útil<span className="text-danger">*</span>
                  </label>
                  <input
                    name="cantidadvida"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Cantidad de vida util"
                    {...registerCrear("cantidadvida", {
                      required: true,
                    })}
                    defaultValue={"3"}
                  />
                </div>
                {errors.cantidadvida && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <div>
                  <label className="ms-2 text-terciary">
                    Valor residual<span className="text-danger">*</span>
                  </label>
                  <input
                    name="valorresidual"
                    className="form-control border border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Valor residual"
                    {...registerCrear("valorresidual", {
                      required: true,
                    })}
                    defaultValue={"$ 500.000"}
                  />
                </div>
                {errors.valorresidual && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Marca<span className="text-danger">*</span>
                </label>
                <Controller
                  name="marca"
                  control={controlCrear}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[
                        { label: "Lenovo", value: "len" },
                        { label: "Nokia", value: "nok" },
                        { label: "Dell", value: "del" },
                      ]}
                      placeholder="Seleccionar"
                      defaultValue={{label:"Lenovo"}}
                    />
                    
                  )}
                />
                {errors.marca && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-lg-3  mt-3 d-flex">
                <div className="col-12 col-lg-6">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Solicitudes
                  </label>
                  <button
                    className="btn btn-sm btn-tablas "
                    type="button"
                    title="Solicitudes"
                    onClick={() => setCheckboxSoli(!checkboxSoli)}
                  >
                    {checkboxSoli == true ? (
                      <i
                        className="fa-solid fa-toggle-off fs-3"
                        style={{ color: "black" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-toggle-on fs-3"
                        style={{ color: "#8cd81e" }}
                      ></i>
                    )}
                  </button>
                </div>
                <div className="col-12 col-lg-6">
                  <label className="form-floating input-group input-group-dynamic ms-2">
                    Hoja de vida
                  </label>
                  <button
                    className="btn btn-sm btn-tablas "
                    type="button"
                    title="Solicitudes"
                    onClick={() => setCheckboxHoja(!checkboxHoja)}
                  >
                    {checkboxHoja == true ? (
                      <i
                        className="fa-solid fa-toggle-off fs-3"
                        style={{ color: "black" }}
                      ></i>
                    ) : (
                      <i
                        className="fa-solid fa-toggle-on fs-3"
                        style={{ color: "#8cd81e" }}
                      ></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12 ">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Depreciación
                </label>
                <textarea
                  className="form-control border rounded-pill px-4 border border-terciary"
                  type="text"
                  placeholder="Observaciones"
                  value="Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, "
                  rows="3"
                  name="Acciones"
                />
              </div>
            </div>
            <div className="row ">
              <div className="d-flex justify-content-end mt-3">
                <button type="button" className="btn   text-capitalize" onClick={() => volver()}>
                  <i class="fa-solid fa-x fs-3"></i>
                </button>
                <button type="button" className="btn   text-capitalize">
                  <i class="fa-regular fa-floppy-disk fs-3"></i>
                </button>
                
              </div>
            </div>
            <button type="button" className="btn   text-capitalize">
            
            <i class="fa-solid fa-wand-magic-sparkles"></i>
                </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreacionArticulosFijosScreen;