import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import LogBackground from "../../../assets/logos/Macareniaa.jpg";
import clienteAxios from "../../../config/clienteAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const optionsTipoDocumento = [
  { label: "C.C.", value: "cc" },
  { label: "T.I", value: "TI" },
];

const RegisterUserScreen = () => {
  const navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState(null);
  const [dataValidation, setDataValidation] = useState({});
  const [isHandleSubmit, setIsHandleSubmit] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      /* 
        Petición para verificación existencia de persona
      */
      const { data: datePersonas } = await clienteAxios.get(
        "personas/getpersonas"
      );
      const dataPersona = datePersonas.filter(
        (persona) => persona.numero_documento === data.numeroDocumento
      );
      if (!dataPersona.length) {
        Swal.fire({
          title: "No exite un persona con estos datos",
          text: "¿Desea registrarse como persona o empresa?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          }
        });
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4MDI2MDE3LCJpYXQiOjE2NjU0MzQwMTcsImp0aSI6ImQ4M2MyOTZlZWEyMzQ3ZjM5MTU5MzEyNTUzMzZmZWYyIiwidXNlcl9pZCI6MX0.S_5c2K5pYYNWc_LtvaZ75NaP57KoQ5L_tCY8YbIILaI",
        },
      };

      /*
       *Petición para verificar si la persona ya tiene usuario
       */
      const { data: dataUsers } = await clienteAxios.get("users", config);
      const dataUser = dataUsers.filter(
        (user) => user.persona.numero_documento === data.numeroDocumento
      );
      if (dataUser.length) {
        Swal.fire({
          title: "Este usuario ya existe",
          text: "¿Desea recuperar su contraseña?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3BA9E0",
          cancelButtonColor: "#6c757d",
          confirmButtonText: "Si",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/recuperarcontrasena");
          } else {
            navigate("/login");
          }
        });
      }

      /*
       *Petición de registro de usuario
       */

      console.log("dataPersona", dataPersona);

      const user = {
        password: data.password,
        password2: data.password2,
        persona: dataPersona[0].id_persona,
        id_usuario_creador: null,
        activated_at: "2022-10-10T17:15:00Z", // Hablar con el back para revisar este dato que probablemente no sea obligatorio
        tipo_usuario: "E", // Debería ser por defecto que se creara en E
        email: dataPersona[0].email,
        nombre_de_usuario: data.nombreDeUsuario,
      };

      console.log("user", user);

      const config2 = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data: userRegister } = await clienteAxios.post(
        "users/register/",
        user,
        config2
      );

      Swal.fire({
        title: "Usuario registrado correctamente",
        text: "Revise su bandeja de correo electronico para confirmar el registro",
        icon: "success",
        confirmButtonColor: "#3BA9E0",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Continuar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
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
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              <h3 className="mt-3 mb-0 text-center mb-6">
                Registro de usuario
              </h3>
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
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
                <div className="col-12">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      //required
                      placeholder="Numero de documento"
                      {...register("numeroDocumento", { required: true })}
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
                <div className="col-12">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Nombre de usuario"
                      {...register("nombreDeUsuario", { required: true })}
                    />
                    <label className="ms-2">
                      Nombre de usuario: <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errors.nombreDeUsuario && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12">
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
                  {errors.password && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12">
                  <div className="form-floating input-group input-group-dynamic">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Contraseña"
                      {...register("password2", { required: true })}
                    />
                    <label className="ms-2">
                      Confirmar contraseña:{" "}
                      <span className="text-danger">*</span>
                    </label>
                  </div>
                  {errors.password && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                  {errorPassword === true && (
                    <small className="text-danger">
                      Las contraseñas no coinciden
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  onClick={handleClickSubmit}
                  className="btn bg-gradient-primary mt-3 text-capitalize d-block"
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
