import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import LogoCormacarena from "../../assets/LogosBIAPNG/manualbia-14.png";
// import LogBackground from "../../assets/logos/Macareniaa.jpg";
import ReCaptcha from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import DesbloqueoUsuarioScreen from "./desbloqueoUsuario/DesbloqueoUsuarioScreen";

function LoginScreen() {
  const captchaRef = useRef(null);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submitHandler = (dataForm) => {
    const token = captchaRef.current.getValue();
    if (token) {
      dispatch(userLoginAction(dataForm.email, dataForm.password));
    } else {
      console.log("Sigue intentando");
    }
  };

  useEffect(() => {
    if (error?.login_erroneo?.contador) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Intento Número ${error?.login_erroneo?.contador} de 3, su cuenta será bloqueada al tercer intento`,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        is_active: true,
      });
    } else if (error?.detail) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: error.detail,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
        is_active: true,
      });
    } else {
    }
  }, [error]);

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
            <div
              className="card fadeIn3 fadeInBottom"
              style={{
                backgroundColor: "rgb(4,47,74)",
                border: "none",
                boxShadow: "none",
              }}
            >
              <img src={LogoCormacarena} alt="logo cormacarena" />
            </div>
            <div
              className="card z-index-0 fadeIn3 fadeInBottom"
              style={{
                borderRadius: "0",
                borderTopLeftRadius: "40px",
                borderTopRightRadius: "40px",
                background:
                  "linear-gradient(360deg, rgba(4,47,74,1) 0%, rgba(0,178,0,1) 32%, rgba(0,191,235,1) 100%)",
                boxShadow: "none",
              }}
            >
              <div className="card-body">
                <form
                  className="text-start"
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <div className="col-12 mb-3 mt-3">
                    <label className="text-white fw-lighter fs-5">Email</label>
                    <input
                      type="email"
                      className="form-control border rounded-pill px-3 bg-white border border-0"
                      {...register("email")}
                    />
                  </div>
                  <div className="col-12 mb-3 mt-3">
                    <label className="text-white fw-lighter fs-5">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control border rounded-pill px-3 bg-white border border-0"
                      {...register("password")}
                    />
                  </div>
                  {error?.detail ===
                  "Su usuario está bloqueado, debe comunicarse con el administrador" ? (
                    <div>
                      <label className="text-white text-center fw-lighter fs-5">
                        {error?.detail}

                        <Link className="text-white" to="/desbloqueousuario">
                          <button
                            type="submit"
                            className="btn bg-gradient-primary rounded-pill justify-content-center px-5 my-4 mb-2 fw-normal"
                          >
                            Desbloquear Usuario
                          </button>
                        </Link>
                      </label>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="mt-4 d-flex justify-content-center">
                    <ReCaptcha
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      ref={captchaRef}
                      hl="es"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary rounded-pill px-5 my-4 mb-2 fw-normal"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
                <div className="d-flex justify-content-around my-3 mb-2">
                  <Link className="text-white" to="/register">
                    <p>Registro persona</p>
                  </Link>
                  <Link className="text-white" to="/registeruser">
                    <p>Registro usuario</p>
                  </Link>
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <Link className="text-white" to="/recuperar-contrasena">
                    <p>Olvidó su contraseña</p>
                  </Link>
                </div>
                {/* <nav className="mt-3 d-flex flex-column text-center">
                  <small className="text-white">
                    Registrarse como <Link to="/register">Persona</Link> o{" "}
                    <Link to="/registeruser">Usuario</Link>
                  </small>
                  <Link to="/recuperar-contrasena">
                    <small className="text-white">Olvide mi contraseña</small>
                  </Link>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
