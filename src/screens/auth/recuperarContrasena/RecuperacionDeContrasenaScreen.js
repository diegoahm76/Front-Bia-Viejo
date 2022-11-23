import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../../config/clienteAxios";
import botonRegistrarse from "../../../assets/iconosBotones/agregar.svg"

const RecuperacionDeContrasenaScreen = () => {

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitRecoveryPassword = async (data) => {
    const bodyAxios = {
      email: data.email,
      redirect_url: process.env.NODE_ENV === "production" ? "https://front-bia.netlify.app/#/actualizar-contrasena" : "http://localhost:3000/#/actualizar-contrasena",
    };
    const { data: dataRecoveryPassword } = await clienteAxios.post(
      "users/request-reset-email/",
      bodyAxios
    );

    //console.log(dataRecoveryPassword)

    Swal.fire({
      position: "center",
      icon: "info",
      title: dataRecoveryPassword?.detail,
      showConfirmButton: true,
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });

    // const textUpperCase =
    //   dataRecoveryPassword.success[0].toUpperCase() +
    //   dataRecoveryPassword.success.slice(1);
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
              <h3 className="mt-4 mb-0 text-center mb-2">
                Recuperar contraseña
              </h3>
              <div className="card-body">
                <form
                  className="text-start"
                  onSubmit={handleSubmit(onSubmitRecoveryPassword)}
                >
                  <label>
                    Escriba el correo electronico relacionado a su usuario para
                    recuperar su contraseña
                  </label>
                  <div className="mt-3">
                    <label className="text-terciary text-terciary ms-2">
                      Correo electrónico 
                    </label>
                    <input
                      type="email"
                      className="form-control border rounded-pill px-3"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "El campo es requerido",
                        },
                        pattern: {
                          value:
                            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Escriba un correo válido",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <small className="text-danger">
                      {errors.email?.message}
                    </small>
                  )}

                  <div className="text-center mt-4">
                    <button
                      className="mb-0 btn-image text-capitalize d-block ms-auto bg-white border boder-none"
                      type="submit"
                    >
                      <img src={botonRegistrarse} alt="" title="Validar" />
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
export default RecuperacionDeContrasenaScreen;
