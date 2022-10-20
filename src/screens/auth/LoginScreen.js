import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginAction } from "../../actions/userActions";
import LogoCormacarena from "../../assets/logos/eps/LogoHorizontal_mod.svg";
import LogBackground from "../../assets/logos/Macareniaa.jpg";
import ReCaptcha from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
        backgroundImage: `url(${LogBackground})`,
      }}
    >
      <span className="mask bg-gradient-dark opacity-6"></span>
      <div className="container my-auto">
        <div className="row">
          <div className="col-lg-4 col-md-8 col-12 mx-auto">
            <div className="card z-index-0 fadeIn3 fadeInBottom">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                  <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">
                    Cormacarena
                  </h4>
                </div>
              </div>
              <div className="card-body">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={LogoCormacarena}
                    alt="Logo-Cormacarena"
                    style={{ maxWidth: "40%", maxHeight: "40%" }}
                  />
                </div>
                <form
                  className="text-start"
                  onSubmit={handleSubmit(submitHandler)}
                >
                  <div className="form-floating input-group input-group-dynamic mt-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Emaill"
                      {...register("email")}
                    />
                    <label className="ms-2">Email</label>
                  </div>
                  <div className="form-floating input-group input-group-dynamic mt-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      {...register("password")}
                    />
                    <label className="ms-2">Contraseña</label>
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    <ReCaptcha
                      sitekey={process.env.REACT_APP_SITE_KEY}
                      ref={captchaRef}
                      hl="es"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn bg-gradient-primary w-100 my-4 mb-2"
                    >
                      Iniciar sesión
                    </button>
                  </div>
                </form>
                <nav className="mt-3 d-flex flex-column text-center">
                  <small>
                    Registrarse como <Link to="/register">Persona</Link> o{" "}
                    <Link to="/registeruser">Usuario</Link>
                  </small>
                  <Link to="/recuperar-contrasena">
                    <small>Olvide mi contraseña</small>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
