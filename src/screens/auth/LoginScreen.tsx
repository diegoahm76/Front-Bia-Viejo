import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import LogoCormacarena from "../../assets/LogosBIAPNG/logoBia.svg";
import Cormacarena from "../../assets/LogosBIAPNG/logoCorma.svg";
import Macarenia from "../../assets/LogosBIAPNG/logoMaca.svg";
import ReCaptcha from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { loginUser } from "../../store/slices/Login";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { isValid } from "date-fns";
import axios from "axios";

function LoginScreen() {
  const navigate = useNavigate();
  const captchaRef = useRef<HTMLInputElement>(null);
  const userInfoEmail = useAppSelector((state) => state.login.userinfo.email);
  const reintentos = useAppSelector((state) => state.login.reintentos);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [recaptchaValue, setRecaptchaValue] = useState(captchaRef);

  function handleRecaptchaChange(captchaRef) {
    setRecaptchaValue(captchaRef);
    console.log(captchaRef);

    //   // const token = captchaRef;
    //   // return (token);
  }

  // const [token, setToken] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  function submitHandler(dataForm) {
    //  this.setRecaptchaValue({captchaRef});
    console.log(recaptchaValue)
    console.log(isCaptchaValid);
    //event.preventDefault();

    if (!isCaptchaValid) {
      Swal.fire({
        position: "center",
        icon: "info",
        text: "Es necesario validar el Captcha, para poder ingresar",
        //     //ButtonText: "Aceptar",
        //     //ButtonColor: "#3085d6",
        //     //  is_active: true,
      });

      return;
    }

    // enviar solo las credenciales de inicio de sesión al servidor
    // si la validación es exitosa, iniciar sesión
    // de lo contrario, mostrar un mensaje de error

    loginUser(dispatch, dataForm.email, dataForm.password);
    dataForm.captcha = recaptchaValue;
    console.log(recaptchaValue);
    console.log(dataForm.captcha);
  }



  const handleClickToDesbloqueo = () => {
    navigate("/desbloqueo-usuario");
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
            <div
              className="card fadeIn3 fadeInBottom align-items-center"
              style={{
                backgroundColor: "rgb(4,47,74)",
                border: "none",
                boxShadow: "none",
              }}
            >
              <div className="my-4">
                <img
                  src={LogoCormacarena}
                  className="aspect-ratio"
                  alt="logo cormacarena"
                />
              </div>
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
                    <label
                      className="text-white"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Email
                    </label>
                    <input

                      className="form-control border rounded-pill px-3 bg-white border border-0"
                      {...register("email")}
                    />
                  </div>
                  <div className="col-12 mb-3 mt-3">
                    <label
                      className="text-white"
                      style={{ fontSize: "1.2rem" }}
                    >
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control border rounded-pill px-3 bg-white border border-0"
                      {...register("password")}
                    />
                  </div>
                  {reintentos ? (
                    <div>
                      <label className="text-white text-center fw-lighter fs-5">
                        Su usuario há sido bloqueado
                        <button
                          type="button"
                          className="btn bg-gradient-primary rounded-pill justify-content-center px-5 my-4 mb-2 fw-normal"
                          onClick={handleClickToDesbloqueo}
                        >
                          Desbloquear Usuario
                        </button>
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

                      onChange={() => setIsCaptchaValid(true)}
                      onExpired={() => setIsCaptchaValid(false)}
                      onError={() => setIsCaptchaValid(false)}

                    />
                  </div>{" "}
                  *
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary rounded-pill px-5 my-4 mb-2 text-capitalize"
                      style={{ fontSize: ".9rem" }}
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
                <div className="d-flex justify-content-center mb-2">
                  <Link className="text-white" to="/recuperar-contrasena">
                    <p>Olvidó su contraseña</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
              <span className="text-white">by:</span>
              <div className="d-flex align-items-end gap-3">
                <img src={Macarenia} alt="" />
                <img src={Cormacarena} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;