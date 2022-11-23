import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import botonGuardar from "../../../assets/iconosBotones/guardar.svg"

const params = new URLSearchParams(window.location.search)


const ActualizarContrasenaScreenBloqueo = () => {
  const navigate = useNavigate();
  const token = params.get("?token");
  const uidb64 = params.get("uidb64");
  const [isDiferentPasswords, setIsDiferentPasswords] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitNewPassword = async (data) => {
    if (data.password !== data.password2) return setIsDiferentPasswords(true);
    setIsDiferentPasswords(false);
    const axiosBody = {
      password: data.password,
      token,
      uidb64,
    };
    try {
      const { data: dataResetPassword } = await clienteAxios.patch(
        "users/password-unblock-complete/",
        axiosBody
      );
      console.log(dataResetPassword);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contraseña cambiada correctamente",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } catch (err) {
      console.log(err);
      if (err?.response.data.detail) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: err?.response.data.detail,
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo pasó intente de nuevo",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  return (
    <div
      className="page-header align-items-start min-vh-100"
      style={{
        backgroundColor: "rgb(4,47,74)",
      }}
    >
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <h3 className="mt-4 mb-0 text-center">Actualizar</h3>
              <div className="card-body">
                <form
                  className="text-start"
                  onSubmit={handleSubmit(onSubmitNewPassword)}
                >
                  <p className="text-center mb-0">
                    Ingrese sus nuevas credenciales para iniciar sesión
                  </p>
                  {isDiferentPasswords && (
                    <small className="text-danger">
                      Las contraseñas deben coincidir
                    </small>
                  )}
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Nueva contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control border rounded-pill px-3"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "La contraseña debe tener 6 carácteres mínimio",
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <small className="text-danger">
                      {errors.password?.message}
                    </small>
                  )}

                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Confirme su contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control border rounded-pill px-3"
                      {...register("password2", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "La contraseña debe tener 6 carácteres mínimio",
                        },
                      })}
                    />
                  </div>
                  {errors.password2 && (
                    <small className="text-danger">
                      {errors.password2?.message}
                    </small>
                  )}

                  <div className="text-center">
                    <button
                      className="mb-0 btn-image text-capitalize bg-white d-block ms-auto border boder-none mt-4"
                      type="submit"
                    >
                      <img src={botonGuardar} alt="" title="Guardar" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ActualizarContrasenaScreenBloqueo;
