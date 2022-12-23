import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import clienteAxios from "../../../config/clienteAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../adapters/textChoices.adapter";
import botonCancelar from "../../../assets/iconosBotones/cancelar.svg";
import botonRegistrarse from "../../../assets/iconosBotones/agregar.svg"
import { IList } from "../../../Interfaces/auth";
import { AxiosError } from "axios";

const defaultValues = {
  tipoDocumento: { value: "", label: "Seleccione" },
  numeroDocumento: "",
  nombreDeUsuario: "",
  password: "",
  password2: "",
};

const RegisterUserScreen = () => {
  const navigate = useNavigate();
  const [errorPassword, setErrorPassword] = useState<boolean | null>(null);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState<IList[]>([
    { value: "", label: "Seleccione" },
  ]);
  const [isHandleSubmit, setIsHandleSubmit] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    const getSelectsOptions = async () => {
      try {
        const { data: tipoDocumentosNoFormat } = await clienteAxios.get(
          "choices/tipo-documento/"
        );
        const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);

        setTipoDocumentoOptions(documentosFormat);
      } catch (err) {
        console.log(err);
      }
    };
    getSelectsOptions();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      /*
       *Petición para verificación existencia de persona
       */
      await clienteAxios.get(
        `personas/get-personas-by-document/${data?.tipoDocumento.value}/${data?.numeroDocumento}`
      ).then((dataPersona) => {
        const user = {
          email: dataPersona.data.data.email,
          nombre_de_usuario: data.nombreDeUsuario,
          persona: dataPersona.data.data.id_persona,
          password: data.password,
          id_usuario_creador: null,
          tipo_usuario: "E", // Debería ser por defecto que se creara en E
          redirect_url:
            process.env.NODE_ENV === "production"
              ? "https://front-bia.netlify.app/#/login"
              : "http://localhost:3000/#/login",
        };
        crearUsuario(user);
      }).catch(() => {
        Swal.fire({
          title: "No existe un persona con estos datos",
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
      });

    } catch (error: any) {
      console.log(error);
      Swal.fire({
        title: error.response.data.data.detail,
        text: "¿Desea registrar una nueva persona?",
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
      // if (error.response?.data?.errors?.persona) {
      //   Swal.fire({
      //     title: "Estos datos ya estan relacionados a una persona",
      //     text: "¿Desea registrar una nueva persona?",
      //     icon: "warning",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3BA9E0",
      //     cancelButtonColor: "#6c757d",
      //     confirmButtonText: "Si",
      //     cancelButtonText: "No",
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       navigate("/register");
      //     }
      //   });
      // } else if (error.response?.data?.detail) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "warning",
      //     title: error.response?.data?.detail,
      //     showConfirmButton: false,
      //     timer: 2000,
      //   });
      // } else if (error.response?.data?.errors?.non_field_errors) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "warning",
      //     title: error.response?.data?.errors?.non_field_errors[0],
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // } else if (error.response?.data?.errors?.password) {
      //   console.log(error);
      //   Swal.fire({
      //     position: "center",
      //     icon: "warning",
      //     title: "La contraseña debe tener almenos 6 caracteres",
      //     showConfirmButton: false,
      //     timer: 1500,
      //   });
      // } else {
      //   console.log(error);
      // }
      // return error as AxiosError;
    }
  };

  const crearUsuario = async (user) => {
    const config2 = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await clienteAxios.post(
      "users/register-externo/",
      user,
      config2
    ).then(() => {
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
    }).catch((err) => {
      Swal.fire({
        title: err.response.data.data.detail,
        text: "¿Desea registrar una nueva persona?",
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
    });
  }
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
        backgroundColor: "rgb(4,47,74)",
      }}
    >
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-5 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom px-4 pb-2 pb-md-4">
              <h3 className="mt-3 mb-2 fw-light text-terciary">
                Registro de usuario
              </h3>
              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-12">
                  <label className="form-label text-terciary text-terciary ms-2">
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
                        value={field.value}
                        options={tipoDocumentoOptions}
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
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Número de documento:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="text"
                      {...register("numeroDocumento", { required: true })}
                    />
                  </div>
                </div>
                {errors.numeroDocumento && (
                  <small className="text-danger">
                    Este campo es obligatorio
                  </small>
                )}
                <div className="col-12">
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Nombre de usuario: <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="text"
                      {...register("nombreDeUsuario", { required: true })}
                    />
                  </div>
                  {errors.nombreDeUsuario && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12">
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Contraseña: <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="password"
                      onCopy={(e) => e.preventDefault()}
                      {...register("password", { required: true })}
                    />
                  </div>
                  {errors.password && (
                    <small className="text-danger">
                      Este campo es obligatorio
                    </small>
                  )}
                </div>

                <div className="col-12">
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Confirmar contraseña:{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control border border-terciary rounded-pill px-3"
                      type="password"
                      onPaste={(e) => e.preventDefault()}
                      {...register("password2", { required: true })}
                    />
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

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                  >
                    <img src={botonCancelar} alt="" title="Cancelar" />
                  </button>
                  <button
                    className="mb-0 btn-image text-capitalize bg-white border boder-none"
                    onClick={handleClickSubmit}
                    type="submit"
                  >
                    <img src={botonRegistrarse} alt="" title="Registrar" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserScreen;
