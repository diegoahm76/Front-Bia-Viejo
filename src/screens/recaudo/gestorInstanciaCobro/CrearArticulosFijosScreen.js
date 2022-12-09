import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Subtitle from "../../../components/Subtitle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export const ArticulosFijosScreen = () => {
  const [checkboxSoli, setCheckboxSoli] = useState(true);
  const [checkboxHoja, setCheckboxHoja] = useState(true);
  const [tipoDeBien, setTipoDeBien] = useState({
    tipoBien: "",
  });

  const {
    reset: resetTipoBien,
    register: registerTipoBien,
    handleSubmit: submitTipoBien,
    control: controlTipoBien,
    formState: { errors: errors1 },
  } = useForm();

  const {
    reset: resetCrear,
    register: registerCrearActivo,
    handleSubmit: submitCrearActivo,
    control: controlCrearActivo,
    formState: { errors: errors },
  } = useForm();

  const {
    reset: resetCrearConsumo,
    register: registerCrearConsumo,
    handleSubmit: submitCrearConsumo,
    control: controlCrearConsumo,
    formState: { errors: errors2 },
  } = useForm();

  const onSubmit = (data) => {
    setTipoDeBien({
      ...tipoDeBien,
      tipoBien: data.tipoBien,
    });
  };
  const onSubmit2 = () => {};
  const onSubmit3 = () => {};

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
            onSubmit={submitTipoBien(onSubmit)}
            id="configForm"
          >
            <h3 className="text-rigth  fw-light mt-4 mb-2">
              <b>Creación de artículo</b>
            </h3>

            <Subtitle title={"Informacíon del articulo"} />

            <div className="row">
              <div className="col-12 col-lg-3  mt-2">
                <label className="form-floating input-group input-group-dynamic ms-2">
                  Tipo de bien<span className="text-danger">*</span>
                </label>
                <Controller
                  name="tipoBien"
                  control={controlTipoBien}
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
                    />
                  )}
                />
                {errors1.tipoBien && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
              </div>
              <div className="col-12 col-md-3 mt-2">
                <button type="submit" className="btn text-capitalize mt-4">
                  <i class="fa-solid fa-circle-check fs-3"></i>
                </button>
              </div>
            </div>
          </form>

          {tipoDeBien.tipoBien.value == "a" ? (
            <div>
              <form
                className="row"
                onSubmit={submitCrearActivo(onSubmit2)}
                id="configForm"
              >
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
                      {...registerCrearActivo("codigo", {
                        required: true,
                      })}
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
                        {...registerCrearActivo("nombre", {
                          required: true,
                        })}
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
                      Tipo de activo
                    </label>
                    <Controller
                      name="tipoactivo"
                      control={controlCrearActivo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "Computo ", value: "com" },
                            { label: "Vehiculo", value: "vei" },
                            { label: "Otros Activos", value: "oac" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
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
                      {...registerCrearActivo("padre", {
                        required: true,
                      })}
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
                      control={controlCrearActivo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "kilogramo ", value: "kg" },
                            { label: "kilometro", value: "km" },
                            { label: "segundos", value: "seg" },
                          ]}
                          placeholder="Seleccionar"
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
                      control={controlCrearActivo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "19%", value: "19" },
                            { label: "14%", value: "14" },
                            { label: "22%", value: "23" },
                          ]}
                          placeholder="Seleccionar"
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
                      Tipo de depreciación
                    </label>
                    <Controller
                      name="depresiacion"
                      control={controlCrearActivo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "linea recta", value: "lin" },
                            { label: "hora uso", value: "hor" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Unidad de vida útil
                    </label>
                    <Controller
                      name="unidadvida"
                      control={controlCrearActivo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "años ", value: "ano" },
                            { label: "meses", value: "mes" },
                            { label: "dias", value: "dia" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Cantidad de vida útil
                        
                      </label>
                      <input
                        name="cantidadvida"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Valor residual
                      </label>
                      <input
                        name="valorresidual"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Valor residual"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Marca
                    </label>
                    <Controller
                      name="marca"
                      control={controlCrearActivo}
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
                        />
                      )}
                    />
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
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      type="text"
                      placeholder="Descripción"
                      value=""
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
                    <button type="submit" className="btn   text-capitalize">
                      <i class="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
          {tipoDeBien.tipoBien.value == "c" ? (
            <div>
              <form
                className="row"
                onSubmit={submitCrearConsumo(onSubmit3)}
                id="configForm"
              >
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
                      {...registerCrearConsumo("codigo", {
                        required: true,
                      })}
                    />
                    {errors2.codigo && (
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
                        {...registerCrearConsumo("nombre", {
                          required: true,
                        })}
                      />
                    </div>
                    {errors2.nombre && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Metodo de valoración
                    </label>
                    <Controller
                      name="tipoactivo"
                      control={controlCrearConsumo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "Computo ", value: "com" },
                            { label: "Vehiculo", value: "vei" },
                            { label: "Otros Activos", value: "oac" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
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
                      {...registerCrearConsumo("padre", {
                        required: true,
                      })}
                    />
                    {errors2.padre && (
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
                      control={controlCrearConsumo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "kilogramo ", value: "kg" },
                            { label: "kilometro", value: "km" },
                            { label: "segundos", value: "seg" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors2.unidadmedida && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>

                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock minimo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="stockminimo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                        {...registerCrearConsumo("stockminimo", {
                          required: true,
                        })}
                      />
                      {errors2.stockminimo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <div>
                      <label className="ms-2 text-terciary">
                        Stock maximo
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        name="stockmaximo"
                        className="form-control border border-terciary border rounded-pill px-3"
                        type="text"
                        placeholder="Cantidad de vida util"
                        {...registerCrearConsumo("stockmaximo", {
                          required: true,
                        })}
                      />
                      {errors2.stockmaximo && (
                        <small className="text-danger">
                          Este campo es obligatorio
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-lg-3  mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                      Porcentaje IVA<span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="porcentaje"
                      control={controlCrearConsumo}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={[
                            { label: "19%", value: "19" },
                            { label: "14%", value: "14" },
                            { label: "22%", value: "23" },
                          ]}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors2.porcentaje && (
                      <small className="text-danger">
                        Este campo es obligatorio
                      </small>
                    )}
                  </div>
                </div>
                <div className="row">
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
                        vivero
                      </label>
                      <button
                        className="btn btn-sm btn-tablas"
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
                    {checkboxHoja == false ? (
                      <div className="col-12 col-lg-3  mt-3">
                        <div>
                          <label className="ms-2 text-terciary">
                            Nombre cientifico
                          </label>
                          <input
                            name="nombrecien"
                            className="form-control border border-terciary border rounded-pill px-3"
                            type="text"
                            placeholder="Cantidad de vida util"
                            
                          />
                          
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  
                </div>
                <div className="row">
                  <div className="col-12 col-lg-12 mt-3">
                    <label className="form-floating input-group input-group-dynamic ms-2">
                    Descripción
                    </label>
                    <textarea
                      className="form-control border rounded-pill px-4 border border-terciary"
                      type="text"
                      placeholder="Descripción"
                      value=""
                      rows="3"
                      name="Acciones"
                    />
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn   text-capitalize"onClick={() => volver()}>
                      <i class="fa-solid fa-x fs-3"></i>
                    </button>
                    <button type="submit" className="btn   text-capitalize">
                      <i class="fa-regular fa-floppy-disk fs-3"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default ArticulosFijosScreen;
