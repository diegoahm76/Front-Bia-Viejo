import React, { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";

import { Controller, useForm } from "react-hook-form";

const DesbloqueoUsuarioScreen = () => {
  const [formValues, setFormValues] = useState({
    fechaNacimiento: "",
  });
  const captchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <div className="row min-vh-100 ">
      <div className="col-6 mx-auto">
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
            <h3 className="text-rigth  fw-light mb-3 mb-2">
              Desbloqueo de usuario
            </h3>
            <div className="row">
              <div className="row">
                <label
                  className="border rounded-pill px-4 mt-${mt} mb-${mb} text-white fs-5 p-1"
                  style={{
                    backgroundImage: "linear-gradient(45deg, #6db227, #36a9e0)",
                  }}
                >
                  información requerida
                </label>
              </div>
              <div className="col-12 ">
                <div>
                  <label className="ms-3 text-terciary">
                    Nombre de usuario
                  </label>
                  <input
                    className="form-control border  border-terciary rounded-pill px-3"
                    type="text"
                    placeholder="Nombre usuario"
                    {...register("nombreUsuario")}
                  />
                </div>
              </div>
              <div className="col-12 ">
                <div>
                  <label className="ms-3 text-terciary">Número de cédula</label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="número de cédula"
                    {...register("numeroCedula")}
                  />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label className="ms-3 text-terciary">
                    Número de celular
                  </label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="Numero celular"
                    {...register("celular")}
                  />
                </div>
              </div>
              <div className="col-12">
                <div>
                  <label className="ms-3 text-terciary">
                    Correo electrónico
                  </label>
                  <input
                    className="form-control border-terciary border rounded-pill px-3"
                    type="text"
                    placeholder="correo electrónico"
                    {...register("correoElectronico")}
                  />
                </div>
              </div>
              <div className="row">
                <div>
                  <label className=" text-terciary">Fecha de nacimiento</label>
                  <Controller
                    name="fechaSalida"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        {...field}
                        locale="es"
                        dateFormat="dd/MM/yyyy"
                        selected={formValues.fechaNacimiento}
                        onSelect={(e) =>
                          setFormValues({ ...formValues, fechaNacimiento: e })
                        }
                        className="form-control  border-terciary border rounded-pill px-3 mt-2"
                        placeholderText="dd/mm/aaaa"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-12 mt-2">
                <div className="row">
                  <div className="mt-4 d-flex justify-content-center">
                    <ReCAPTCHA
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      ref={captchaRef}
                      hl="es"
                    />
                  </div>
                  
                </div>
                <div className="d-grid gap-2 d-flex justify-content-center">
                  <button
                    className="btn btn-primary text-capitalize border rounded-pill px-3 mt-4 btn-min-width"
                    type="submit"
                    title="Send"
                    form="configForm"
                  >
                    Desbloquear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </form>
      </div>
    </div>
  );
};

export default DesbloqueoUsuarioScreen;
