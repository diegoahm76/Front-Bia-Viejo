import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";

const optionsTipoDocumento = [
  { label: "C.C.", value: "cc" },
  { label: "T.I", value: "TI" },
];

const RegisterUserScreen = () => {
  const [errorPassword, setErrorPassword] = useState(null);
  const [isHandleSubmit, setIsHandleSubmit] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClickSubmit = () => {
    setIsHandleSubmit(true);
  };

  useEffect(() => {
    if (isHandleSubmit) {
      if (watch("password") !== watch("password2")) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
    }
  }, [watch("password"), watch("password2")]);

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundImage: `url(${LogBackground})`,
      }}
    >
      <div className="container my-auto mt-2 mb-2">
        <div className="row">
          <div className="col-12 col-md-7 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              <h3 className="mt-3 mb-0 text-center mb-6">
                Registro de usuario
              </h3>
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12 col-md-6">
                  <label className="form-label">
                    Tipo de documento: <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name="tipoDocumento"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsTipoDocumento}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                </div>
                {errors.tipoDocumento && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                <div className="col-12 col-md-4">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      //required
                      placeholder="Numero de documento"
                      {...register("numeroDocumento", {required: true})}
                    />
                    <label className="ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errors.numeroDocumento && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre de usuario"
                      {...register("nombreDeUsuario")}
                    />
                    <label className="ms-2">
                      Nombre de usuario: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errors.nombreDeUsuario && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password", { required: true })}
                    />
                    <label className="ms-2">
                      Contraseña: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errors.password && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                <div className="col-12 col-md-6">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password2", { required: true })}
                    />
                    <label className="ms-2">
                      Contraseña: <span className="text-danger">*</span>
                    </label>
                  </div>
                </div>
                {errors.password && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                {errorPassword === true && (
                  <small className="text-danger">Las contraseñas no coinciden</small>
                )}
                <button
                  type="submit"
                  onClick={handleClickSubmit}
                  className="btn bg-gradient-primary mt-2 text-capitalize d-block ms-auto col-12 col-md-6"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserScreen;
